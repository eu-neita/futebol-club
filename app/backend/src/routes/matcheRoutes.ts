import { Request, Router, Response } from 'express';
import MatcheController from '../controller/matcheController';

const matcheController = new MatcheController();

const matcheRoutes = Router();

matcheRoutes.get(
  '/matches',
  (req: Request, res: Response) => matcheController.getAllMatches(req, res),
);

export default matcheRoutes;
