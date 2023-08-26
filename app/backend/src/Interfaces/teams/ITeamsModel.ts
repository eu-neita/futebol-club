import { ITeams } from '../migrations/ITeams';

export interface ITeamModel {
  findAll(): Promise<ITeams[]>,
}
