import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Sequelize,
  CreationOptional,
} from 'sequelize';
import { Champion } from './Champion.model';
import { Summoner } from './Summoner.model';

export class ChampionStatistics extends Model<
  InferAttributes<ChampionStatistics>,
  InferCreationAttributes<ChampionStatistics>
> {
  declare summoner_id: number;
  declare champion_id: number;
  declare times_played: CreationOptional<number>;
  declare with_champion_wins: CreationOptional<number>;
  declare with_champion_loses: CreationOptional<number>;
  declare times_played_against: CreationOptional<number>;
  declare against_champion_wins: CreationOptional<number>;
  declare against_champion_loses: CreationOptional<number>;
}

export const initChampionStatisticsModel = async (sequelize: Sequelize) => {
  ChampionStatistics.init(
    {
      summoner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      champion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      times_played: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      with_champion_wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      with_champion_loses: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      times_played_against: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      against_champion_wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      against_champion_loses: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      indexes: [{ fields: ['summoner_id', 'champion_id'], unique: true }],
      sequelize,
      tableName: 'champion_statistics',
    }
  );

  await Summoner.hasOne(ChampionStatistics, {
    foreignKey: 'summoner_id', //  FOREIGN KEY (summoner_id)
    sourceKey: 'id', //                REFERENCES Summoner (id)
  });

  await Champion.hasOne(ChampionStatistics, {
    foreignKey: 'champion_id', //  FOREIGN KEY (summoner_id)
    sourceKey: 'id', //                REFERENCES Summoner (id)
  });
};
