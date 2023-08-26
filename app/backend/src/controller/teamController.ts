import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
