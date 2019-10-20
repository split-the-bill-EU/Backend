import { body } from 'express-validator';

export const billValidationRules = () => [
  body('amount')
    .not()
    .isEmpty()
    .withMessage('The bill amount is required')
    .bail()
    .isNumeric()
    .withMessage('The amount must be a number'),
];
