import { Request, Router, Response } from 'express';
import MatcheController from '../controller/matcheController';
import jwtVerificated from '../middlewares/jwtVerificateTokenMiddleware';

const matcheController = new MatcheController();

const matcheRoutes = Router();

matcheRoutes.get(
  '/matches',
  (req: Request, res: Response) => matcheController.getAllMatches(req, res),
);

matcheRoutes.patch(
  '/matches/:id/finish',
  jwtVerificated,
  (req: Request, res: Response) => matcheController.finishedMatches(req, res),
);

export default matcheRoutes;
