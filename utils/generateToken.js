const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // token will expire in 1 hour
  });
};
module.exports=generateToken;