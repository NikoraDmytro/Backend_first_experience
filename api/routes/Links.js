const router = require("express").Router();
require("dotenv").config;

let LinkModel = require("../models/Links.model.js");

const HashFunction = require("../functions/HashFunction.js");
const Validator = require("../functions/Validation.js");

router.get("/", async (req, res) => {
  try {
    const links = await LinkModel.find();
    res.json(links);
  } catch (err) {
    res.status(400).json("Error :" + err);
  }
});

router.post("/add", async (req, res) => {
  const FullLink = req.body.Link;
  const ShortenLink = HashFunction(FullLink);

  const status = await Validator(FullLink);

  if (status == 400) {
    res.status(400).json("Invalid link address");
  } else {
    try {
      const NewLink = new LinkModel({ FullLink, ShortenLink });
      NewLink.save();
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
});

router.get("/:link", async (req, res) => {
  try {
    const link = await LinkModel.findOne({ ShortenLink: req.params.link });
    res.redirect(link.FullLink);
  } catch (err) {
    res.status(400).json("Error :" + err);
  }
});

module.exports = router;
