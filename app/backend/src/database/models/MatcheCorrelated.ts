import Team from './TeamModel';
import Matche from './MatcheModel';

Matche.belongsTo(Team, { as: 'HomeTeam', foreignKey: 'homeTeamId' });
Matche.belongsTo(Team, { as: 'AwayTeam', foreignKey: 'awayTeamId' });

Team.hasMany(Matche, { foreignKey: 'homeTeamId' });
Team.hasMany(Matche, { foreignKey: 'awayTeamId' });
