import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';

const logger = require('../utils/logger')('logController');

const register = async (req, res) => {
  logger.log('debug', 'register: %j', req.body);
  await UserModel.save({
    username: req.body.username,
    email: req.body.email,
    rehashedPassword: req.body.hashedPassword,
  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  logger.log('info', `Successfully registered: ${req.body.userName}`);
  res.status(200).send({ payload: { message: 'Successfully registered' } });
};

const logIn = async (req, res) => {
  logger.log('debug', 'logIn: %j', req.body);
  const user = await UserModel.getUserByEmail(req.body.email);
  if (user) {
    const isPasswordsEqual = await UserModel.comparePassword({
      userPassword: req.body.hashedPassword,
      rehashedPassword: user.rehashedPassword,
    });
    if (isPasswordsEqual) {
      const token = jwt.sign(
        {
          data: { username: user.username },
        },
        process.env.JWT_SECRET,
        { expiresIn: '6h' },
      );
      logger.log('info', `Successfully loged in: ${user.username}`);
      res.status(200).send({ payload: { message: 'Successfully loged in', token } });
    }
  } else {
    logger.log('debug', 'Login failed');
    throw new AppError('Wrong user credentials!', 400);
  }
};

export { register, logIn };
