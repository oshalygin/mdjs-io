import express from 'express';
import path from 'path';
import configuration from '../utilities/configuration';
import bodyParser from 'body-parser';
import logger from '../utilities/logger';

import v1router from './routes/routes-v1';

const application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());

const port = configuration.port;

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
  logger.info(`Serving API AT http://localhost:${port}`);
});

export default application;
