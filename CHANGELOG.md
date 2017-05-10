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
