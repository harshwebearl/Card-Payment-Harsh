// Middleware to verify admin JWT token
const jwt = require('jsonwebtoken');

function adminAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Expecting 'Bearer <token>'
  if (!token) return res.status(401).json({ error: 'Token missing' });

  const secret = process.env.JWT_SECRET || 'default_secret_key';
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.adminId = decoded.id;
    next();
  });
}

module.exports = adminAuth;
