const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
      const decoded = jwt.verify(token, 'yourJWTSecret');
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      res.status(400).json({ message: 'Token is not valid' });
    }
  };
};

module.exports = auth;
