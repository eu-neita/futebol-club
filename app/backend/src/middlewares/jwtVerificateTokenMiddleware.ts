import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const removeBarrer = (auth: string | undefined) => auth?.split(' ')[1] || '';

const jwtVerificated = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const decoded = jwt.decode(removeBarrer(authorization)) as jwt.JwtPayload | null;

  if (!decoded?.email) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  req.params.email = decoded?.email;
  return next();
};

export default jwtVerificated;
