const axios = require("axios");

const Validator = async (link) => {
  try {
    await axios.get(link);
    return 200;
  } catch {
    return 400;
  }
};

module.exports = Validator;
