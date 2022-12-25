import express from 'express';
import SummonerRouter from './summoner/Summoner.controller';
import MatchRouter from './match/Match.controller';
import ChampionRouter from './champion/Champion.controller';
import SummonerGeneralStatisticsRouter from './summonerGeneralStatistics/SummonerGeneralStatistics.controller';

const apiRouter = express.Router();
export const appRouter = express.Router();

SummonerRouter.use('/statistics', SummonerGeneralStatisticsRouter);
SummonerRouter.use('/championStatistics', SummonerGeneralStatisticsRouter);

apiRouter.use('/summoner', SummonerRouter);
apiRouter.use('/match', MatchRouter);
apiRouter.use('/champion', ChampionRouter);

appRouter.use('/v1', apiRouter);
