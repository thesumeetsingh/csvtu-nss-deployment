const jwt = require('jsonwebtoken');

   const authMiddleware = (req, res, next) => {
     const token = req.header('Authorization')?.replace('Bearer ', '');
     if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if (decoded.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin access required' });
       req.user = decoded;
       next();
     } catch (err) {
       res.status(401).json({ success: false, message: 'Invalid token' });
     }
   };

   module.exports = authMiddleware;