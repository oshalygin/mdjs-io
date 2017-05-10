# Merchant Dashboard
[![GitHub issues](https://img.shields.io/github/issues/oshalygin/MerchantDashboard.svg "GitHub issues")](https://github.com/oshalygin/MerchantDashboard)
[![Build Status](https://travis-ci.org/oshalygin/mdjs.svg?branch=master)](https://travis-ci.org/oshalygin/mdjs)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e58319fbcc4244f4956c649397d8911b)](https://www.codacy.com/app/oshalygin/MerchantDashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=oshalygin/MerchantDashboard&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/e58319fbcc4244f4956c649397d8911b)](https://www.codacy.com/app/oshalygin/MerchantDashboard?utm_source=github.com&utm_medium=referral&utm_content=oshalygin/MerchantDashboard&utm_campaign=Badge_Coverage)
[![Dependency Status](https://www.versioneye.com/user/projects/57df8885037c20002d0da5ac/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/57df8885037c20002d0da5ac)


### To run this application follow these steps:
1.  Clone this repository.
2.  Run  `npm install`  to pull in the project dependencies.
3.  Run  `npm start`  to kick off the application.
    * It should automatically load a browser window and point to  `http://localhost:8080`.
    * If the browser window does not load, then manually navigate your browser to  `http://localhost:8080`.
4.  Run `npm test` to explicitly run the tests in the solution.
5.  The build steps are also available and are in development mode. It is recommended that you run `npm start` to experience HMR and other development level features.  For production deployment builds, the command is `npm build`.


![image](/docs/infrastructure-diagram.png?raw=true "Infrastructure")

### Temporary Images Folder
During the migration, there is a short term solution to proxying the images from the client to the Express API and on back to the backend.  This solution involves temporarily saving images to the `/temp-images` folder, streaming from there as the file is pushed to the backend, and subsequently deleting it once the cycle is complete.  The `.gitkeep` file indicates that this file needs to live in source control and be created in the runtime environment.

### Development

#### Running locally
The application can be started locally with the following command:
```bash
$ npm start -s # Run the application, kick off the test watch command along with the lint watcher.
```

#### Running tests
Tests can be executed with the following test command:
```bash
$ npm test # Run tests
$ npm run test:coverage # Run tests with coverage
```

#### Running tests with `--watch`
In order to properly run the the tests in watch mode you may need to install `watchman` via homebrew on OSX.
```bash
$ brew install watchman # Install watchman via homebrew
$ npm run test:watch # Run the tests and watch the source code for changes, re-running tests accordingly
```

### Contributing

The main purpose of this repository is to continue to evolve Merchant Dashboard, making it a robust dashboard experience.

### License

Merchant Dashboard is [AGPLv3 licensed](./LICENSE.md).
