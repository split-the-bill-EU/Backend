import { Router } from 'express';
import authRoutes from './auth';
import billRoutes from './bill';
import userRoutes from './user';
import splitRoutes from './split';

const router = Router();

router.get('/', (req, res) => res.status(200).json('Welcome'));
router.use('/auth', authRoutes);
router.use('/bills', billRoutes);
router.use('/users', userRoutes);
router.use('/splits', splitRoutes);

export default router;
