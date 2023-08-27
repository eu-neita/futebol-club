// import validator from 'validator';
import { Request, Response, NextFunction } from 'express';

const loginVerifications = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  // !validator.isEmail(email);
  next();
};

export default loginVerifications;
