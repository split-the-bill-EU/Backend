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

export async function getUserProfile(req, res, next) {
  try {
    const {
      user: { id },
    } = req;
    const user = await models.User.findOne({
      where: { id },
      include: [
        {
          model: models.Bill,
          as: 'bills',
          include: [
            {
              model: models.Split,
              as: 'splits',
            },
          ],
        },
        {
          model: models.Split,
          as: 'splits',
          include: [
            {
              model: models.Bill,
              as: 'bill',
            },
          ],
        },
      ],
    });
    return formatResponse(res, { user });
  } catch (error) {
    next(error);
  }
}
