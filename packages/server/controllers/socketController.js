const authorizeUser = require("./socketio/authorizeUser");
const initializeUser = require("./socketio/initializeUser");
const addFriend = require("./socketio/addFriend");
const addGroup = require("./socketio/addGroup");
const onDisconnect = require("./socketio/onDisconnect");
const dm = require("./socketio/dm");
const gm = require("./socketio/gm");

module.exports = {
  addFriend,
  addGroup,
  authorizeUser,
  initializeUser,
  onDisconnect,
  dm,
  gm,
};
