import { ErrorHandler } from 'express-error-bouncer';
import models from '../../database/models/';

export const isSplitterValidUser = async(req, res, next) => {
  try {
    const { splitters } = req.body;
    const splitterEmails = [];
    for (let i =0; i < splitters.length; i++) {
        let user = await models.User.findOne({ where: { id: splitters[i] }});
        if(!user) {
         throw new ErrorHandler(404, `User with ID: ${splitters[i] } does not exist`)
        }
        splitterEmails.push({ email: user.email, name: user.firstName });
    }

    (req.splitterEmails = splitterEmails, next())
    
  } catch (error) {
    next(error);
  }
};

export const isValidBillId = async (req, res, next) => {
    try {
        const { billId } = req.params;
        const bill = await models.Bill.findOne({ where: { id: billId }});
        if (!bill) {
            throw new ErrorHandler(404, 'The bill with the specified Id does not exist');
        }
        (req.bill = bill, next());
    } catch (error) {
        next(error)
    }
}