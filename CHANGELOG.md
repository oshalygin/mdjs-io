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
  - Currently all of the calls from the front end React application are making outbound calls over unsecure channels(HTTP), to rectify this, the calls should be going strictly to the middletier(Express layer). This is a first in a step of refactor sessions to migrate the calls appropriately.
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

- Orchetrate a rolling deployment on all of the services, deployments and secrets in the application on success master branch builds.

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
- Cleanup and removal of unncessary functionality in inspinia.

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
