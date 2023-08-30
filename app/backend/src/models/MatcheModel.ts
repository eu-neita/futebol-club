import { FindOptions } from 'sequelize';
import Team from '../database/models/TeamModel';
import { IMatches } from '../Interfaces/migrations/IMatches';
import { IMatcheModel, MatcheCeateDataType, ResultsType } from '../Interfaces/teams/IMatcheModel';
import Matche from '../database/models/MatcheModel';

export default class MatchModel implements IMatcheModel {
  private model = Matche;
  private model2 = Team;

  async findAll(): Promise<IMatches[] | null> {
    const dbData = await this.model.findAll({
      include: [
        { model: this.model2, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: this.model2, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    } as FindOptions);
    return dbData;
    // .map(({ id,
    //   homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }) => (
    //   { id,
    //     homeTeamId,
    //     homeTeamGoals,
    //     awayTeamId,
    //     awayTeamGoals,
    //     inProgress }
    // )); ass neita
  }

  async updateById(id: number): Promise<undefined | string> {
    const mache = await this.model.findByPk(id);
    const finished = await mache?.update({ inProgress: false });
    return finished !== null ? 'finished' : undefined;
  }

  async updateMatchesById(id: number, results: ResultsType): Promise<undefined | string> {
    const mache = await this.model.findByPk(id);
    const updated = await mache?.update(results);
    return updated !== null ? 'updated' : undefined;
  }

  async createMatchesBy(results: MatcheCeateDataType): Promise<IMatches | string> {
    const matche = await this.model.create({ ...results, inProgress: true });
    return matche;
  }
}
