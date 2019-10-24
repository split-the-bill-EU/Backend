import { Router } from 'express';
import {
  billValidationRules,
  splitValidationRules,
} from '../../validators/rules/bill';
import validate from '../../validators';
import { createBill, createSplitBill, deleteBill } from '../../controllers/bill';
import { isAuthenticated } from '../../middlewares/auth';
import { isValidBillId, isSplitterValidUser } from '../../middlewares/bill';

const router = Router();

router.post('/', isAuthenticated, billValidationRules(), validate, createBill);
router.post(
  '/:billId/split',
  isAuthenticated,
  isValidBillId,
  splitValidationRules(),
  validate,
  isSplitterValidUser,
  createSplitBill,
);
router.delete('/:billId/delete', isAuthenticated, isValidBillId, deleteBill);

export default router;
