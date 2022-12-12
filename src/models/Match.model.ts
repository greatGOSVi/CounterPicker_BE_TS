import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Sequelize,
} from 'sequelize';

export class Match extends Model<
  InferAttributes<Match>,
  InferCreationAttributes<Match>
> {
  declare id: string;
  declare summoner_id: number;
}

export const initMatchModel = (sequelize: Sequelize) => {
  Match.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      summoner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'matches',
    }
  );
};
