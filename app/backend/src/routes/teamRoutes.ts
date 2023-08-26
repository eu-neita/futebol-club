import { Request, Router, Response } from 'express';
import TeamController from '../controller/teamController';

const teamController = new TeamController();

const teamsRoutes = Router();

teamsRoutes.get(
  '/teams',
  (req: Request, res: Response) => teamController.getAllTeams(req, res),
);

export default teamsRoutes;
