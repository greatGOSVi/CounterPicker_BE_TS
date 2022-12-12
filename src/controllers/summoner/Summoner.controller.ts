import dotenv from 'dotenv';
import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import {
  findById,
  findOrCreateSummoner,
} from '../../services/Summoner.service';

dotenv.config();
const RIOT_API_KEY = process.env.RIOT_API_KEY;
const SummonerRouter = Router();

SummonerRouter.post('/', async (req: Request, res: Response) => {
  const name: string = req.body.summonerName;
  const region: string = req.body.region;

  if (!name) {
    return res.status(400).send({
      message: 'No Name',
      data: req.body,
    });
  }
  if (!region) {
    return res.status(400).send({
      message: 'No Region',
    });
  }

  const summoner = await findOrCreateSummoner(name, region);

  const status = summoner?.created ? 201 : 200;
  return res.status(status).send(summoner);
});

SummonerRouter.get('/info', async (req: Request, res: Response) => {
  try {
    const summInfoResponse = await fetch(
      `https://${req.query.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.sumName}?api_key=${RIOT_API_KEY}`
    );
    const summInfo = await summInfoResponse.json();

    return res.status(200).send(summInfo);
  } catch (error) {
    console.error(error);
  }
});

SummonerRouter.get('/league', async (req: Request, res: Response) => {
  try {
    const summLeagueResponse = await fetch(
      `https://${req.query.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.query.sumID}?api_key=${RIOT_API_KEY}`
    );
    const summLeague = await summLeagueResponse.json();

    return res.status(200).send(summLeague);
  } catch (error) {
    console.error(error);
  }
});

SummonerRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: 'No id' });
  }

  const summoner = await findById(id);

  if (!summoner) {
    return res.status(404).send({ message: `No Summoner with Id: ${id}` });
  }
  return res.status(200).send(summoner);
});

export default SummonerRouter;
