import { IMatches } from '../migrations/IMatches';

export interface IMatcheModel {
  findAll(): Promise<IMatches[] | null>,
  updateById(id: IMatches['id']): Promise< undefined | string>
}
