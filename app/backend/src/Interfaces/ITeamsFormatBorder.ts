type ILeaderBoardFormat = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  efficiency: string;
  goalsBalance: number;
};

export default ILeaderBoardFormat;
