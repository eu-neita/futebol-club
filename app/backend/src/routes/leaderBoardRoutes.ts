import { Request, Router, Response } from 'express';
import LeaderboardController from '../controller/leaderboardController';

const leaderboardControler = new LeaderboardController();

const leaderboardRoutes = Router();

leaderboardRoutes.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderboardControler.getLeaderboard(req, res),
);

export default leaderboardRoutes;
