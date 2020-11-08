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

router.post("/add", (req, res) => {
  const FullLink = req.body.Link;
  const ShortenLink = HashFunction(FullLink);

  Validator(FullLink).then((status) => {
    if (status == 400) {
      res.status(400).json("Invalid link address");
    } else {
      const NewLink = new LinkModel({ FullLink, ShortenLink });

      NewLink.save()
        .then(() => res.json("New Link was added"))
        .catch((err) => res.status(400).json(err.message));
    }
  });
});

router.get("/:link", (req, res) => {
  LinkModel.find({ ShortenLink: req.params.link })
    .then((link) => {
      res.redirect(link[0].FullLink);
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
