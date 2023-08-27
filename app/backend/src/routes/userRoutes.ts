import { Request, Router, Response } from 'express';
import UserController from '../controller/userController';
import loginVerifications from '../middlewares/userLoginMiddleware';
import jwtVerificated from '../middlewares/jwtVerificateTokenMiddleware';

const userController = new UserController();

const userRoutes = Router();

userRoutes.get(
  '/login/role',
  jwtVerificated,
  (req: Request, res: Response) => userController.getRole(req, res),
);

userRoutes.post(
  '/login',
  loginVerifications,
  (req: Request, res: Response) => userController.userLogin(req, res),
);

export default userRoutes;
