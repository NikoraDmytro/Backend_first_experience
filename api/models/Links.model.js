const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema(
  {
    FullLink: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    ShortenLink: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  {
    validateBeforeSave: true,
  }
);

const LinkModel = mongoose.model("LinkModel", LinkSchema);

module.exports = LinkModel;
