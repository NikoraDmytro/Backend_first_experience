const mongoose = require("mongoose");

const LinkShorterSchema = new mongoose.Schema({ code: String });

const LinkShorter = mongoose.model("LinkShorter", LinkShorterSchema);

module.exports = LinkShorter;
