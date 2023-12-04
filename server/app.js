const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });

const User = require("./model/userSchema");
const authenticate = require("./middleware/authenticate");
require("./DataBase/connection");

const port = process.env.PORT;

// dotenv.config({ path: "./cofig.env" });
// Link the Router File
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(require("./router/auth"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header("origin"));
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
// Middelwares

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your client's origin
  credentials: true,
};

app.use(cors(corsOptions));
app.use(authenticate);
app.use(cookieParser());

app.listen(port, () => {
  console.log("Server started at port", port);
});
