import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';

export class Summoner extends Model<
  InferAttributes<Summoner>,
  InferCreationAttributes<Summoner>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare region: string;
}

export const initSummonerModel = (sequelize: Sequelize) => {
  Summoner.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      region: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'summoners',
    }
  );
};
