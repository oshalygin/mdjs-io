# CHANGELOG

## 3.35.0 (September 19, 2017)

- Updated the Image API to no longer be behind the auth middleware.
  - All of the images are wide open to all users.  That said, they would have to have the UUID to actually access the endpoint.  This could be abused by the fact that the collection API is wide open, but this will be picked up later and resolved.

## 3.34.1 (September 10, 2017)

- Fixed broken tests related to the last release

## 3.34.0 (September 10, 2017)

- Complete overhaul to authentication and authorization within the dashboard application
  - Cookie storage used instead of Local Storage to store the Auth Token
  - Logout will now remove all cookies related to the website
  - Registration will receive a new auth token as part of the header request which would be used to subsequently log in.

## 3.33.2 (September 9, 2017)

- Addition of the `universal-cookie` package to the project.
  - This utility will be used in subsequent releases to read cookies

## 3.33.1 (September 4, 2017)

- Removal of _"Forgot Password"_ from the Login page.
  - This feature isn't wired up yet and should not be displayed to the user.

## 3.33.0 (September 3, 2017)

- Add Notification removal saga watcher.
  - Removes the notification message after a 1 second delay.

## 3.32.1 (September 3, 2017)

- Addition tests to support the latest changes to the RegistrationController

## 3.32.0 (September 3, 2017)

- Addition of data persistence upon user registration

## 3.31.1 (September 2, 2017)

- Resolved broken tests related to the `error` object state within Login

## 3.31.0 (September 2, 2017)

- Addition of login validation checks on the email and password.

## 3.30.0 (September 2, 2017)

- Server side validation for the phone number when registering.

## 3.29.7 (September 2, 2017)

- Addition of a phone number validation check on the registration page.

## 3.29.6 (September 2, 2017)

- Updated `<Registration />` and `<Login />` test suites to support the latest navigation changes.

## 3.29.5 (September 2, 2017)

- Remove loading state when successfully registering and logging in.

## 3.29.4 (September 2, 2017)

- Addition of a phone number validator utility
  - Basic US phone numbers can now be validated

## 3.29.3 (September 2, 2017)

- Persist error message to client registration page
  - The notification message will appear below the Register heading

## 3.29.2 (September 2, 2017)

- Addition of Notification Snackbars
  - Initial rollout involves persistence through Registration API responses.

## 3.29.1 (September 2, 2017)

- Updated error logging in the registration controller
  - Capturing the response object from the server and persisting it back down to the API caller.

## 3.29.0 (September 2, 2017)

- Navigation between the Registration page and the Login page is now possible through button controls.

## 3.28.2 (September 1, 2017)

- Addition of `stylelint`.
  - Provides an automated way to check whether or not the codebase complies with the styling guidelines outlined in `.stylelintrc`
  - Cleaned up files that violated the configuration
  - Addition of lint step into the CI pipeline through Travis.

## 3.28.1 (September 1, 2017)

- Remove all references to `PropTypes` from the `react` package and instead pull appropriately from `prop-types`.
- Updates to `react-redux@5.0.6`

## 3.28.0 (August 31, 2017)

- Add navigation from homepage to the dashboard or the registration page
  - This serves as a placeholder for future implementations of the main content page

## 3.27.2 (August 30, 2017)

- Deprecate the /temp-images folder

## 3.27.1 (August 30, 2017)

- Deprecated consumption of `chai` in favor of Jest assertion library

## 3.27.0 (August 28, 2017)

- Addition of a `/registration` route which allows users to register with the application
  - Error handling is forthcoming

## 3.26.1 (August 27, 2017)

- Addition of an email validation utility

## 3.26.0 (August 27, 2017)

- Addition of a registration route:
  - POST `api/v1/registration`
  - This API exposes a registration endpoint that tunnels back to the current backend

## 3.25.1 (August 27, 2017)

- Add base styles to the root of the project

## 3.25.0 (August 27, 2017)

- Add stylelint configuration
  -  Styles mostly based on the `stylelint-config-standard`

## 3.24.0 (August 24, 2017)

- Add MongoDB Persistence
  - Initial foray into persistence of the application
  - Only account details are stored.
  - Default DB connection pointing to Azure, this will be reconfigured in the future.

## 3.23.3 (August 20, 2017)

- Addition of Swagger specification that describes the public API.
  - This is the initial round which includes a /categories collection(NOT IMPLEMENTED).

## 3.23.2 (August 20, 2017)

- Fix user saga call to clear the token

## 3.23.1 (August 20, 2017)

- Fix login spinner issues.
   - New loadingUserLogin state which is only tied to the login page.

## 3.23.0 (August 20, 2017)

- Fix remaining failing tests which were related to RR3 and various paths.

## 3.22.21 (August 20, 2017)

- Fix additional various tests that were using RR3 `browserHistory`.
- Various refactoring to leverage the `history` component.

## 3.22.20 (August 19, 2017)

- Fix various tests that were using RR3 `browserHistory`.
- Various refactoring to leverage the `history` component.

## 3.22.19 (August 18, 2017)

- Fix various tests to check for `match.params.id` instead of the `params.id` which was for RR3.

## 3.22.18 (August 18, 2017)

- Removed erroneous console.log statements

## 3.22.17 (August 18, 2017)

- Update routing for `categories`.
  - Introduction of the `/new` route to handle creation
  - Introduction of the `/categories/:id` to handle editing
  - Refactored browserHistory to use the internal history outer.

## 3.22.16 (August 17, 2017)

- Update routing for `discounts`.
  - Introduction of the `/new` route to handle creation
  - Introduction of the `/discounts/:id` to handle editing
  - Refactored browserHistory to use the internal history outer.

## 3.22.15 (August 17, 2017)

- Updated sidenav to remove the `Go` prefix from Items and Categories

## 3.22.14 (August 17, 2017)

- Update routing for `modifiers`.
  - Introduction of the `/new` route to handle creation
  - Introduction of the `/modifiers/:id` to handle editing
  - Refactored browserHistory to use the internal history outer.

## 3.22.13 (August 17, 2017)

- Update routing for `taxes`.
  - Introduction of the `/new` route to handle creation
  - Introduction of the `/taxes/:id` to handle editing
  - Refactored browserHistory to use the internal history outer.

## 3.22.12 (August 17, 2017)

- Updated routing folder structure for items to nest `items` and `itemDetail`.
  - Refactored `browserHistory` to push via the history component.

## 3.22.11 (August 16, 2017)

- Update routing to handle `/dashboard/items/:id` and `/dashboard/items/new`.  Both of these routes are now handled through RR4 configuration at the item router level.

## 3.22.10 (August 15, 2017)

- Remove Chrome's autocomplete styles altogether from the page.

## 3.22.9 (August 14, 2017)

- Addition of a root `/` route which will be used to serve up the frontend site.
- Routing updates for user login to be handled through sagas
- Significant refactoring across the board in the initial routes.

## 3.22.8 (August 13, 2017)

- Refactored `<AuthorizedRoute />` to properly read the component passed in.
- Addition of user sagas to handle logged in user.
- Refactored reducers and initialState related to the logged in user.

## 3.22.7 (August 13, 2017)

- Addition of an <AuthorizedRoute /> handler which will be set on certain routes to restrict access unless the user is logged.
- This component will be built out in the future to provide its own data retrieval if the user object is null.

## 3.22.6 (August 13, 2017)

- This is a first in a series of WIP commits to migrate the codebase over to React Router 4.
- Numerous pieces are still broken such as authentication/authorization as well as proper routing.

## 3.22.5 (August 12, 2017)

- Remove erroneous logs

## 3.22.4 (August 12, 2017)

- Temporary test with multer

## 3.22.3 (August 12, 2017)

- Add conditional check for when the multipart form data does not contain a body object.

## 3.22.2 (August 12, 2017)

- Add logging statements to the image controller and switch the bad request text content to be more explicit.

## 3.22.1 (August 12, 2017)

- Update failing modifier tests after last migration

## 3.22.0 (August 12, 2017)

- Update logging to properly capture multi-part form data requests

## 3.21.7 (August 10, 2017)

- Add default `/` route to the ignored routes for tracing/logging.

## 3.21.6 (August 9, 2017)

- Fix erroneous log messages.  Using `console` ipo `logger`

## 3.21.5 (August 9, 2017)

- Update logger path in `application.dev` and `application.production`

## 3.21.4 (August 9, 2017)

- Addition of robust logging through Stackdriver.
  - Updated controllers to leverage the new logger.

## 3.21.3 (August 9, 2017)

- Addition of robust logging through Stackdriver.
  - Updated controllers to leverage the new logger.

## 3.21.2 (August 9, 2017)

- Bump `k8s-config` version to `1.2.0` which sets the stage to use `fieldRef` environment variables in the pod configuration.

## 3.21.1 (August 9, 2017)

- Temporarily hardcode _Western Register_ into the login page to give indication that the site being accessed is western register.  This will be pulled from configuration in the future.

## 3.21.0 (August 9, 2017)

- Addition of the `configuration` API endpoint which exposes the company name from environment variables.
- Addition of sagas on the client to consume the configuration endpoint.
- Addition of configuration reducer to the store.

## 3.20.1 (August 9, 2017)

- Package updates:
  - gcloud debug and storage packages.

## 3.20.0 (August 8, 2017)

- Add image upload route which allows users to upload images directly.

## 3.19.1 (August 7, 2017)

- Refactored multer configuration and image upload for items.

## 3.19.0 (August 6, 2017)

- Addition of V0 Items APIs
  - Proxy passthrough to the current API backend

## 3.18.1 (August 6, 2017)

- Add V0 Items routes

## 3.18.0 (August 6, 2017)

- Fix V0 Inventory, `inventoryForItems` endpoint to call the proper controller.

## 3.17.0 (August 6, 2017)

- Fix orders route to `order`

## 3.16.0 (August 6, 2017)

- Updated various dev dependencies
- Added a console.log bypass in jest
- Security v0 routes and the Registration route no longer require an Auth token

## 3.15.4 (August 6, 2017)

- Addition of a local yarn file for local development.  
  - Both yarn.lock as well as `npm-shrinkwrap.json` will be updated moving forward until there's a clear fix in place.

## 3.15.3 (August 6, 2017)

- Bumping Node version to `8.2.1` in both Travis and in the Dockerbuild.

## 3.15.2 (August 6, 2017)

- Replaced `package-lock.json` in favor of `npm-shrinkwrap.json`.  This is primarily done to ensure that offline mode for CodeClimates security check is ran.

## 3.15.1 (August 6, 2017)

- Addition of CodeClimate configuration
  - The configuration file serves as a declarative means of what will be run in codeclimate.
  - `nsp` as the central point in the analysis.

## 3.15.0 (August 5, 2017)

- Addition of V0 User APIs
  - Proxy passthrough to the current API backend

## 3.14.0 (August 5, 2017)

- Addition of V0 Tax APIs
  - Proxy passthrough to the current API backend

## 3.13.0 (August 5, 2017)

- Addition of V0 Security APIs
  - Proxy passthrough to the current API backend

## 3.12.0 (August 3, 2017)

- Addition of V0 Report APIs
  - Proxy passthrough to the current API backend

## 3.11.0 (August 3, 2017)

- Addition of V0 Registration APIs
  - Proxy passthrough to the current API backend

## 3.10.0 (August 3, 2017)

- Addition of V0 Refund Reason Email APIs
  - Proxy passthrough to the current API backend

## 3.9.0 (August 3, 2017)

- Addition of V0 Receipt APIs
  - Proxy passthrough to the current API backend

## 3.8.1 (August 3, 2017)

- Removal of `open` in local development and from the project.

## 3.8.0 (August 3, 2017)

- Addition of V0 Postmark Email APIs
  - Proxy passthrough to the current API backend

## 3.7.0 (August 2, 2017)

- Addition of V0 Orders APIs
  - Proxy passthrough to the current API backend

## 3.6.0 (August 2, 2017)

- Addition of V0 Modifier APIs
  - Proxy passthrough to the current API backend

## 3.5.0 (August 2, 2017)

- Addition of V0 Message APIs
  - Proxy passthrough to the current API backend

## 3.4.0 (August 2, 2017)

- Addition of V0 Inventory APIs
  - Proxy passthrough to the current API backend

## 3.3.0 (August 2, 2017)

- Addition of V0 Discount APIs
  - Proxy passthrough to the current API backend

## 3.2.0 (August 2, 2017)

- Addition of V0 Customer APIs
  - Proxy passthrough to the current API backend

## 3.1.2 (August 1, 2017)

- Addition of V0 Category API Tests

## 3.1.1 (August 1, 2017)

- Addition of API utility for server side code.

## 3.1.0 (August 1, 2017)

- Fix all v0 routes for Categories to call the proper endpoint.
- Addition of update and delete actions to the V0 Categories
- Addition of routes for all V0 endpoints that do not require multi-part form upload.

## 3.0.3 (July 31, 2017)

- Fixed the api wrapper in the client to pull the auth token from local storage on every request.  When this value was reset, it was cached internally.  Another means of handling this is to store it in the store, but that will come down the line.

## 3.0.2 (July 30, 2017)

- Updates to the `k8s-config` version, which will support the configuration used within this project.

## 3.0.1 (July 26, 2017)

- Updates to the binary path which should be `linux_amd64_k8s-config`

## 3.0.0 (July 26, 2017)

- Mass linting update to leverage `prettier`.

## 2.54.0 (July 26, 2017)

- Addition of kubernetes update script which updates the underlying tag based on the version defined in package.json

## 2.53.0 (July 15, 2017)

- Update Tracing configuration to be explicitly through the the configuration file, `trace.js`.  The way that this is handled is through the environment variable `GCLOUD_DIAGNOSTICS_CONFIG`.

## 2.52.0 (July 15, 2017)

- Addition of cloud debugger

## 2.51.0 (July 15, 2017)

- Add production saga configuration
- Bump kube-lego version to `0.1.5`

## 2.50.0 (July 15, 2017)

- Update Kubernetes cluster version to 1.7 and add debug scopes

## 2.49.2 (July 13, 2017)

- Add tests to api utilities
  - These utilities are used throughout the application and it is important that they are properly tested.

## 2.49.1 (July 12, 2017)

- Begin refactoring process to `redux-saga` from `redux-thunk`
  - Initial step involves migration of categoryActions into categorySagas.
    - Deprecation of redux-thunk routing
    - Removal of associated tests, categoryActions at this point are straight forward action creators.
  - Tests are coming in an upcoming release

## 2.49.0 (July 4, 2017)

- Update the start command to no longer run tests and linting.
  - This was drastically slowing down the development process with errors and issues.  These tasks should be handled prior to code commits and not during runtime.

## 2.48.0 (July 4, 2017)

- Update image storage buckets for local and deployed environments

## 2.47.4 (July 1, 2017)

- Add Application default credentials environment variable to Travis configuration

## 2.47.3 (July 1, 2017)

- Update `gcloud` command to no longer reference the full path
  - Catching remnants.
- Updates to the kube-lego service version

## 2.47.2 (July 1, 2017)

- Update `kubectl` commands to no longer reference the full path

## 2.47.1 (July 1, 2017)

- Update GCP and `kubectl` installation steps
  - Google Cloud SDK and kubectl are now installed via a Debian package instead of directly through a bash script.

## 2.47.0 (July 1, 2017)

- Update GCP project across the board to `mdjs-io`
  - The only item not updated at this time is the ErrorReporter.  This will be done progressively.

## 2.46.0 (July 1, 2017)

- Update service accounts:
  - Cluster service account
  - Storage service account

## 2.45.5 (July 1, 2017)

- Update Cluster version to `1.6.4`
  - This migration also migrates to another GCP account.

## 2.45.4 (June 18, 2017)

- Update Jest configuration with 4 workers as the upper bound to expedite builds in CI.

## 2.45.3 (June 18, 2017)

- Add CodeClimate badges and remove GitHub issues badge.

## 2.45.2 (June 18, 2017)

- Update broken test which was testing an endpoint that no longer exists.

## 2.45.1 (June 17, 2017)

- Resolve routes that point to non-compiled source code.

## 2.45.0 (June 17, 2017)

- Server code is now pre-compiled prior to deployment.
  - `babel-node` should not be used in production and as such it was removed.
  - Breakout from `dist` into a client and server version: `dist-client` && `dist-server`.
- The trace agent is now initialized part of the run command instead of being included explicitly.

## 2.44.15 (June 17, 2017)

- ESLint run command updated. 
  - `.eslintignore` added to the project to exclude certain files from linting rules.

## 2.44.14 (June 11, 2017)

- Replaced yarn with npm@5.0.0

## 2.44.13 (June 11, 2017)

- Remove dockerhub push
- Remove progress from Webpack build

## 2.44.11 (June 11, 2017)

- Explicitly install yarn in Travis-CI

## 2.44.10 (June 11, 2017)

- Updated Travis build to use the C++ binaries and use yarn explicitly

## 2.44.9 (June 11, 2017)

- Add missing peer dependencies.

## 2.44.8 (June 11, 2017)

- Add code coverage via codeclimate

## 2.44.6 (June 11, 2017)

- Configuring sharp dependency

## 2.44.5 (June 11, 2017)

- Added sharp installation explicitly to the Dockerfile
  - This is necessary as an interim step due to the way that yarn installs dependencies with binaries.

## 2.44.4 (June 11, 2017)

- Added `IMAGE_STORAGE_BUCKET` environment variable which houses deployed production image bucket.
  - Note in local development the bucket name is prefixed with `temp`

## 2.44.3 (June 11, 2017)

- Removed Codacy

## 2.44.2 (June 11, 2017)

- Add Slack Integration
- Update TravisCI badge on main README

## 2.44.1 (June 11, 2017)

- Update service account keys.

## 2.44.0 (June 11, 2017)

- Add initial stub with v0 routes.

## 2.43.0 (June 11, 2017)

- Added Google Cloud Storage Image Pipeline
  - All images are now going to be stored in Google Cloud Storage, this means that the backend service will only get a reference to the new photoURL path.
  - All images are downsized to PNG's with a size of 200x200.
- Labels are automatically applied to items that do not have a label, specifically with a capital letter followed by a lowercase letter.
- `request-promise` has been removed from the project, it is no longer necessary.
- Significant refactoring of the itemController and the associated Web Client actions.

## 2.42.6 (June 4, 2017)

- Added documentation around how google cloud storage is going to be leveraged to store images in the cloud.
- Added the necessary google cloud node package, which is the SDK necessary to communicate with the storage bucket.  We could call the API directly via HTTP, but this is preferred.

## 2.42.5 (June 3, 2017)

- Fixed improper module reference of `package.json`.

## 2.42.4 (June 3, 2017)

- Migrate controllers under `/v1` folder to make room for `/v0` which will leverage the old API.

## 2.42.3 (May 27, 2017)

- Remove unnecessary jsdom reference when running tests
  - Ultimately this was causing a memory leak.  Until jsdom is fixed and/or used, this issue will persist in CI.

## 2.42.2 (May 27, 2017)

- Upgraded from Node 7.10.0 to 8.0.0
  - TravisCI node runtime updated to `8.0.0`.
  - Docker base image updated to `8.0.0`.

## 2.42.1 (May 27, 2017)

- Move server `/middleware` up a folder tree to minimize unnecessary nesting.

## 2.42.0 (May 27, 2017)

- Upgraded from Node 7.2.1 to 7.10.0
  - TravisCI node runtime updated to `7.10`.
  - Docker base image updated to `7.10`.

## 2.41.0 (May 27, 2017)

- Removal of build scripts in favor of Webpack's build CLI directly.
- Removal of unnecessary packages
  - **cherio** - This package was strictly used to inject and parse the root `index.html` file.
  - **chalkConfiguration** - This package used chalk/colors to display messages with colors.
  - **colors** - This package was used to display logs in a colored format.  This is unnecessary as winston is used instead.

## 2.40.5 (May 27, 2017)

- Package dependency upgrades:
  - **font-awesome** - Additional icons added.  In the future this library will be deprecated, but in the interest of staying current with the development here, it was updated.
  - **form-data** - No changelog but looking at the source code, there are a few fixes around XHR-2 requests.
  - **redux-mock-store** - Bug fixes.
  - **caniuse-db** - Confusing version name, but mostly bug fixes.

## 2.40.4 (May 24, 2017)

- Package dependency upgrades:
  - **getmdl-select** - This package is no longer used, using Material-UI for SelectList.
  - **material-design-lite** - This package is no longer used, using Material-UI holistically.
  - **body-parser** - Updated to the latest package.  This is critical as it resolves the `Prototype Override Protection Bypass`, and `Regular Expression Denial of Service` security vulnerabilities.

## 2.40.3 (May 21, 2017)

- Update `redux-logger`
  - The initial state of the logger is collapsed.  This is to clean up the logs upon load and as actions are dispatched.
  - Latest version: `3.0.6`

## 2.40.2 (May 21, 2017)

- Replacement of `moment` with `date-fns` across the board
  - moment.js is a great library, however, all of the footgun immutable side-effects need to be abolished from this project and thus, moment had to go.

## 2.40.1 (May 21, 2017)

- Removal of the `/.vscode` folder
  - This folder did not contain any useful files, and had the potential to override useful configuration from other users.
  
## 2.40.0 (May 21, 2017)

- Migration to Webpack V2
  - The changes involved to migrate from V1 to V2 involve following the migration guide closely: https://webpack.js.org/guides/migrating/
  - The CSSModules + PostCSS configuration noted in webpack is the recommended approach after reading this thread: https://github.com/postcss/postcss-loader/issues/92

## 2.39.1 (May 19, 2017)

- Removal of unnecessary `.istanbul.yml` file configuration.

## 2.39.0 (May 19, 2017)

- Migrate to `babel-react-css-modules`
  - Notably migration from react-css-modules to babel-react-css-modules as a babel plugin instead of as a strict package dependency.
  - This allows a few nice wins in terms of code reuse and staying DRY:
    - No need to camelcase the class name.
    - No need to wrap in CSSModules
    - No need to explicitly import a styles object.
  - Addition of configuration within webpack which will properly bundle the global style dependencies.
  - Removal of unused stylesheets from the entrypoint. 

## 2.38.0 (May 16, 2017)

- Package dependency upgrades.
- Removal of all wildcard flags in `package.json`.

## 2.37.0 (May 16, 2017)

- Package dependency upgrades:
  - **@google-cloud/trace-agent@2.0.0** - Mainly dropping support for node < 4.0.  Otherwise performance improvements
  - **material-ui@0.18.1** - New features and bug fixes.
  - Removal of lodash, not used in the project
  - **moxios** - latest release with bug fixes and performance improvements.
  - **axios** - stability improvements.
  - **postcss-cssnext** - New peer dependency, caniuse-db.

## 2.36.0 (May 16, 2017)

- Upgrade React to `15.5.4`.
  - This change mostly involves an extraction of `PropTypes` into its own npm dependency, `prop-types`.
  - Migration and documentation on the latest React release:
  https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html

## 2.35.0 (May 16, 2017)

- Updates to Webpack configuration files(`webpack.config.dev.js` and `webpack.config.production.js`) to reflect the following changes:
  - Hash all files using MD5
  - Generate a HTML along with the bundle dynamically.
  - Set the `__DEV__` flag to true in the dev build
- Updates to the local development express layer to properly persist bundle changes across all routes.
- Addition of `webpack-public-path.js` to properly set the public path when generating the bundle.
- Drastic reduction in the minified javascript bundle size
  - Removal of sourcemaps

## 2.34.0 (May 16, 2017)

- Removal of erroneous error and validation that error reporting to stackdriver is functional.

## 2.33.5 (May 16, 2017)

- Update Kubernetes deployment configuration with a ReplicaSet revision history of `2`.

## 2.33.4 (May 16, 2017)

- Add documentation around authenticating with GCP and bringing in the `kubectl` component.

## 2.33.3 (May 16, 2017)

- Add documentation on how to get started with GCP.

## 2.33.2 (May 16, 2017)

- Move manual exception to the entrypoint of the application to allow all tests to continue to pass.

## 2.33.1 (May 15, 2017)

- Instrument client-side logging through the Stackdriver API, leveraging the `stackdriver-error-js` project.
  - The root index file now pre-loads the stackdriver error logging package.
  - The stackdriver error reporter is initialized in the entrypoint, `index.js`.  This only occurs in the production build.
  - For testing purposes, the orderAction receives an erroneous error that will be picked up if everything deploys and functions accordingly.  This will be removed in a subsequent release.
- The development webpack bundle is updated to reflect the `NODE_ENV`.  Although this is not necessary at this time, it should be consistent with the production configuration.

## 2.33.0 (May 15, 2017)

- Providing functionality to dashboard widgets
  - Sales Widget now handles real data from the order summary sales.
  - Orders Widget now handles real data from the order summary count.
  - Transactions now handles real data from todays orders and displays the values accordingly.
  - Reducers, actions and the associated components updated to cascade the changes throughout the application.

## 2.32.4 (May 14, 2017)

- Update order utility to leverage `date-fns` to determine yesterdays and today dates.

## 2.32.3 (May 14, 2017)

- Updates to the calculation utility to handle 0 value edge cases.

## 2.32.2 (May 14, 2017)

- Mapping utility from the TransactionTypeId to a user readable description.

## 2.32.1 (May 14, 2017)

- Addition of order utilities to extract yesterdays and todays orders.

## 2.32.0 (May 14, 2017)

- Add Order Average Display and Functionality
  - Reducer, Actions and Utilities implemented to calculate and parse the order average amount.

## 2.31.2 (May 13, 2017)

- Update Dashboard Summary chart to display the past 12 months instead of 8.
- Dashboard Summary chart styling updates(Y-Axis pushed down to the bottom).

## 2.31.1 (May 13, 2017)

- Update dashboard widget styling.

## 2.31.0 (May 13, 2017)

- Add Order Count progress bar functionality.
  - The total amount of the progress bar(100%) is based on the average order count over the past 8 months.  In the future this value will be configurable.

## 2.30.1 (May 13, 2017)

- Add Order Sales Volume progress bar functionality.
  - The total amount of the progress bar(100%) is based on the average sales volume over the past 8 months.  In the future this value will be configurable.

## 2.29.20 (May 13, 2017)

- Updates to the Sales and Order widgets on the dashboard to have the percentage change value be more visible.

## 2.29.19 (May 11, 2017)

- Add Progress bars and general stub information on the dashboard monthly summary.

## 2.29.18 (May 11, 2017)

- Add common `<ProgressBar />` control.

## 2.29.17 (May 11, 2017)

- Remove left padding from monthly summary X-Axis.

## 2.29.16 (May 11, 2017)

- Addition of a stub inventory widget on the dashboard
  - The inventory widget does not contain any content at the moment, but in the future will be expanded to maintain a cash value of the current inventory at hand.

## 2.29.15 (May 11, 2017)

- Addition of a Transactions Widget on the main dashboard which displays the total number of cash and credit card transactions from the current day along with the percentage breakdown.

## 2.29.14 (May 11, 2017)

- Addition of green and teal to the color pallet, `colors.css` and `colors.js`.

## 2.29.13 (May 11, 2017)

- Updated sales widget on the dashboard with a green icon and arrow to indicate a positive increase in orders.

## 2.29.12 (May 11, 2017)

- Updated orders widget on the dashboard with a green icon and arrow to indicate a positive increase in orders.

## 2.29.11 (May 11, 2017)

- Update index page to fit within the screen vertically

## 2.29.10 (May 10, 2017)

- Add development lint and test watchers.
  - Running `npm start` will now run `test:watch`, `lint:watch` and `open:server` accordingly.

## 2.29.9 (May 09, 2017)

- Add npm test watch command, `test:watch`.

## 2.29.8 (May 09, 2017)

- Add initial Daily Orders Widget
  - Mock data in the widget at the moment, however, all functionality around percentages and display values has been implemented.

## 2.29.7 (May 09, 2017)

- Update Sales Widget styling once more to be 100% container width when the window is resized.
  - This gives a more uniform UX to the application.

## 2.29.6 (May 09, 2017)

- Update Sales Widget styling to accommodate varying page widths.

## 2.29.5 (May 08, 2017)

- Add initial Daily Sales Widget
  - Mock data in the widget at the moment, however, all functionality around percentages and display values has been implemented.

## 2.29.4 (May 07, 2017)

- Update dashboard chart to have consistent styling with the previous design.
  - The X-Axis now spells out the full string of the month, eg: January, February, etc.
  - Horizontal and Vertical lines to represent the ticks.
  - Visible data points on the actual graph.
- Finer grained ticks are pending a library update of `recharts`.

## 2.29.3 (May 07, 2017)

- The dashboard now makes proper API calls to pull down merchant data and display it on the main page.

## 2.29.2 (May 06, 2017)

- Add initial sales summary chart which will house the sales data.
- Add additional colors to the root `colors.css` file.

## 2.29.1 (May 06, 2017)

- Addition of a date and time utility that produces the underlying base for chart results.
- Add `recharts` to the project.

## 2.29.0 (May 06, 2017)

- Add startDate and endDate queryString params to the `/orders` API endpoint.

## 2.28.0 (May 01, 2017)

- Add Order Detail as an expandable subsection in the order list view.
- Refactor the styling and display of the order history page.

## 2.27.9 (May 01, 2017)

- Add item color display functionality via a color utility mapper.
- Update `<ItemImage />` to accept a `color` prop and set it accordingly based on a an enum map.
- Add date-fns to the project.

## 2.27.8 (April 30, 2017)

- Migrate ItemImage to common components.
- Update ItemImage to display as a circle in list views with no border
- Update consumers of ItemImage to reference the proper filepath.

## 2.27.7 (April 29, 2017)

- Clicking on an order in the list view will pull down the orderDetails.
- Wire up of the reducer and actions.
- Cascade orderDetail down to individual card component.

## 2.27.6 (April 23, 2017)

- Add item image flag that will be properly set to true if the user uploaded an image.
- Clicking on an icon image will now navigate to the detail page.

## 2.27.5 (April 23, 2017)

- Update routes in the left nav to properly display the route path to the user.
- Update default item value to be empty.

## 2.27.4 (April 23, 2017)

- Update Item Detail Image container location.

## 2.27.3 (April 23, 2017)

- Update Item Detail UI/UX.

## 2.27.2 (April 23, 2017)

- Fix discount type to properly display percentage and the dollar amount based on the user input.

## 2.27.1 (April 23, 2017)

- Fix item name to properly display on Discounts and Taxes MultiSelect.

## 2.27.0 (April 23, 2017)

- Migrate to Jest
- Remove Istanbul, Isparta, Mocha and nyc
- General test file cleanup
- Addition of `jest` to eslint
- Removal of rewire

## 2.26.6 (April 22, 2017)

- Relax naming restriction on modifiers and discounts to allow for percentages.

## 2.26.5 (April 22, 2017)

- Add OrderAction tests and clean up redundant `LOADING` action dispatches

## 2.26.4 (April 20, 2017)

- Update tests for the RegEx changes.

## 2.26.3 (April 20, 2017)

- Update all detail pages that reference an item to display the name instead of the label.

## 2.26.2 (April 20, 2017)

- Update `domain_endpoint` environment variable secret back to `http://www.westernregister.com`
  - This resolves various issues around uploading items.

## 2.26.1 (April 20, 2017)

- Update RegEx to allow for spaces, numbers, comas and periods in label and name fields for various components.
- Update item list view to reflect `name` ipo `label`

## 2.26.0 (April 17, 2017)

- Add Order List View
- Add Currency Utility to handle display of money

## 2.25.1 (April 16, 2017)

- Add Order Status Description Utility
  - Return a human readable version of the orderStatusId

## 2.25.0 (April 16, 2017)

- Add an Orders Controller to pull down all and orders by id
  - Initial implementation involves pulling down ALL orders and orders by id.
  - No consumption on the FrontEnd at this time.

## 2.24.0 (April 16, 2017)

- Add Modifiers to Item Detail View
  - Users can now add modifiers to an item.

## 2.23.1 (April 16, 2017)

- Update detail portal styling
  - Consistency across the board in regards to styling.

## 2.23.0 (April 15, 2017)

- Update Discount Detail Page
  - Implementation around discount actions in relation to creation, updates and deactivation.

## 2.22.3 (April 15, 2017)

- Update Discount Detail Page
  - Addition of a SelectList which allows the user to select the value type(_Percent_ or _Currency_)

## 2.22.2 (April 14, 2017)

- Add Discount Detail Page
  - Base implementation of the detail page to view an existing discount or create a new one.  None of the functionality is tied to actions.

## 2.22.1 (April 12, 2017)

- Add Discount List View

## 2.21.0 (April 12, 2017)

- Remove Item checkbox
- Reposition Item Image within the table

## 2.20.0 (April 12, 2017)

- Add Spinner to Tax Updates and Creation
- Add Spinner to Modifier updates and Creation

## 2.19.0 (April 12, 2017)

- Update Modifier Detail Page
  - Implementation around modifier actions in relation to creation, updates and deactivation.
  - UI modified to contain a separate label from the TextField.

## 2.18.1 (April 10, 2017)

- Add Modifier Detail Page
  - Base implementation of the detail page to view an existing modifier or create a new one.  None of the functionality is tied to actions.

## 2.18.0 (April 3, 2017)

- Add Modifier Page
  - Base implementation of the modifiers page which displays the modifiers on the application.  None of the functionality with edit, deactivate or creation are developed yet.

## 2.17.1 (April 3, 2017)

- Add Category Table Tests
  - In an effort to maintain code quality, tests were added to the `CategoriesTable` component to ensure that any future changes are intentional.

## 2.17.0 (April 3, 2017)

- Add functionality for tax items
  - This release allows users to modify a tax, create a new tax, and delete a tax item.

## 2.16.2 (April 2, 2017)

- Update Tax Detail Page
  - Add Tax Icon to the Tax Detail Page
  - Rearrange the content to properly account for the icon
- Add Material Icons to the project
  
## 2.16.1 (April 2, 2017)

- Add Taxes Detail Page
  - The detail page includes the ability to Edit and Create a new Tax.
  - The actual functionality to add and edit a tax item will come in a future release.
  - Users must select an `Apply To` field to proceed.  If _Everything_ is selected, items will not have to be chosen, however, if _Individual Items_ is chosen, then at least 1 item needs to be selected from the multi SelectField.

## 2.16.0 (April 1, 2017)

- Add Taxes Page
  - Base implementation of the taxes page which displays the taxes on the application.  None of the functionality with edit, deactivate or creation are developed yet.

## 2.15.0 (April 1, 2017)

- Add Item Category selection
  - Users can now select an Item Category that is a higher level container over the item.

## 2.14.0 (April 1, 2017)

- Add tests and fix Category updates
  - The `PUT` request will now properly pass through to the backend.  The issue was related to the backend not properly handling calls with a resource {id}
  - Test coverage added around `CategoriesController`

## 2.13.0 (March 31, 2017)

- Add Category Detail Form
  - The category detail form allows users to create and edit categories
  - Numerous components were migrated from the item display to quickly scaffold these views.
  - The `PUT` request is not functional on the backend, but once its enabled it should properly
    work as intended.

## 2.12.0 (March 30, 2017)

- Replace toastr with Snackbar
  - Refactored components utilizing toastr and replaced them with Material-UI's Snackbar

## 2.11.2 (March 29, 2017)

- Add DOMAIN_ENDPOINT environment variable secret

## 2.11.1 (March 29, 2017)

- Throttle down tracing verbosity at the root
  - `/` will no longer be traced as this route is hit repeatedly.

## 2.11.0 (March 28, 2017)

- Add Initial Item Categories Portal
  - The initial portal includes a list of item Categories.
  - None of the functionality to interact with item categories is part of this release.
  - Item Categories do not have a multi select or select option.

## 2.10.2 (March 27, 2017)

- Update deployment configuration to include an `emptyDir` volume which is used as part of temporary image storage.
- A `.gitkeep` file is added to source control to make sure that the folder isn't deleted

## 2.10.1 (March 27, 2017)

- Update logging verbosity
  - Root / calls will no longer be logged if they return 200 status codes.

## 2.10.0 (March 27, 2017)

- Add user context to sidenav
  - Users first and last name are now displayed on the sidenav in the top left corner.  If the name isn't set during registration, it will not be set.
  - Users role is mapped to the top left sidenav.  Roles are Owner, Administrator and User.
  - Add logout link to the side navigation when clicking on the users role.

## 2.9.1 (March 26, 2017)

- Update item `DELETE` call to properly end the stream.
  - General cleanup around items being pulled from `props` and not `state`.

## 2.9.0 (March 26, 2017)

- Proxy Item updates through express gateway.
  - Nearly the same procedural calls as the `POST` endpoint, except that an id param is expected.
  - If the file is not sent, the photoURL is passed along to persist the current image.
- Any failed backend calls for `POST` or `PUT` in regards to items, will properly stop the spinner.

## 2.8.0 (March 26, 2017)

- Proxy Item creation through express gateway.
  - Multer was brought into to handle multipart form upload and proxy it accordingly.
  - ItemController received major refactoring to properly proxy the request and pass the file through accordingly.
  - Updates will be handled through the put request which is still WIP.

## 2.7.8 (March 25, 2017)

- Update ingress to include the `www.` subdomain.

## 2.7.7 (March 24, 2017)

- Proxy all image retrieval through express gateway.

## 2.7.6 (March 22, 2017)

- Refactor itemImage to utilize CSSModules and move `httpEndpoints` to utilities.

## 2.7.5 (March 22, 2017)

- Add application version to login landing page and dashboard

## 2.7.4 (March 22, 2017)

- Parse tracing to exclude /healthz.

## 2.7.3 (March 22, 2017)

- Add `lcov` reporter as well as Travis README badge.

## 2.7.2 (March 22, 2017)

- Add code coverage with `nyc`.

## 2.7.1 (March 21, 2017)

- Parse logging to exclude /healthz.

## 2.7.0 (March 21, 2017)

- Proxy login with token requests through Express application.

## 2.6.1 (March 20, 2017)

- Add production request logging.

## 2.6.0 (March 20, 2017)

- Fix tracing and add new entry point production.

## 2.5.1 (March 20, 2017)

- Upgrade cluster nodes to `n1-standard-1`
  - Initial node quantity: 1
  - Max node quantity: 3
- Add readiness probe check to the deployment.

## 2.5.0 (March 20, 2017)

- Configure GCP tracing and change cluster name.

## 2.4.0 (March 20, 2017)

- Add AccountController routes and refactor login component
  - Currently all of the calls from the front end React application are making outbound calls over insecure channels(HTTP), to rectify this, the calls should be going strictly to the middletier(Express layer). This is a first in a step of refactor sessions to migrate the calls appropriately.
  - Login component refactored to utilize async/await

## 2.3.1 (March 19, 2017)

- Fix sidenav not collapsing.

## 2.3.0 (March 19, 2017)

- Add HSTS and set routes to only call HTTPs endpoints.
  - Local development will point to non-secure routes.
  - Automatic redirect and security upgrade if connecting over HTTP.
  - Once the domain is accessed over HTTPS, headers will be set that will persist on the users browser.

## 2.2.0 (March 19, 2017)

- Switch hosted domain to `mdjs.io`.

## 2.1.1 (March 19, 2017)

- Configure SSL cert retrieval from LetsEncrypts production endpoint.

## 2.1.0 (March 18, 2017)

- Add Kube-Lego configuration for TLS.

## 2.0.2 (March 16, 2017)

- Update landing login page styles.

## 2.0.1 (March 13, 2017)

- Fix deployment configuration to match the latest release.

## 2.0.0 (March 13, 2017)

- Orchestrate a rolling deployment on all of the services, deployments and secrets in the application on success master branch builds.

## 1.9.4 (March 13, 2017)

- Elevate service account permissions.

## 1.9.3 (March 13, 2017)

- Update gcloud command to elevated permissions.

## 1.9.2 (March 13, 2017)

- Update gcloud command path.

## 1.9.1 (March 13, 2017)

- Update Service Account to grant it access to GCR buckets.

## 1.9.0 (March 13, 2017)

- Orchestrate pushing docker images from CI to GCP Container Registry

## 1.8.3 (March 13, 2017)

- Add environment variable to disable all GCP prompts via Travis.

## 1.8.2 (March 13, 2017)

- Disable prompts for gcloud component `kubectl`:
  - Non-interactive (silent) deployment:
    - `--quiet`

## 1.8.1 (March 13, 2017)

- Disable prompts, the default directory is ${HOME}:
  - Non-interactive (silent) deployment:
    - `--disable-prompts - disables prompts.`

## 1.8.0 (March 13, 2017)

- Add GCP authentication script to authenticate, install the kubectl CLI and setup the GCLOUD SDK.

## 1.7.1 (March 13, 2017)

- Fix bash variable not properly being passed in to the `docker-push` script.

## 1.7.1 (March 12, 2017)

- Add encrypted service account to GCP.

## 1.7.0 (March 12, 2017)

- Codify GKE `cluster.yaml` which is used to stand up the cluster in GCP.
  - Note that the minimum nodes when using `f1-micro` machineTypes is 3.

## 1.6.7 (March 12, 2017)

- Refactor common bash file to be more consistent with Bash best practices.
- Break out docker image creation into a more readable format.

## 1.6.6 (March 12, 2017)

- Clean up the license file to fix the formatting issues.

## 1.6.5 (March 12, 2017)

- Update license to AGPLv3.

## 1.6.4 (March 11, 2017)

- Abstract away docker image creation and push to separate script

## 1.6.3 (March 11, 2017)

- Fix webpack babel loader in production.

## 1.6.2 (March 11, 2017)

- Fix webpack babel loader to only load once based for `js` and `jsx` extensions.  
- Clean up environment variable proliferation throughout the application

## 1.6.1 (March 11, 2017)

- Add Infrastructure Diagram which provides a high level overview of what the infrastructure goals are for the application.

## 1.6.0 (March 05, 2017)

- Add Item search filter functionality.

## 1.5.1 (March 05, 2017)

- Disable global search and fix hamburger menu.

## 1.5.0 (March 05, 2017)

- Add display of images to the item list and refactor itemDetail page to properly render the image.

## 1.4.2 (March 05, 2017)

- Add Redux devtools store configuration.

## 1.4.1 (March 05, 2017)

- Replace `Array.prototype.filter()` with `Array.prototype.find()` when selecting a single element.

## 1.4.0 (March 05, 2017)

- Add Item removal functionality
- Remove dead code surrounding item selection.

## 1.3.4 (March 04, 2017)

- Migrate back to `react-dropzone` 3.10.0.  The new version introduces various deprecation warnings that are nothing more than noise for the upcoming release.  When the package is updated and the new API is provided, this application will migrate accordingly.

## 1.3.3 (March 04, 2017)

- Remove jQuery slimscroll.  Unused in the application.
- Cleanup and removal of unnecessary functionality in inspinia.

## 1.3.2 (March 01, 2017)

- Fix build tasks to not run the server during build.
  - This resolves the issues related to creating a docker image as well.

## 1.3.1 (March 01, 2017)

- Add a colors.js file to be used as part of inline styles.

## 1.3.0 (February 27, 2017)

- Add Docker image to the end of the build task
  - Remove reference to Windows support, it is dropped at this time.

## 1.2.7 (February 27, 2017)

- Update package dependencies.
  - Leaving webpack and extract-text-webpack-plugin on v1.

## 1.2.6 (February 27, 2017)

- Update Spinner position within itemDetail page when updating or creating a new item.

## 1.2.5 (February 27, 2017)

- Refactor ItemDetail component and add tests over from HOC to all presentational components.

## 1.2.4 (February 26, 2017)

- Add async/await support
- Fix bug related to invalid passed in token causing the spinner to stay active

## 1.2.3 (February 25, 2017)

- Fix CSSModules not wrapping itemDetail component.

## 1.2.2 (February 25, 2017)

- Refactor ItemDetail controls to utilize Material-UI components.
- Added additional styling

## 1.2.1 (February 22, 2017)

- Add tests and robust support around the itemTableRow component.

## 1.2.0 (February 20, 2017)

- Remove SASS
- Provide support for PostCSS(CSSNext)

## 1.1.2 (February 20, 2017)

- Add Async/Await support with Babel Regenerator runtime

## 1.1.0 (February 11, 2017)

- Add Docker deployment

## 1.0.2 (January 15, 2017)

- Add initial utility functionality:
    - This commit encompasses the initial commit which builds out the Dashboard
    - The goal is to make this an open platform built on NodeJs and React.
    - Users can update various environment variables and deploy accordingly.
