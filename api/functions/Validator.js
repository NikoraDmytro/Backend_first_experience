const axios = require("axios");

const Validator = async (link) => {
  try {
    await axios.get(link);
    return true;
  } catch {
    return false;
  }
};

module.exports = Validator;
