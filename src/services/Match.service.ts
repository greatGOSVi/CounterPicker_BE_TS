import { Match } from '../models/Match.model';

export const findOrCreateMatch = async (id: string, summoner_id: number) => {
  try {
    const [match, created] = await Match.findOrCreate({
      where: { id, summoner_id },
    });

    return { match: match, created: created };
  } catch (error) {
    console.error(error);
  }
};
