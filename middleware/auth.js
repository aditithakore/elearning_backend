// middleware/auth.js
const jwt = require('jsonwebtoken');
const USERAUTH = require('../model/userauth');
require('dotenv').config();

// async function verifyToken(req, res, next) {
//   const token = req.headers['authorization'];
//   if (!token) {
//     return res.status(403).json({ error: 'A token is required for authentication' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userAuth = await USERAUTH.findById(decoded.userId).populate('user');
//     if (!userAuth) {
//       return res.status(401).json({ error: 'Unauthorized: User not found' });
//     }
//     req.user = userAuth.user; // Attach the user data to the request
//     next();
//   } catch (error) {
//     console.error('Token verification error:', error);
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// }




async function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  console.log('Received token:', token); // Log the token

  if (!token) {
    return res.status(403).json({ error: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Split to get the token
    // ...
    const userAuth = await USERAUTH.findById(decoded.userId).populate('user');
    if (!userAuth) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }
    req.user = userAuth.user; // Attach the user data to the request
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}



module.exports = verifyToken;