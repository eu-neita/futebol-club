import Team from './TeamsModel';
import Matche from './MatchesModel';

Matche.belongsTo(Team, { as: 'HomeTeam', foreignKey: 'homeTeamId' });
Matche.belongsTo(Team, { as: 'AwayTeam', foreignKey: 'awayTeamId' });
