import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Sequelize,
  CreationOptional,
} from 'sequelize';

export class Champion extends Model<
  InferAttributes<Champion>,
  InferCreationAttributes<Champion>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

export const initChampionModel = (sequelize: Sequelize) => {
  Champion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'champions',
    }
  );
};
