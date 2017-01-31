/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import configuration from '../webpack.config.dev';
import open from 'open';
import logger from '../utilities/logger';

import router from './routes/routes-v1';

const application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());

const port = process.env.PORT || 8080; //eslint-disable-line no-process-env

const applicationCompiler = webpack(configuration);
application.use(require('webpack-dev-middleware')(applicationCompiler, {
  noInfo: true,
  publicPath: configuration.output.publicPath
}));

application.use(require('webpack-hot-middleware')(applicationCompiler));

application.use(logger.requestLogger);
application.use('/api/v1', router);
application.use('/client', express.static(path.join(__dirname, '../client')));

application.get('*', (request, response) => {
  const clientEntryPoint = path.join(__dirname, '../client/index.html');
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
