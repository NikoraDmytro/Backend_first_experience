const axios = require("axios");

const Validator = async (link) => {
  try {
    await axios.get(link);
    return { status: 200 };
  } catch (err) {
    return err;
  }
};

module.exports = Validator;
