import { Champion } from '../models/Champion.model';

export const findOrCreateChampion = async (name: string) => {
  try {
    const [champion, created] = await Champion.findOrCreate({
      where: { name },
    });

    return { champion: champion, created: created };
  } catch (error) {
    console.error(error);
  }
};

export const findById = async (id: string) => {
  try {
    const champion = await Champion.findByPk(id);

    return champion;
  } catch (error) {
    console.error(error);
  }
};
