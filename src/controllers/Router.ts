import express from 'express';
import SummonerRouter from './summoner/Summoner.controller';
import MatchRouter from './match/Match.controller';
import ChampionRouter from './champion/Champion.controller';
import GameStatisticsRouter from './gameStatistics/GameStatistics.controller';

const apiRouter = express.Router();
export const appRouter = express.Router();

apiRouter.use('/summoner', SummonerRouter);
apiRouter.use('/match', MatchRouter);
apiRouter.use('/champion', ChampionRouter);
apiRouter.use('/gameStatistics', GameStatisticsRouter);

appRouter.use('/v1', apiRouter);
