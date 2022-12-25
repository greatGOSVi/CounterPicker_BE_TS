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

export class SummonerChampionStatistics extends Model<
  InferAttributes<SummonerChampionStatistics>,
  InferCreationAttributes<SummonerChampionStatistics>
> {
  declare summoner_id: number;
  declare champion_id: number;
  declare lane: string;
  declare times_played: CreationOptional<number>;
  declare with_champion_wins: CreationOptional<number>;
  declare with_champion_loses: CreationOptional<number>;
  declare times_played_against: CreationOptional<number>;
  declare against_champion_wins: CreationOptional<number>;
  declare against_champion_loses: CreationOptional<number>;
}

export const initSummonerChampionStatisticsModel = async (
  sequelize: Sequelize
) => {
  SummonerChampionStatistics.init(
    {
      summoner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      champion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lane: {
        type: DataTypes.STRING,
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
      indexes: [
        { fields: ['summoner_id', 'champion_id', 'lane'], unique: true },
      ],
      sequelize,
      tableName: 'champion_statistics',
    }
  );

  await Summoner.hasOne(SummonerChampionStatistics, {
    foreignKey: 'summoner_id', //  FOREIGN KEY (summoner_id)
    sourceKey: 'id', //                REFERENCES Summoner (id)
  });

  await Champion.hasOne(SummonerChampionStatistics, {
    foreignKey: 'champion_id', //  FOREIGN KEY (summoner_id)
    sourceKey: 'id', //                REFERENCES Summoner (id)
  });
};
