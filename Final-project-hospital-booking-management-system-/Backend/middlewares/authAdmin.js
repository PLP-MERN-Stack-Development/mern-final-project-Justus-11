import jwt from 'jsonwebtoken';

const authAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Expect "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    const token = authHeader.split(' ')[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded; // Attach admin info
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ success: false, message: 'Token Invalid or Expired' });
  }
};

export default authAdmin;
