// import { NewEntity } from '../../Interfaces';
import { IMatcheModel } from '../Interfaces/teams/IMatcheModel';
// import { ServiceResponse } from '../Interfaces/serviceResponse';
import MatcheModel from '../models/MatcheModel';
// import { IMatches } from '../Interfaces/migrations/IMatches';
import { ITeamModel } from '../Interfaces/teams/ITeamsModel';
import ILeaderBoardFormat from '../Interfaces/ITeamsFormatBorder';
import TeamModel from '../models/TeamModel';

export default class LeaderboardService {
  constructor(
    private matcheModel: IMatcheModel = new MatcheModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getTeamsFormat(): Promise<ILeaderBoardFormat[]> {
    const teams = await this.teamModel.findAll();
    const leader: ILeaderBoardFormat[] = teams.map((t) => ({
      name: t.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    }));
    return leader;
  }

  public async getHomeTeamLWStats(): Promise<ILeaderBoardFormat[]> {
    const finishedMatches = await this.matcheModel.findAll();
    const leader = await this.getTeamsFormat();
    finishedMatches?.forEach((m) => {
      const homeTeamName = m.homeTeam?.teamName;
      const index = leader.findIndex((team) => team.name === homeTeamName);
      if (index !== -1) {
        const goalDifference = m.homeTeamGoals - m.awayTeamGoals;
        const isWin = goalDifference > 0;
        const isLoss = goalDifference < 0;
        const isDraw = goalDifference === 0;
        leader[index].totalPoints += isWin ? 3 : 0;
        leader[index].totalVictories += isWin ? 1 : 0;
        leader[index].totalLosses += isLoss ? 1 : 0;
        leader[index].totalDraws += isDraw ? 1 : 0;
      }
    });
    return leader;
  }

  public async getHomeTeamLWGoals(): Promise<ILeaderBoardFormat[]> {
    const finishedMatches = await this.matcheModel.findAll() || [];
    const leaderWGoals = await this.getHomeTeamLWStats();
    finishedMatches.forEach((m) => {
      const homeTeamName = m.homeTeam?.teamName;
      const index = leaderWGoals.findIndex((team) => team.name === homeTeamName);
      if (index !== -1) {
        leaderWGoals[index].goalsFavor += m.homeTeamGoals;
        leaderWGoals[index].goalsOwn += m.awayTeamGoals;
      }
    });
    return leaderWGoals;
  }

  public async getTotalGames(): Promise<ILeaderBoardFormat[]> {
    const leaderWGoals = await this.getHomeTeamLWGoals();
    const leaderWGoals2 = [...leaderWGoals];
    leaderWGoals2.forEach((team, i) => {
      const totalGames = team.totalVictories + team.totalDraws + team.totalLosses;
      leaderWGoals[i].totalGames = totalGames;
    });
    return leaderWGoals;
  }

  public async getLeaderBoard(): Promise<ILeaderBoardFormat[]> {
    const leaderBoard = await this.getTotalGames();
    return leaderBoard.sort((a, b) => b.totalPoints - a.totalPoints) as ILeaderBoardFormat[];
  }
}
