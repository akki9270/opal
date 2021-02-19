const models = require("../models");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { Op } = require('sequelize');

exports.SIGNUP = async (req, res) => {
  console.log("req.body ", req.body);
  let client = req.body;
  console.log(' client ', client);  
  try {
    let result = await models.Client.create(client);
    result.salt = undefined;
    result.hashed_password = undefined;
    res.json(result);
  } catch (error) {
    res.status(400).json({error: {message: error.message}});
  }
};

exports.SIGNIN = async (req,res) => {
  const { email, password } = req.body;

  let user = await models.Client.findOne({ 
    attributes: { exclude: ['deletedAt']},
    where: { email: email, deletedAt: { [Op.eq]: null}} 
  });
  if (!user) {
    return res.status(400).json({
      error: "User with this email does not exist. Please Singup"
    })
  }
  

  if (!user.isAuthenticate(password)) {
    return res.status(401).json({
      error: { message: "Email and password does not match." }
    })
  };

  // do not send salt in response
  user.salt = undefined;
  user.hashed_password = undefined;

  const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);

  // persist token as 't' in cookie with expiry date
  // res.cookie("t", token);
  return res.status(200)
            .cookie("t", token, {expires: new Date(Date.now() + 90000)})
            .json({token, user });
}