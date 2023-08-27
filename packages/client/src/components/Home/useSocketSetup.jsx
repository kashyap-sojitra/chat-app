import { useContext, useEffect } from "react";
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriendList, setMessages, setGroupList, setGroupMessages, socket) => {
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    socket.connect();

    socket.on("friends", friendList => {
      setFriendList(friendList);
    });

    socket.on("groups", groupList => {
      groupList.forEach(group =>
        socket.emit("join_group", group.groupId))
      setGroupList(groupList);
    });

    socket.on("messages", messages => {
      setMessages(messages);
    });

    socket.on("groupmessages", messages => {
      setGroupMessages(messages);
    });

    socket.on("dm", message => {
      setMessages(prevMsgs => [message, ...prevMsgs]);
    });

    socket.on("gm", message => {
      setGroupMessages(prevMsgs => [message, ...prevMsgs]);
    });

    socket.on("connected", (status, username) => {
      setFriendList(prevFriends => {
        return [...prevFriends].map(friend => {
          if (friend.username === username) {
            friend.connected = status;
          }
          return friend;
        });
      });
    });

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });

    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friends");
      socket.off("groups");
      socket.off("friends");
      socket.off("groupmessages");
      socket.off("dm");
      socket.off("gm");
    };
  }, [setUser, setFriendList, setMessages, setGroupList, setGroupMessages, socket]);
};

export default useSocketSetup;
