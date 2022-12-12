import { Router, Request, Response } from 'express';
import {
  findBySummonerId,
  findOrCreateGameStatistics,
} from '../../services/GameStatistics.service';

const GameStatisticsRouter = Router();

GameStatisticsRouter.post(
  '/:summonerId',
  async (req: Request, res: Response) => {
    const id: string = req.params.summonerId;

    if (!id) {
      return res.status(400).send({
        message: 'No Id',
      });
    }

    const gameStatistics = await findOrCreateGameStatistics(id);

    const status = gameStatistics?.created ? 201 : 200;
    return res.status(status).send(gameStatistics);
  }
);

GameStatisticsRouter.get(
  '/:summonerId',
  async (req: Request, res: Response) => {
    const summonerId = req.params.summonerId;

    if (!summonerId) {
      return res.status(400).send({ message: 'No summonerId' });
    }

    const gameStatistics = await findBySummonerId(summonerId);
    console.log(gameStatistics);

    if (!gameStatistics) {
      return res
        .status(404)
        .send({ message: `No Summoner with Id: ${summonerId}` });
    }
    return res.status(200).send(gameStatistics);
  }
);

export default GameStatisticsRouter;
