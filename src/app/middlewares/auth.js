import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

function authMiddlewares(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [_, token] = authToken.split(' ');

  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw new Error();
      }

      req.userId = decoded.id;
      req.userName = decoded.name;
    });
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }

  return next();
}

export default authMiddlewares;
