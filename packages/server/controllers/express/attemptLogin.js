const bcrypt = require("bcrypt");
const { jwtSign } = require("../jwt/jwtAuth");
const User = require('../../models/User');

require("dotenv").config();

const attemptLogin = async (req, res) => {
  const potentialLogin = await User.findOne({ where: { username: req.body.username } });

  if (potentialLogin) {
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.password
    );

    if (isSamePass) {
      jwtSign(
        {
          username: potentialLogin.username,
          id: potentialLogin.id,
          userid: potentialLogin.userid,
        },
        process.env.JWT_SECRET || "test1234",
        { expiresIn: "7d" }
      )
        .then(token => {
          res.json({ loggedIn: true, token });
        })
        .catch(err => {
          console.log(err);
          res.json({ loggedIn: false, status: "Try again later" });
        });
    } else {
      res.json({ loggedIn: false, status: "Wrong username or password!" });
      console.log("wrong pass");
    }
  } else {
    console.log("not good");
    res.json({ loggedIn: false, status: "Wrong username or password!" });
  }
};

module.exports = attemptLogin;
