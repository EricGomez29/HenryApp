const jwt = require("jsonwebtoken");
import moment from "moment";
import dotenv from 'dotenv';

dotenv.config();

function createToken(user, res) {
  const payload = {
    sub: user._id,
    ait: moment().unix(),
    exp: moment().add(14, 'days').unix,
  }

  const accessToken = jwt.sign({ payload}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "14days"
  });

   return { userId: user._id, token: accessToken} 
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