const express = require("express");
const cors = require("cors");
const helment = require("helmet");

const server = express();

const authRoute = require("../auth/auth-router.js");
const schoolRoute = require("../schools/school-router.js");
const authAdminRoute = require("../register-admins/auth-admin-router.js")
const boardRoute = require("../boards/board-router.js")
const schoolstaffRoute = require("../schoolstaff/schoolstaff-router.js")
const issueRoute = require("../issues/issue-router.js")

//gobal middleware
server.use(helment());
server.use(cors());
server.use(express.json());

//Routes
server.use("/auth", authRoute);
server.use("/schools", schoolRoute);
server.use("/auth/register", authAdminRoute);
server.use("/boards", boardRoute);
server.use("/schoolstaff", schoolstaffRoute);
server.use("/issues", issueRoute);

module.exports = server;