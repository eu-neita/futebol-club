import { Request, Router, Response } from 'express';
import UserController from '../controller/userController';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post(
  '/login',
  (req: Request, res: Response) => userController.userLogin(req, res),
);

export default userRoutes;
