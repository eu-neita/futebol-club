import { Request, Router, Response } from 'express';
import TeamController from '../controller/teamController';

const teamController = new TeamController();

const teamsRoutes = Router();

teamsRoutes.get(
  '/teams',
  (req: Request, res: Response) => teamController.getAllTeams(req, res),
);

teamsRoutes.get(
  '/teams/:id',
  (req: Request, res: Response) => teamController.getTeamById(req, res),
);

export default teamsRoutes;
