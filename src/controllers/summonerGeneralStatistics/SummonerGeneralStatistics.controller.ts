import { Router, Request, Response } from 'express';
import {
  findBySummonerId,
  findOrCreateSummonerGeneralStatistics,
} from '../../services/SummonerGeneralStatistics.service';

const SummonerGeneralStatisticsRouter = Router();

SummonerGeneralStatisticsRouter.post(
  '/:summonerId',
  async (req: Request, res: Response) => {
    const id: string = req.params.summonerId;

    if (!id) {
      return res.status(400).send({
        message: 'No Id',
      });
    }

    const summonerGeneralStatistics =
      await findOrCreateSummonerGeneralStatistics(id);

    const status = summonerGeneralStatistics?.created ? 201 : 200;
    return res.status(status).send(summonerGeneralStatistics);
  }
);

SummonerGeneralStatisticsRouter.get(
  '/:summonerId',
  async (req: Request, res: Response) => {
    const summonerId = req.params.summonerId;

    if (!summonerId) {
      return res.status(400).send({ message: 'No summonerId' });
    }

    const summonerGeneralStatistics = await findBySummonerId(summonerId);
    console.log(summonerGeneralStatistics);

    if (!summonerGeneralStatistics) {
      return res
        .status(404)
        .send({ message: `No Summoner with Id: ${summonerId}` });
    }
    return res.status(200).send(summonerGeneralStatistics);
  }
);

export default SummonerGeneralStatisticsRouter;
