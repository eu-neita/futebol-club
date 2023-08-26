// import { NewEntity } from '../../Interfaces';
import { ITeams } from '../Interfaces/migrations/ITeams';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import { ITeamModel } from '../Interfaces/teams/ITeamsModel';
import TeamModel from '../models/teamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allBooks = await this.teamModel.findAll();
    return { status: 200, data: allBooks };
  }
}
