import { Request, Response } from 'express';
import MatcheService from '../services/matcheService';

export default class MatcheController {
  constructor(
    private matcheService = new MatcheService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const serviceResponse = await this.matcheService
      .getAllMatches(inProgress?.toString());
    res.status(serviceResponse.status).json(serviceResponse.data);
  }

  public async finishedMatches(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matcheService
      .finishedMatch(parseFloat(id));
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
