import jwt from 'jsonwebtoken';
import secret from '../config/secret';

export const generateToken = (payload) => {
  try {
    return jwt.sign(payload, secret, { expiresIn: '24h' });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const decodeToken = async (token) => {
  try {
    return await jwt.verify(token, secret);
  } catch (error) {
    throw new Error(error.message);
  }
};
