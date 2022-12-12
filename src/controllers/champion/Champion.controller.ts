import { Router, Request, Response } from 'express';
import {
  findById,
  findOrCreateChampion,
} from '../../services/Champion.service';

const ChampionRouter = Router();

ChampionRouter.post('/:name', async (req: Request, res: Response) => {
  const name: string = req.params.name;

  if (!name) {
    return res.status(400).send({
      message: 'No Name',
    });
  }

  const champion = await findOrCreateChampion(name);

  const status = champion?.created ? 201 : 200;
  return res.status(status).send(champion);
});

ChampionRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: 'No Id' });
  }

  const champion = await findById(id);

  if (!champion) {
    return res
      .status(404)
      .send({ message: `Not Champion found with Id: ${id}` });
  }
  return res.status(200).send(champion);
});

export default ChampionRouter;
