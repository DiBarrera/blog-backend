const express = require("express");
const NewsletterController = require("../controllers/newsletter");

const api = express.Router();

api.post("/subscribe-news/:email", NewsletterController.subscribeEmail);

module.exports = api;