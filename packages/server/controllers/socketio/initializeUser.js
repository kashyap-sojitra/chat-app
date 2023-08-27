const redisClient = require("../../redis");
const addFriend = require("./addFriend");
const parseFriendList = require("./parseFriendList");
const parseGroupList = require("./parseGroupList");

const initializeUser = async socket => {
  socket.join(socket.user.userid);
  
  await redisClient.hset(
    `userid:${socket.user.username}`,
    "userid",
    socket.user.userid,
    "connected",
    true
  );

  await addFriend(socket, "lester", () => {});

  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  const parsedFriendList = await parseFriendList(friendList);
  const friendRooms = parsedFriendList.map(friend => friend.userid);

  if (friendRooms.length > 0)
    socket.to(friendRooms).emit("connected", true, socket.user.username);

  socket.emit("friends", parsedFriendList);

  const groupList = await redisClient.lrange(
    `groups:${socket.user.username}`,
    0,
    -1
  );
  const parsedGroupList = await parseGroupList(groupList);
  const groupRooms = parsedGroupList.map(group => group.groupId);

  
  if (groupRooms.length > 0) {
    let groupMessages = [];
    for (const group of groupRooms) {
    const groupMsgQuery = await redisClient.lrange(
      `groupchat:${group}`,
      0,
      -1
    );
  
    const dataArray = groupMsgQuery.map(msgStr => {
      const parsedStr = msgStr.split(".");
      return { to: parsedStr[0], from: parsedStr[1], content: parsedStr[2] };
    });

    for (const data of dataArray) {
      if (data) {
        groupMessages.push(data)
      }
    }

  }

  if (groupMessages && groupMessages.length > 0) {
    socket.broadcast.emit("groupmessages", groupMessages);
  }
  }

  socket.emit("groups", parsedGroupList);

  const msgQuery = await redisClient.lrange(
    `chat:${socket.user.userid}`,
    0,
    -1
  );

  const messages = msgQuery.map(msgStr => {
    const parsedStr = msgStr.split(".");
    return { to: parsedStr[0], from: parsedStr[1], content: parsedStr[2] };
  });

  if (messages && messages.length > 0) {
    socket.emit("messages", messages);
  }
};

module.exports = initializeUser;
