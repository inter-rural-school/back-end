const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../database/dbConfig.js");

const Users = require('./auth-model.js');
const secrets = require('../config/secrets.js');

router.get("/", (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting users from database" });
    });
});

router.post('/register', validateRegister, userType, (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password);
  user.password = hash;
  console.log(user);

  Users.add(user)
  .then(added => {
    res.status(201).json(added);
  })
  .catch(err => {
    res.status(500).json({ message: "Error registering user in database" });
  });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.find({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = getJwt(user);
      res.status(200).json({
        message: `${user.username} is logged in!`,
        token
      });
    } else {
      res.status(401).json({ message: "Incorrect username or password" });
    }
  })
  .catch(err => {
    res.status(500).json({ message: "Error, can't access database" });
  });
});

function getJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    jwtid: 1
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

function validateRegister(req, res, next) {
    const {first_name, last_name, email, username, password} = req.body;

    if (!first_name && !last_name && !email && !username && !password) {
        return res.status(400).json({ messsage: "Missing registeration fields!" });
    }
    if(!first_name) {
        return res.status(400).json({error: "Must enter first name"});
    }
    if(!last_name) {
        return res.status(400).json({error: "Must enter last name"});
    }
    if(!email) {
        return res.status(400).json({error: "Must enter valid email"});
    }
    if(!username) {
        return res.status(400).json({error: "Must choose a username"});
    }
    if(!password) {
        return res.status(400).json({error: "Must create password"});
    }
    next();
}

function userType(req, res, next) {
  const {isBoardMember} = req.body;
  if (isBoardMember === 1) {
    Users.addBoard({ user_id: null })
    .then(added => {
      req.body.board_id = added[0];
      next();
    })
  } else if (isBoardMember === 0) {
    Users.addAdmin({user_id: null, school_id: null})
    .then(added => {
      req.body.admin_id = added[0];
      next();
    })
  }
}

module.exports = router;
