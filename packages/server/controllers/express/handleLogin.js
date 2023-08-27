const { jwtVerify, getJwt } = require("../jwt/jwtAuth");
const User = require('../../models/User');

require("dotenv").config();

const handleLogin = async (req, res) => {
  const token = getJwt(req);

  if (!token) {
    res.json({ loggedIn: false });
    return;
  }

  jwtVerify(token, process.env.JWT_SECRET || "test1234")
    .then(async decoded => {
      const potentialUser = await User.findOne({ where: { username:decoded.username } });

      if (!potentialUser) {
        res.json({ loggedIn: false, token: null });
        return;
      }

      res.json({ loggedIn: true, token });
    })
    .catch(() => {
      res.json({ loggedIn: false });
    });
};

module.exports = handleLogin;
