require('dotenv').config();
const jwt = require('jsonwebtoken');

// middleware function to check if the access token is valid
// middleware to be added to every business routes
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = (authHeader && authHeader.split(' ')[1]) || req.query.token; // authorization :Bearer TOKEN

  if (token == null) return res.status(403).json('Unauthorised'); // 403-unautherised

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err, 'err verify token');
      return res.status(403).json('forbidden');
    }
    req.user = user;
    next();
  });
};
