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

  public async updateMatchesResultsById(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matcheService
      .updateMatchesResultsById(parseFloat(id), { homeTeamGoals, awayTeamGoals });
    res.status(serviceResponse.status).json(serviceResponse.data);
  }

  public async createMatches(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId } = req.body;
    const serviceResponse = await this.matcheService
      .createMatches({ homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId });
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
