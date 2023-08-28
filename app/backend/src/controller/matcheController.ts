import { Request, Response } from 'express';
import MatcheService from '../services/matcheServece';

export default class MatcheController {
  constructor(
    private matcheService = new MatcheService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const serviceResponse = await this.matcheService.getAllMatches();
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
