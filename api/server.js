const express = require("express");
const cors = require("cors");
const helment = require("helmet");

const server = express();

const authRoute = require("../auth/auth-route.js");

//gobal middleware
server.use(helment());
server.use(cors());
server.use(express.json());

//Routes
server.use("/auth", authRoute);

module.exports = server;