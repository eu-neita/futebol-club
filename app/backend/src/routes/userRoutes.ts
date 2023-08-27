import { Request, Router, Response } from 'express';
import UserController from '../controller/userController';
import loginVerifications from '../middlewares/userLoginMiddleware';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post(
  '/login',
  loginVerifications,
  (req: Request, res: Response) => userController.userLogin(req, res),
);

export default userRoutes;
