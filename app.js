const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const { API_VERSION } = require("./config");

// Load Routings
const userRoutes = require("./routers/user");
const authRoutes = require("./routers/auth");
const menuRoutes = require("./routers/menu");
const newsletterRoutes = require("./routers/newsletter");
const postRoutes = require("./routers/post");

app.use(cors({
          credentials: true,
          origin: ["http://localhost:3000"] // <== this will be the URL of our React app (it will be running on port 3000)
}))

// app.use(   // <=== ESTO ES PARA CONECTARSE A NETLIFY
//     cors({
//       credentials: true,
//       origin: process.env.FRONTENDPOINT // <=== This will be the URL of our React app (it will be running on port 3001)
//     })
// )

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// Router Basic
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);

module.exports = app;