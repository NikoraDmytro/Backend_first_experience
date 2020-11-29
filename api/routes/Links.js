const router = require("express").Router();
require("dotenv").config;

let LinkModel = require("../models/Links.model.js");

const HashFunction = require("../functions/HashFunction.js");
const Validator = require("../functions/Validator.js");

router.get("/", async (req, res) => {
  try {
    const links = await LinkModel.find();
    res.json(links);
  } catch (err) {
    res.status(500).json("Error :" + err);
  }
});

router.post("/add", async (req, res) => {
  const FullLink = req.body.Link;
  const ShortenLink = HashFunction(FullLink);

  const existence = await Validator(FullLink);

  if (existence.status !== 200) {
    res.status(400).json("Invalid link address");
  } else {
    try {
      const NewLink = new LinkModel({ FullLink, ShortenLink });
      await NewLink.save();
      res.json("Link was added!");
    } catch (err) {
      if (err.message.indexOf("duplicate key error") !== -1) {
        res.status(409).json("Link already exists!");
      } else {
        res.status(400).json(err.message);
      }
    }
  }
});

router.post("/delete", async (req, res) => {
  try {
    await LinkModel.deleteOne({ FullLink: req.body.Link });
    res.json("Link was deleted");
  } catch (err) {
    res.status(404).json("Could not delete this link!");
  }
});

router.get("/:link", async (req, res) => {
  try {
    const link = await LinkModel.findOne({ ShortenLink: req.params.link });
    res.redirect(link.FullLink);
  } catch (err) {
    res.status(404).json("Link does not exist!");
  }
});

module.exports = router;
