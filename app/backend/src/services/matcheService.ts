// import { NewEntity } from '../../Interfaces';
import { IMatcheModel, MatcheCeateDataType, ResultsType } from '../Interfaces/teams/IMatcheModel';
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

  // public async getByIdTeam(id: number): Promise<{ teamName: string | undefined }> {
  //   const tk = await this.teamModel.findById(id);
  //   return { teamName: tk?.teamName };ass neita
  // }

  public async getAllMatches(param: string | undefined):
  Promise<ServiceResponse<IMatches[] | null | unknown>> {
    const allMatches = await this.matcheModel.findAll();
    // const object = allMatches?.map(async (match): Promise<IMatches> => {
    //   const homeTeam = await this.getByIdTeam(match.homeTeamId);
    //   const awayTeam = await this.getByIdTeam(match.awayTeamId);
    //   return {
    //     ...match,
    //     homeTeam,
    //     awayTeam,
    //   };
    // });
    // const datas = await Promise.all(object || []); ass neita
    if (param) {
      return {
        status: 200,
        data: allMatches?.filter((par) => par.inProgress === (param === 'true')) };
    }
    return { status: 200, data: allMatches };
  }

  public async finishedMatch(param: number): Promise<ServiceResponse<object | null | undefined>> {
    const updateMacthes = await this.matcheModel.updateById(param);
    if (!updateMacthes) return { status: 400, data: { message: 'id not found' } };
    return { status: 200, data: { message: updateMacthes } };
  }

  public async updateMatchesResultsById(
    id:number,
    results: ResultsType,
  ): Promise<ServiceResponse<object | null | undefined>> {
    const updateResults = await this.matcheModel.updateMatchesById(id, results);
    if (!updateResults) return { status: 400, data: { message: 'id not found' } };
    return { status: 200, data: { message: updateResults } };
  }

  public async createMatches(results: MatcheCeateDataType):
  Promise<ServiceResponse<string | IMatches>> {
    const updateMacthes = await this.matcheModel.createMatchesBy(results);
    return { status: 200, data: updateMacthes };
  }
}
