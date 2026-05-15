import express from 'express';
import projectRoutes from './routes/project';
import taskRoutes from './routes/task';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.send({ message: 'Eumentis Project API Running' });
});

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
