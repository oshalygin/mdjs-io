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
