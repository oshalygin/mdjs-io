/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import open from 'open';
import logger from '../utilities/logger';

import v1router from './routes/routes-v1';

const application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());

const port = process.env.PORT || 8080; //eslint-disable-line no-process-env

application.use('/api/v1', v1router);
application.use(express.static(path.join(__dirname, '../dist')));

application.get('*', (request, response) => {
  const clientEntryPoint = path.join(__dirname, '../dist/index.html');
  response.sendFile(clientEntryPoint);
});

application.listen(port, (error) => {
  if (!!error) {
    logger.error(error);
  }
  open(`http://localhost:${port}`);
  logger.info(`Serving API AT http://localhost:${port}`);
});

export default application;
