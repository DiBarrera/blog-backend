const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const { API_VERSION } = require("./config");

// Load Routings
const userRoutes = require("./routers/user");

app.use(cors({
          credentials: true,
          origin: ["http://localhost:3000"] // <== this will be the URL of our React app (it will be running on port 3000)
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP
// ...

// Router Basic
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;