import { IMatches } from '../migrations/IMatches';

export type ResultsType = {
  homeTeamGoals:IMatches['homeTeamGoals'],
  awayTeamGoals:IMatches['awayTeamGoals'],
};

export type MatcheCeateDataType = {
  homeTeamId: IMatches['homeTeamId'],
  awayTeamId: IMatches['awayTeamId'],
  homeTeamGoals: IMatches['homeTeamGoals'],
  awayTeamGoals: IMatches['awayTeamGoals'],
};

export interface IMatcheModel {
  findAll(): Promise<IMatches[] | null>;
  updateById(id: IMatches['id']): Promise<undefined | string>;
  updateMatchesById(id: IMatches['id'], results: ResultsType): Promise<undefined | string>;
  createMatchesBy(results: MatcheCeateDataType): Promise<IMatches | string>;
}
