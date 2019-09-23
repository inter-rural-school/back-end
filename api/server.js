const express = require("express");
const cors = require("cors");
const helment = require("helmet");

const server = express();

const authRoute = require("../auth/auth-router.js");
const schoolRoute = require("../schools/school-router.js");
const adminRoute = require("../admins/admin-router.js")

//gobal middleware
server.use(helment());
server.use(cors());
server.use(express.json());

//Routes
server.use("/auth", authRoute);
server.use("/schools", schoolRoute);
server.use("/admins", adminRoute);

module.exports = server;