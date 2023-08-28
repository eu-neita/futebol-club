import { IMatches } from '../migrations/IMatches';

export interface IMatcheModel {
  findAll(): Promise<IMatches[] | null>,
  // findById(id: IMatches['id']): Promise<IMatches | null>
}
