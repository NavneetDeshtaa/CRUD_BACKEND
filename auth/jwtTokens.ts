import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization');
  
  if (!token) {
    res.status(401).json({ error: 'No token, authorization denied' });
    return;
  }


  try {
    const decoded = jwt.verify(token, 'dfghjytrthjmnbvc234567887654e') as jwt.JwtPayload;
    req.user = decoded.id as string; 
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export default auth;
