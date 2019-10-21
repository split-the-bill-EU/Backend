import { ErrorHandler } from 'express-error-bouncer';
import formatResponse from '../helpers';
import { sendMail, generateMailTemplate } from '../helpers/mail';
import models from '../database/models';

export async function createBill(req, res, next) {
  try {
    const {
      user: { id: userId },
      body: { amount, title },
    } = req;
    const bill = await models.Bill.create({
      userId,
      amount,
      title,
    });
    if (bill) {
      return formatResponse(res, { bill: bill.get() }, 201);
    }
    throw new ErrorHandler(500, 'An error occurred trying to create bill');
  } catch (error) {
    next(error);
  }
}

/**
 *
 *
 * @param {*} splitters - array of userId of the splitters
 * @param {*} userId - ID of the bill creator
 * @returns splitCount
 */
const getSplitCount = (splitters, userId) => {
  // Ensure that the bill creator is not in the splitters array
  const filteredSplitters = splitters.filter(id => id !== userId);
  return filteredSplitters.length + 1;
};

/**
 *
 *
 * @param { number } amount - Amount to be split
 * @param {number } splitCount - Number of friends to split the bill
 * @returns
 */
const getSplitAmount = (amount, splitCount) => {
  const splitAmount = Number(amount) / splitCount;
  return splitAmount;
};

/**
 *
 *
 * @param {string} billId - ID of the bill to be split
 * @param {number} splitAmount - Amount due per friend
 * @param {array} splitters - IDs of friends splitting the bill
 * @returns {array } splits - array of splits created
 */
const storeSplits = async (billId, splitAmount, splitters) => {
  try {
    const splits = splitters.map(async id => {
      const split = await models.Split.create({
        billId,
        amount: splitAmount,
        userId: id,
      });
      return split.get({ plain: true });
    });
    return Promise.all(splits);
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

const sendEmailToSplitter = async ({
  splitterEmails,
  splitAmount,
  billTitle,
  sender,
}) => {
  splitterEmails.map(async splitter => {
    const template = await generateMailTemplate({
      receiverName: splitter.name || splitter.email,
      intro: `${sender.firstName} has invited you to split the bill for ${billTitle}`,
      name: splitter.name || splitter.email,
      actionText: `You are to pay a sum of $${splitAmount.toFixed(2)}`,
      actionBtnText: `Pay ${splitAmount.toFixed(2)}`,
      actionBtnLink: '#!',
      hasAction: true,
    });
    return sendMail({
      to: splitter.email,
      from: sender.email,
      subject: 'Pay your bill',
      html: template,
    });
  });
};

export async function createSplitBill(req, res, next) {
  try {
    const {
      bill,
      body: { splitters },
      user,
      splitterEmails,
    } = req;
    const splitCount = getSplitCount(splitters, user.id);
    const splitAmount = getSplitAmount(bill.amount, splitCount);
    const splits = await storeSplits(bill.id, splitAmount, [
      ...splitters,
      user.id,
    ]);
    const sentMails = await sendEmailToSplitter({
      splitterEmails,
      splitAmount,
      billTitle: bill.title,
      sender: user,
    });
    return formatResponse(res, { splits }, 201);
  } catch (error) {
    throw new Error(error);
  }
}

export async function settleUp(req, res, next) {
  try {
    const {
      split,
      body: { amount },
      user,
    } = req;
    if (!amount || !Number(amount)) {
      throw new ErrorHandler(400, 'Invalid value supplied for amount');
    }
    if (user.id !== split.userId) {
      throw new ErrorHandler(400, 'You can only pay for your bill');
    }
    const splitAmount = Number(split.amount);
    const amountPaid = Number(split.amountPaid) + Number(amount);
    const newAmount = amount >= Math.floor(splitAmount) ? 0 : splitAmount - amount;
    const status = newAmount === 0 ? 'paid' : 'pending';
    const updatedSplit = await split.update({
      amountPaid,
      status,
      amount: newAmount,
    });
    return formatResponse(res, { message: 'success', split: updatedSplit });
  } catch (error) {
    next(error);
  }
}

export async function approveSettleUp(req, res, next) {
  try {
    const { split, user } = req;
    const bill = await models.Bill.findOne({ where: { id: split.billId } });
    if (bill.userId !== user.id) {
      throw new ErrorHandler(
        400,
        'Only the bill creator can approve settle up',
      );
    }
    const updatedSplit = await split.update({ status: 'confirmed' });
    return formatResponse(res, { split: updatedSplit });
  } catch (error) {
    next(error);
  }
}
