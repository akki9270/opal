const models = require("../models");

exports.UPDATE_USER = async (req, res) => {
  let client = req.body;
  try {
    let result = await models.Client.update(client, {
      where: {
        email: client.email
      }
    });
    // result.salt = undefined;
    // result.hashed_password = undefined;
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};