import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'Token no enviado' });
  }

  const token = authorization.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || process.env.SECRET_KEY;
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Token inválido o vencido' });
  }
};
