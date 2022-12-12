import express, { Application } from 'express';
import cors from 'cors';
import { appRouter } from './controllers/Router';

import bodyParser from 'body-parser';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', appRouter);

export default app;
