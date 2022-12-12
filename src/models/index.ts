import { Sequelize } from 'sequelize';
import { initChampionModel } from './Champion.model';
import { initGameStatisticsModel } from './GameStatistics.model';
import { initMatchModel } from './Match.model';
import { initSummonerModel } from './Summoner.model';

export let sequelize: Sequelize;

const models = [
  initSummonerModel,
  initMatchModel,
  initChampionModel,
  initGameStatisticsModel,
];

export const startSequelize = async (
  db_hostname: string,
  db_name: string,
  db_password: string,
  db_username: string
) => {
  const sequelize = new Sequelize(db_name, db_username, db_password, {
    dialect: 'postgres',
    host: db_hostname,
  });

  for (const initModel of models) {
    initModel(sequelize);
  }

  await sequelize.sync({ force: process.env.ENVIRONMENT === 'testing' });

  return sequelize;
};
