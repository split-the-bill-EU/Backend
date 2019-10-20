
import { ErrorHandler } from 'express-error-bouncer';

import { decodeToken } from '../../helpers/auth';

import models from '../../database/models/';

export const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers || null;
    if (!token) {
      throw new ErrorHandler(403, 'You must login to perform the operation');
    } else {
      const { __uuid  = null } = (await decodeToken(token));
      const user = __uuid && (await models.User.findOne({ where: { id: __uuid } }));
      if (user) {
        (req.user = user, next());
      } else {
        throw new ErrorHandler(403, 'You must login to perform the operation');
      }
    }
  } catch (error) {
    next(error);
  }
};