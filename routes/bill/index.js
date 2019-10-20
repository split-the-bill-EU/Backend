import { Router } from 'express';
import { billValidationRules } from '../../validators/rules/bill';
import validate from '../../validators';
import { createBill } from '../../controllers/bill';
import { isAuthenticated } from '../../middlewares/auth/';

const router = Router();

router.post('/', isAuthenticated, billValidationRules(), validate, createBill);

export default router;
