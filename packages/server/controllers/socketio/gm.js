const redisClient = require("../../redis");

const gm = async (socket, message) => {
  message.from = socket.user.userid;
  // to.from.content
  const messageString = [message.to, message.from, message.content].join(
    "."
  );

  await redisClient.lpush(`groupchat:${message.to}`, messageString);
  await redisClient.lpush(`groupchat:${message.from}`, messageString);

  socket.to(message.to).emit("gm", message);
};

module.exports = gm;
