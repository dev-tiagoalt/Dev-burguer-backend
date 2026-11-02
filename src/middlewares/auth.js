import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

const authMiddleware = (request, response, next) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ erro: 'Token not provided' });
  }

  const token = authToken.split(' ')[1];

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    request.userId = decoded.id;
    return next();
  } catch (_error) {
    return response.status(401).json({ erro: 'Token is invalid' });
  }
};

export default authMiddleware;
