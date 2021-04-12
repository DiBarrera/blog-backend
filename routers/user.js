const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middleware/authenticadted");

const api = express.Router();

api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers)

module.exports = api;