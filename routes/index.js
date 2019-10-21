import { Router } from 'express';
import authRoutes from './auth';
import billRoutes from './bill/'
const router = Router();

router.get('/', (req, res) => res.status(200).json('Welcome'));
router.use('/auth', authRoutes);
router.use('/bills', billRoutes);

export default router;
