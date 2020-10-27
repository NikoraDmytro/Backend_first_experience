const axios = require("axios");

const Validator = (link) => {
  let status = new Promise((resolve, reject) => {
    axios
      .get(link)
      .then(() => {
        resolve(200);
      })
      .catch(() => {
        resolve(400);
      });
  });
  return status;
};

module.exports = Validator;
