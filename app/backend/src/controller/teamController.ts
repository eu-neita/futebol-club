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

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamService.getByIdTeam(Number(id));

    if (serviceResponse.status === 401) {
      return res.status(serviceResponse.status).json(serviceResponse.data);
    }

    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
