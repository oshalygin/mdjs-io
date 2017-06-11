import express from 'express';
import path from 'path';
import configuration from '../utilities/configuration';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import hsts from 'hsts';
import hstsMiddleware from './middleware/hsts';
import logger from './middleware/logger';

import v0router from './routes/routes-v0';
import v1router from './routes/routes-v1';

const application = express();

application.use(hsts({
  maxAge: 3153600, // 1 year
  includeSubdomains: true
}));

application.enable('trust proxy');
application.use(hstsMiddleware());

application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use(cookieParser());

const port = configuration.port;

application.use(logger.requestLogger);
application.use('/api/v0', v0router);
application.use('/api/v1', v1router);
application.use(express.static(path.join(__dirname, '../dist')));

application.get('*', (request, response) => {
  const clientEntryPoint = path.join(__dirname, '../dist/index.html');
  response.sendFile(clientEntryPoint);
});

application.listen(port, (error) => {
  if (error) {
    logger.error(error);
  }
  logger.info(`Serving application over port ${port}`);
});

export default application;
