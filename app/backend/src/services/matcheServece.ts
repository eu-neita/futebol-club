// import { NewEntity } from '../../Interfaces';
import { IMatcheModel } from '../Interfaces/teams/IMatcheModel';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import MatcheModel from '../models/MatcheModel';
import { IMatches } from '../Interfaces/migrations/IMatches';
import { ITeamModel } from '../Interfaces/teams/ITeamsModel';
import TeamModel from '../models/TeamModel';

export default class MatcheService {
  constructor(
    private matcheModel: IMatcheModel = new MatcheModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getByIdTeam(id: number): Promise<{ teamName: string | undefined }> {
    const tk = await this.teamModel.findById(id);
    return { teamName: tk?.teamName };
  }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[] | null | unknown>> {
    const allMatches = await this.matcheModel.findAll();
    const object = allMatches?.map(async (match): Promise<IMatches> => {
      const homeTeam = await this.getByIdTeam(match.homeTeamId);
      const awayTeam = await this.getByIdTeam(match.awayTeamId);
      return {
        ...match,
        homeTeam,
        awayTeam,
      };
    });
    return { status: 200, data: await Promise.all(object || []) };
  }
}
