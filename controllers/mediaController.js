import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
import { UPLOAD_FOLDER } from '../consts/webConsts';

const logger = require('../utils/logger')('logController');

const addPosts = async (req, res) => {
  logger.log('debug', 'addPosts: %j', req.body);
  const { user } = req;
  const { path } = await MediaModel.getMediaById(req.body.contentId);
  const post = await PostModel.save({
    title: req.body.caption,
    username: user.username,
    media: {
      path,
      contentId: req.body.contentId,
    },
  });
  res.status(200).send({ payload: post });
};

const attachMedia = async (req, res) => {
  logger.log('debug', 'attachMedia: %j', req.body);
  const { user } = req;
  const {
    file: { filename },
  } = req;

  const media = await MediaModel.save({
    username: user.username,
    path: `/${UPLOAD_FOLDER}/${filename}`,
  });

  res.status(200).send({
    payload: {
      contentId: media.id,
      path: `/${UPLOAD_FOLDER}/${filename}`,
    },
  });
};

const getPosts = async (req, res) => {
  logger.log('debug', 'getPosts: %j', req.body);
  const posts = await PostModel.getRandomPosts();
  res.status(200).send({ payload: posts || [] });
};

const getPostById = async (req, res) => {
  logger.log('debug', 'getPostById: %j', req.body);
  const post = await PostModel.getPostById(req.params.mediaId);
  res.status(200).send({ payload: post });
};

export { getPosts, addPosts, attachMedia, getPostById };
