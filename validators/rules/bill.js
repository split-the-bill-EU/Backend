import { body } from 'express-validator';

export const billValidationRules = () => [
  body('amount')
    .not()
    .isEmpty()
    .withMessage('The bill amount is required')
    .bail()
    .isNumeric()
    .withMessage('The amount must be a number')
    .bail(),

    body('title')
    .not()
    .isEmpty()
    .withMessage('The bill titleis required')
];

export const splitValidationRules = () => [
  body('splitters')
    .not()
    .isEmpty()
    .withMessage('The bill splitters is required')
    .bail()
    .isArray({ min: 1})
    .withMessage('The splitters array cannot be empty'),
    
];
