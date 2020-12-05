const jwt = require("jwt-simple");
const moment = require("moment");
import dotenv from 'dotenv';

dotenv.config();

function createToken(user) {
  const payload = {
    sub: {
      _id: user._id,
      email: user.email,
      username: user.username
    },
    iat: moment().unix(),
    exp: moment()
      .add(14, "days")
      .unix()
  };
  console.log(payload)
  return jwt.encode(payload, process.env.SECRET_TOKEN);
}

function decodeToken(bearer) {
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

function destroyToken(bearer){
  
}

module.exports = {
  createToken,
  decodeToken
};