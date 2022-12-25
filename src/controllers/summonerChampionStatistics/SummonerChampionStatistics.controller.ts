import { Router, Request, Response } from 'express';
import { findOrCreateSummonerChampionStatistics } from '../../services/SummonerChampionStatistics.service';

const SummonerChampionStatisticsRouter = Router();

SummonerChampionStatisticsRouter.post(
  '/:summonerId/:championId',
  async (req: Request, res: Response) => {
    const summoner_id: number = Number(req.params.summonerId);
    const champion_id: number = Number(req.params.championId);

    if (!summoner_id) {
      return res.status(400).send({
        message: 'No Summoner Id',
      });
    }
    if (!champion_id) {
      return res.status(400).send({
        message: 'No Champion Id',
      });
    }

    const summonerChampionStatistics =
      await findOrCreateSummonerChampionStatistics(summoner_id, champion_id);

    return res.status(200).send(summonerChampionStatistics);
  }
);

export default SummonerChampionStatisticsRouter;
