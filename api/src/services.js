const jwt = require("jsonwebtoken");
import dotenv from 'dotenv';

dotenv.config();

function createToken(user) {
  const payload = {userId: user._id, email: user.email};
  const token =jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn: "1h"});
  // console.log(token)
  return { userId: user._id, token: token, tokenExpiration: 1} 
}

function decodeToken(bearer) {
  console.log(bearer)
  const token = bearer.split(" ")[1];
  const payload = jwt.decode(token, process.env.SECRET_TOKEN);

  if (payload.exp <= moment().unix()) {
    reject({
      status: 401,
      message: "El token ha expirado"
    });
  }
  return payload.sub;
}


module.exports = {
  createToken,
  decodeToken
};