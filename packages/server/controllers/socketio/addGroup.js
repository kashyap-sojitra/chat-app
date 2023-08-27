const redisClient = require("../../redis");

const addGroup = async (socket, groupId, cb) => {
  const group = await redisClient.hgetall(`group:${groupId}`);
  const currentGroupList = await redisClient.lrange(
    `groups:${socket.user.username}`,
    0,
    -1
  );

  if (
    group &&
    currentGroupList.indexOf(`${groupId}`) !== -1
  ) {
    cb({ done: false, errorMsg: "Group already added!" });
    return;
  }

  await redisClient.lpush(
    `groups:${socket.user.username}`,
    `${groupId}`
  );

  const newGroup = {
    groupId: groupId,
  };
  
  cb({ done: true, newGroup });
};

module.exports = addGroup;
