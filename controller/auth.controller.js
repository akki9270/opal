const models = require("../models");

exports.SIGNUP = async (req, res) => {
  console.log("req.body ", req.body);
  let client = req.body;
  try {
    let result = await models.Client.create(client);
    result.salt = undefined;
    result.hashed_password = undefined;
    res.json(result);
  } catch (error) {
    // console.log(' error ', error);
    res.status(400).send(error);
  }
};
