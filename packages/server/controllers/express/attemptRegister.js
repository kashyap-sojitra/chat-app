const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { jwtSign } = require("../jwt/jwtAuth");
const User = require('../../models/User');

const attemptRegister = async (req, res) => {
  const existingUser = await User.findOne({ where: { username: req.body.username } });

  if (!existingUser) {
    // register
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    const newUserQuery = await User.create({
      username: req.body.username,
      password: hashedPass,
      userid: uuidv4()
    });

    jwtSign(
      {
        username:newUserQuery.username,
        id: newUserQuery.id,
        userid: newUserQuery.userid,
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
    res.json({ loggedIn: false, status: "Username taken" });
  }
};

module.exports = attemptRegister;
