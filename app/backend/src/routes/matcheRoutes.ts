import { Request, Router, Response } from 'express';
import MatcheController from '../controller/matcheController';
import jwtVerificated from '../middlewares/jwtVerificateTokenMiddleware';
import matchesVerificated from '../middlewares/matchesMiddleware';

const matcheController = new MatcheController();

const matcheRoutes = Router();

matcheRoutes.get(
  '/matches',
  (req: Request, res: Response) => matcheController.getAllMatches(req, res),
);

matcheRoutes.post(
  '/matches',
  jwtVerificated,
  matchesVerificated,
  (req: Request, res: Response) => matcheController.createMatches(req, res),
);

matcheRoutes.patch(
  '/matches/:id',
  jwtVerificated,
  (req: Request, res: Response) => matcheController.updateMatchesResultsById(req, res),
);

matcheRoutes.patch(
  '/matches/:id/finish',
  jwtVerificated,
  (req: Request, res: Response) => matcheController.finishedMatches(req, res),
);

export default matcheRoutes;
