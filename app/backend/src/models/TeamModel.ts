import { ITeamModel } from '../Interfaces/teams/ITeamsModel';
import Team from '../database/models/TeamModel';
import { ITeams } from '../Interfaces/migrations/ITeams';
// import { NewEntity } from '../Interfaces';

export default class TeamModel implements ITeamModel {
  private model = Team;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(idTeam: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(idTeam);
    if (dbData === null) return null;
    const { id, teamName }: ITeams = dbData;
    return { id, teamName };
  }
}
