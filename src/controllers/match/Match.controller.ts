import dotenv from 'dotenv';
import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import { findOrCreateMatch } from '../../services/Match.service';

dotenv.config();
const RIOT_API_KEY = process.env.RIOT_API_KEY;
const MatchRouter = Router();

/* -------------------------------------------- POSTs -------------------------------------------- */

MatchRouter.post('/', async (req: Request, res: Response) => {
  const id: string = req.body.id;
  const summoner_id: number = req.body.summoner_id;

  if (!id || id.length !== 14) {
    return res.status(400).send({
      message: 'No Id or not 14 characters long',
    });
  }
  if (!summoner_id) {
    return res.status(400).send({
      message: 'No Summoner Id',
    });
  }

  const match = await findOrCreateMatch(id, summoner_id);

  const status = match?.created ? 201 : 200;
  return res.status(status).send(match);
});

/* --------------------------------------------- GETs -------------------------------------------- */

MatchRouter.get('/list', async (req: Request, res: Response) => {
  try {
    const matchListResponse = await fetch(
      `https://${req.query.region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${req.query.puuid}/ids?type=${req.query.matchType}&start=0&count=${req.query.count}&api_key=${RIOT_API_KEY}`
    );
    const matchList = await matchListResponse.json();

    return res.status(200).send(matchList);
  } catch (error) {
    console.error(error);
  }
});

MatchRouter.get('/info', async (req: Request, res: Response) => {
  try {
    const matchInfoResponse = await fetch(
      `https://${req.query.region}.api.riotgames.com/lol/match/v5/matches/${req.query.matchId}?api_key=${RIOT_API_KEY}`
    );
    const matchInfo = await matchInfoResponse.json();

    return res.status(200).send(matchInfo);
  } catch (error) {
    console.error(error);
  }
});

export default MatchRouter;
