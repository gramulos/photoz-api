import * as CommentModel from '../models/CommentModel';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('logController');

const getPostComments = async (req, res) => {
  logger.log('debug', 'getPostComments: %j', req.body);
  const comments = await CommentModel.getCommentsByPost(req.params.mediaId);
  res.status(200).send({ payload: { comments } });
};

const addPostComments = async (req, res) => {
  logger.log('debug', 'addPostComments: %j', req.body);
  const { user } = req;
  await CommentModel.save({
    message: req.body.text,
    username: user.username,
    mediaId: req.params.mediaId,
  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  res.status(201).send();
};

export { getPostComments, addPostComments };
