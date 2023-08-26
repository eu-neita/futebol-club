import { Router } from 'express';
import teamsRoutes from './teamRoutes';

const router = Router();

router.use('/teams', teamsRoutes);

export default router;
