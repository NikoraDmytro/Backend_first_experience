const express = require("express");
const mongoose = require("mongoose");
const LinksRouter = require("./routes/Links.js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Connected successfully");
});

app.use("/", LinksRouter);

module.exports = app;
