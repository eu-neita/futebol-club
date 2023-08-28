import { IMatches } from '../Interfaces/migrations/IMatches';
import { IMatcheModel } from '../Interfaces/teams/IMatcheModel';
import Matche from '../database/models/MatcheModel';

export default class MatchModel implements IMatcheModel {
  private model = Matche;

  async findAll(): Promise<IMatches[] | null> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id,
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }) => (
      { id,
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress }
    ));
  }
  // findById(id: number): Promise<IMatches | null> {
  //   throw new Error('Method not implemented.');
  // }
}
