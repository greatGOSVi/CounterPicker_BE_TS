import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Sequelize,
  CreationOptional,
} from 'sequelize';
import { Summoner } from './Summoner.model';

export class SummonerGeneralStatistics extends Model<
  InferAttributes<SummonerGeneralStatistics>,
  InferCreationAttributes<SummonerGeneralStatistics>
> {
  declare summoner_id: number;
  declare total_games: CreationOptional<number>;
  declare total_wins: CreationOptional<number>;
  declare total_loses: CreationOptional<number>;
  declare soloq_wins: CreationOptional<number>;
  declare soloq_loses: CreationOptional<number>;
  declare flex_wins: CreationOptional<number>;
  declare flex_loses: CreationOptional<number>;
  declare bot_games: CreationOptional<number>;
  declare jg_games: CreationOptional<number>;
  declare mid_games: CreationOptional<number>;
  declare supp_games: CreationOptional<number>;
  declare top_games: CreationOptional<number>;
}

export const initSummonerGeneralStatisticsModel = async (
  sequelize: Sequelize
) => {
  SummonerGeneralStatistics.init(
    {
      summoner_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      total_games: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      total_wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      total_loses: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      soloq_wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      soloq_loses: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      flex_wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      flex_loses: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      bot_games: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      jg_games: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      mid_games: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      supp_games: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      top_games: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'game_statistics',
    }
  );

  await Summoner.hasOne(SummonerGeneralStatistics, {
    foreignKey: 'summoner_id', //  FOREIGN KEY (summoner_id)
    sourceKey: 'id', //                REFERENCES Summoner (id)
  });
};
