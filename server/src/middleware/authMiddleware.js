import jwt from 'jsonwebtoken';

/** Protect routes — expects `Authorization: Bearer <token>` */
const protect = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorised — no token' });
  }

  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Not authorised — invalid token' });
  }
};

/** Admin-only guard (call after protect) */
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden — admin only' });
  }
  next();
};

export { protect, adminOnly };
