import validator from 'validator';
import { Request, Response, NextFunction } from 'express';

const loginVerifications = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!validator.isEmail(email) || !validator.isLength(password, { min: 6, max: 42 })) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default loginVerifications;
