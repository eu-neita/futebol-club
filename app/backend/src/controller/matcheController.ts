import { Request, Response } from 'express';
import MatcheService from '../services/matcheService';

export default class MatcheController {
  constructor(
    private matcheService = new MatcheService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    console.log(inProgress);
    const serviceResponse = await this.matcheService
      .getAllMatches(inProgress === 'true' || undefined);
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
