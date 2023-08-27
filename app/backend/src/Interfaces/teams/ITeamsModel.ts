import { ITeams } from '../migrations/ITeams';

export interface ITeamModel {
  findAll(): Promise<ITeams[]>,
  findById(id: ITeams['id']): Promise<ITeams | null>
}
