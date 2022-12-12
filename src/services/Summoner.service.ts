import { Summoner } from '../models/Summoner.model';

// Find or Create operation
export const findOrCreateSummoner = async (name: string, region: string) => {
  try {
    const [summoner, created] = await Summoner.findOrCreate({
      where: { name, region },
    });

    return { summoner: summoner, created: created };
  } catch (error) {
    console.error(error);
  }
};

// Get by Id operation
export const findById = async (id: string) => {
  try {
    const summoner = await Summoner.findByPk(id);

    return summoner;
  } catch (error) {
    console.error(error);
  }
};
