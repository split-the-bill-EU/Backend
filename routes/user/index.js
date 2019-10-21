import { Router } from 'express';
import { getAllUsers, getUserProfile } from '../../controllers/user';
import { isAuthenticated } from '../../middlewares/auth';

const router = Router();

router.get('/', isAuthenticated, getAllUsers);
router.get('/profile', isAuthenticated, getUserProfile);

export default router;
