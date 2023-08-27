// import { NewEntity } from '../../Interfaces';
import { ITeams } from '../Interfaces/migrations/ITeams';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import { ITeamModel } from '../Interfaces/teams/ITeamsModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 200, data: allTeams };
  }

  public async getByIdTeam(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 401, data: { message: `Team ${id} not found` } };
    return { status: 200, data: team };
  }
}
