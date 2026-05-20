import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

interface JwtPayload {
  id: string;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      const user = await User.findById(decoded.id).select('-passwordHash');
      
      if (!user) {
        res.status(401).json({ status: 'error', message: 'Not authorized, user not found' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ status: 'error', message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ status: 'error', message: 'Not authorized, no token' });
  }
};

export const adminGuard = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ status: 'error', message: 'Not authorized as an admin' });
  }
};