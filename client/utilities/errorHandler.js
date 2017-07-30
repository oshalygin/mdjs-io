import { hostLocation } from './endpoints';

const environment = process.env.NODE_ENV; // eslint-disable-line no-process-env

let errorHandler;
if (environment === 'production') {
  errorHandler = new StackdriverErrorReporter(); //eslint-disable-line no-undef
  errorHandler.start({
    key: 'AIzaSyBsQeaYpBv6U-axYGImjX6yUTaZ7LACDxQ',
    projectId: 'merchant-dash',
    service: hostLocation,
  });
}

export default errorHandler;
