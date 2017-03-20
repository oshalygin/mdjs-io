import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import configuration from '../utilities/configuration';
import webpackConfiguration from '../webpack.config.dev';
import open from 'open';
import logger from '../utilities/logger';

import v1router from './routes/routes-v1';

const application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use(cookieParser());

const port = configuration.port;

const applicationCompiler = webpack(webpackConfiguration);
application.use(require('webpack-dev-middleware')(applicationCompiler, {
  noInfo: true,
  publicPath: webpackConfiguration.output.publicPath
}));

application.use(require('webpack-hot-middleware')(applicationCompiler));

application.use(logger.requestLogger);
application.use('/api/v1', v1router);
application.use('/client', express.static(path.join(__dirname, '../client')));

application.get('*', (request, response) => {
  const clientEntryPoint = path.join(__dirname, '../client/index.html');
  response.sendFile(clientEntryPoint);
});


application.listen(port, (error) => {
  if (error) {
    logger.error(error);
  }
  logger.info(`Serving Application at http://localhost:${port}`);
  open(`http://localhost:${port}`);
});

export default application;
