import formatResponse from '../helpers';
import models from '../database/models';

export async function getAllUsers(req, res, next) {
  try {
    const users = await models.User.findAll();
    return formatResponse(res, { message: 'success', users });
  } catch (error) {
    next(error);
  }
}


