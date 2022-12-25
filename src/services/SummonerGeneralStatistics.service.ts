import { SummonerGeneralStatistics } from '../models/SummonerGeneralStatistics.model';

export const findOrCreateSummonerGeneralStatistics = async (
  summoner_id: string
) => {
  try {
    const [summonerGeneralStatistics, created] =
      await SummonerGeneralStatistics.findOrCreate({
        where: { summoner_id },
      });

    return {
      summonerGeneralStatistics: summonerGeneralStatistics,
      created: created,
    };
  } catch (error) {
    console.error(error);
  }
};

export const findBySummonerId = async (id: string) => {
  try {
    const summonerGeneralStatistics = await SummonerGeneralStatistics.findByPk(
      id
    );

    return summonerGeneralStatistics;
  } catch (error) {
    console.error(error);
  }
};
