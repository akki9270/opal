const models = require("../models");
const { Op } = require('sequelize');

exports.UPDATE_USER = async (req, res) => {
  let client = req.body;
  try {
    let result = await models.Client.update(client, {
      where: {
        email: client.email
      }
    });    
    if (result && result.length > 0 && result[0] === 1) {      
      let user = await models.Client.findOne({
        attributes: { exclude: ['deletedAt'] },
        where: { email: client.email, deletedAt: { [Op.eq]: null } }
      });
      if (!user) {
        return res.status(400).json({
          error: "User with this email does not exist. Please Singup"
        })
      }
      // do not send salt in response
      user.salt = undefined;
      user.hashed_password = undefined;
      let data = { "user": user };
      console.log("result--user: ", res.json(data))
      return res.json(data);
    }    
    return res.json(result);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};