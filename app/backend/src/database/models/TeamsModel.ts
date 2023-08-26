import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import Matche from './MatchesModel';

class Team extends Model<InferAttributes<Team>,
InferCreationAttributes<Team>> {
  declare id: CreationOptional<number>;

  declare teamName: string;

}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});

Team.hasMany(Matche, { foreignKey: 'homeTeamId' });
Team.hasMany(Matche, { foreignKey: 'awayTeamId' });

export default Team;
