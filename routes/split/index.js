import { Router } from 'express';
import { settleUp, approveSettleUp } from '../../controllers/bill';
import { isAuthenticated } from '../../middlewares/auth';
import { isValidSplitId } from '../../middlewares/bill';

const router = Router();
router.patch('/:splitId/settleUp', isAuthenticated, isValidSplitId, settleUp);
router.patch('/:splitId/approve', isAuthenticated, isValidSplitId, approveSettleUp);

export default router;
