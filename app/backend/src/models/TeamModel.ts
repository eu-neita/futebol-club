import { ITeamModel } from '../Interfaces/teams/ITeamsModel';
import Team from '../database/models/TeamModel';
import { ITeams } from '../Interfaces/migrations/ITeams';

export default class TeamModel implements ITeamModel {
  private model = Team;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }
}
