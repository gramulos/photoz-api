import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import index from '../controllers/indexController';

const router = express.Router();

router.get('/*', asyncMiddleware(index));

export default router;
