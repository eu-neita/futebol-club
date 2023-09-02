import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderBoard();
    res.status(200).json(serviceResponse);
  }
}
