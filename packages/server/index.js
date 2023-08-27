const express = require("express");
const { corsConfig } = require("./controllers/serverController");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const {
  initializeUser,
  addFriend,
  addGroup,
  onDisconnect,
  authorizeUser,
  dm,
  gm,
} = require("./controllers/socketController");
const server = require("http").createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use("/auth", authRouter);
app.set("trust proxy", 1);

io.use(authorizeUser);
io.on("connect", socket => {
  initializeUser(socket);

  socket.on("add_friend", (friendName, cb) => {
    addFriend(socket, friendName, cb);
  });

  socket.on("add_group", (groupId, cb) => {
    socket.join(groupId);
    addGroup(socket, groupId, cb);
  });

  socket.on("join_group", (groupId) => socket.join(groupId));

  socket.on("dm", message => dm(socket, message));
  socket.on("gm", message => gm(socket, message));

  socket.on("disconnecting", () => onDisconnect(socket));
});

server.listen(process.env.PORT || 4000, () => {
  console.log("Server listening on port " + (process.env.PORT || "4000"));
});