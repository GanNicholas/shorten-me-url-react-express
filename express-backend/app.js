const express = require("express");

const parser = require("body-parser");
const { json, urlencoded } = parser;
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const homeRouter = require("./routes/homeRouter.js");
const errorHandler = require("./error/errorController.js");

const router = express.Router();

const app = express();
const port = 8080;

//Adding helmet for API Security
app.use(helmet());

//use bodyparser to parse JSON bodies into JS objects
app.use(json());

app.use(urlencoded({ extended: true }));

// enabling CORS for all requests
app.use(
  cors({
    // allowedHeaders: ['sessionId', 'Content-Type', 'master-token'],
    // exposedHeaders: ['sessionId'],
    origin: "*",
    methods: "GET,HEAD,PUT,POST,DELETE",
    preflightContinue: false,
  })
);
// adding morgan to log HTTP requests
app.use(morgan("combined"));

app.use("/", homeRouter);

//Error handler
app.use(errorHandler);

app.listen(port, function (err, res) {
  if (err) {
    console.log("Server error starting...");
  } else {
    console.log("Shortenme URL server started");
  }
});

module.exports = router;
