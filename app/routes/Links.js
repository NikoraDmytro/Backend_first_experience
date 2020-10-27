const router = require("express").Router();
require("dotenv").config;

let Link = require("../models/Links.model.js");
let LinkShorter = require("../models/LinkShorter.model.js");

const UpgradeShortenLink = require("../functions/UpgradeShortenLink.js");
const Validator = require("../functions/Validation.js");

router.get("/", (req, res) => {
  Link.find()
    .then((links) => res.json(links))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.post("/add", (req, res) => {
  console.log(req.body);
  const FullLink = req.body.Link;

  LinkShorter.find().then((links) => {
    let ShortenLink = links[0] || new LinkShorter({ code: "AAAAAAAAA" });

    UpgradeShortenLink(ShortenLink);

    ShortenLink = ShortenLink.code;

    Validator(FullLink).then((status) => {
      if (status == 400) {
        res.status(400).json("Invalid link address");
      } else {
        const NewLink = new Link({ FullLink, ShortenLink });

        NewLink.save()
          .then(() => res.json("New Link was added"))
          .catch((err) => res.status(400).json(err.message));
      }
    });
  });
});

router.get("/:link", (req, res) => {
  Link.find({ ShortenLink: req.params.link })
    .then((link) => {
      res.redirect(link[0].FullLink);
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
