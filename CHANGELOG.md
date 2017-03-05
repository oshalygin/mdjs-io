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
