import express from 'express';
import signRoutes from './signing.routes';

const router = express.Router();

router.use('/sign', signRoutes);

export default router;
