import express from 'express';
import session from 'express-session';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import './utils/dotenv';
import authRouter from './routes/auth';
import user from './routes/user';
import media from './routes/media';
import index from './routes/index';
import authenticate from './middlewares/authenticate';
import defaultErrorHandler from './middlewares/defaultErrorHandler';

const logger = require('./utils/logger')('server');

const app = express();

// TODO move Mongo connect to separate file
const MongoStore = mongo(session);
mongoose.Promise = global.Promise; // Use native promises - http://mongoosejs.com/docs/promises.html
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', () => {
  logger.log('error', 'MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
mongoose.connection.once('open', () => logger.log('info', 'MongoDB has been connected.'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
    }),
  }),
);

app.use(`/api/v${process.env.API_VERSION}/auth`, authRouter);
app.use(`/api/v${process.env.API_VERSION}/users`, authenticate, user);
app.use(`/api/v${process.env.API_VERSION}/media`, authenticate, media);
app.use(`/api/v${process.env.API_VERSION}`, index);

app.use('/uploads', express.static('uploads'));
app.use(defaultErrorHandler);

const host = process.env[`HOST_${process.platform.toUpperCase()}`];
const port = process.env.PORT || process.env.HOST_PORT;

app.listen(port, host, () => {
  logger.log('info', `App is running at http://${host}:${port} in ${app.get('env')} mode.`);
});
