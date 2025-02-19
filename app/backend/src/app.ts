import * as express from 'express';
import teamsRoutes from './routes/teamRoutes';
import userRoutes from './routes/userRoutes';
import matcheRoutes from './routes/matcheRoutes';
import leaderboardRoutes from './routes/leaderBoardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    // this.app.use(accessControl teamsRoutes);
  }

  private routes() {
    this.app.use(teamsRoutes);
    this.app.use(userRoutes);
    this.app.use(matcheRoutes);
    this.app.use(leaderboardRoutes);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
