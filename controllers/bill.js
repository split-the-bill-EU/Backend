import { ErrorHandler } from 'express-error-bouncer';
import formatResponse from '../helpers';
import models from '../database/models/';

export async function createBill(req, res, next) {
  try {
    const {
      user: { id: userId },
      body: { amount }
    } = req;
    const bill = await models.Bill.create({
      userId,
      amount
    });
    if(bill) {
      return formatResponse(res, {bill: bill.get()}, 201);
    }
    throw new ErrorHandler(500, 'An error occurred trying to create bill')
  } catch (error) {
    next(error)
  }
}

