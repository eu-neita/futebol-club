import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';
import Team from './TeamModel';

class Matche extends Model<InferAttributes<Matche>,
InferCreationAttributes<Matche>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matche.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

Matche.belongsTo(Team, { as: 'homeTeam', foreignKey: 'homeTeamId' });
Matche.belongsTo(Team, { as: 'awayTeam', foreignKey: 'awayTeamId' });

export default Matche;
