const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token nahi mila. Login karo.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'User nahi mila.' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalid hai.' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Sirf Admin yeh kar sakta hai.' });
  }
  next();
};

module.exports = { auth, adminOnly };
