import { GameStatistics } from '../models/GameStatistics.model';

export const findOrCreateGameStatistics = async (summoner_id: string) => {
  try {
    const [gameStatistics, created] = await GameStatistics.findOrCreate({
      where: { summoner_id },
    });

    return { gameStatistics: gameStatistics, created: created };
  } catch (error) {
    console.error(error);
  }
};

export const findBySummonerId = async (id: string) => {
  try {
    const gameStatistics = await GameStatistics.findByPk(id);

    return gameStatistics;
  } catch (error) {
    console.error(error);
  }
};
