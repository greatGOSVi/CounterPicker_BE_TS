import { SummonerChampionStatistics } from '../models/SummonerChampionStatistics.model';

export const findOrCreateSummonerChampionStatistics = async (
  summoner_id: number,
  champion_id: number
) => {
  try {
    const botStats = await findOrCreateSummonerChampionStatisticsByLane(
      summoner_id,
      champion_id,
      'BOT'
    );
    const jgStats = await findOrCreateSummonerChampionStatisticsByLane(
      summoner_id,
      champion_id,
      'JG'
    );
    const midStats = await findOrCreateSummonerChampionStatisticsByLane(
      summoner_id,
      champion_id,
      'MID'
    );
    const suppStats = await findOrCreateSummonerChampionStatisticsByLane(
      summoner_id,
      champion_id,
      'SUPP'
    );
    const topStats = await findOrCreateSummonerChampionStatisticsByLane(
      summoner_id,
      champion_id,
      'TOP'
    );

    return {
      bot: botStats?.summonerChampionStatistics,
      jg: jgStats?.summonerChampionStatistics,
      mid: midStats?.summonerChampionStatistics,
      top: topStats?.summonerChampionStatistics,
      supp: suppStats?.summonerChampionStatistics,
    };
  } catch (error) {
    console.error(error);
  }
};

export const findOrCreateSummonerChampionStatisticsByLane = async (
  summoner_id: number,
  champion_id: number,
  lane: string
) => {
  try {
    const [summonerChampionStatistics, created] =
      await SummonerChampionStatistics.findOrCreate({
        where: { summoner_id, champion_id, lane },
      });

    return {
      summonerChampionStatistics: summonerChampionStatistics,
      created: created,
    };
  } catch (error) {
    console.error(error);
  }
};
