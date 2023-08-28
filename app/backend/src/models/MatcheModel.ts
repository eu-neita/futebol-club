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

  async updateById(id: number): Promise<undefined | string> {
    const mache = await this.model.findByPk(id);
    // if (mache?.inProgress === false) return 'id not found';
    const finished = await mache?.update({ inProgress: false });
    return finished !== null ? 'finished' : undefined;
  }
}
