import { Router } from 'express';
import { settleUp } from '../../controllers/bill';
import { isAuthenticated } from '../../middlewares/auth';
import { isValidSplitId } from '../../middlewares/bill';

const router = Router();
router.patch('/:splitId/settleUp', isAuthenticated, isValidSplitId, settleUp);

export default router;
