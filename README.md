<p align="center">
  <img alt="React Logo" src="docs/react.png" height="140" />
  <img alt="Node.js Logo" src="docs/nodejs.png" height="140" />
  <h3 align="center">mdjs-io</h3>
  <p align="center">A React and Node.js Merchant Dashboard</p>
  <p align="center">
    <a href="https://github.com/oshalygin/mdjs-io/releases/latest"><img alt="Release" src="https://img.shields.io/github/release/oshalygin/mdjs-io.svg?style=flat-square"></a>
    <a href="/LICENSE.md"><img alt="Software License" src="https://img.shields.io/badge/license-AGPLv3-brightgreen.svg?style=flat-square"></a>
    <a href="https://codeclimate.com/repos/59bede4e2bfc96025600026b/feed"><img alt="Code Climate Issue Count" src="https://codeclimate.com/repos/59bede4e2bfc96025600026b/badges/d8e88772201d137ea8b7/issue_count.svg"></a>
  </p>

## Deployment

This project is intended to run within a Docker container, preferably in Kubernetes.  The `/infrastructure` folder contains all of the necessary configuration files to deploy accordingly to Google Cloud Platform.  While in theory you could host this in Azure or AWS, you're really getting a 1st class experience in GCP.  At this time the instructions are all aimed at GCP.

### Registration

1. Register an account with Google Cloud Platform at http://console.cloud.google.com
  - Agree to the Terms.
  - Add a Credit Card (You will not be charged initially, there's a $300 or 1 yr credit).
  - Start the Trial.
2. When you start your account, create a new project.

<a href="/docs/gcp_registration.png?raw=true" target="_blank">
  <img src="/docs/gcp_registration.png?raw=true" alt="image" title="GCP Registration" style="max-width:75%;margin:0 auto;">
</a>

### Instal the Google Cloud SDK

You will need the Google Cloud SDK to be able to deploy and manage your cloud resources.

1. Download the Google Cloud SDK from https://cloud.google.com/sdk/ 
2. You must have Python 2.7 installed.  There are a million ways to accomplish this, the simplest on OSX is homebrew.
3. After you have downloaded the package, extract it and run the following command in your shell
```bash
./google-cloud-sdk/install.sh
```
4. Call `gcloud init` and go through the initialization steps.

### Installing the `kubectl` Google Cloud SDK Component

```bash
# Install the kubernetes component
sudo gcloud components install kubectl
```

### Cloud Storage

Google Cloud Storage is used to store images in the cloud.  In local development, images are stored to a temporary bucket, prefixed with `temp`.  

A keyfile is necessary to properly authenticate against the Google Cloud project, make sure you have it in the root of the project. _Note_: This file is excluded from the repository(ala `.gitignore`), so keep it stored locally but do realize that you need it, otherwise you won't even be able to authenticate against the storage bucket.

### Authenticating with GCP

Some of these steps may seem redundant, but they are necessary to make sure things are running smoothly.  Run them in sequence.

```bash
# A browser window will launch and you will authenticate with your google account.
# Once everything is successful, you will be navigated back to your terminal
gcloud auth login

# gcloud auth login doesn't write application-default credentials as you'll see from this message:
# "WARNING: `gcloud auth login` no longer writes application default credentials."
# Run the following command:
gcloud auth application-default login

# Retrieving and setting credentials on your cluster
gcloud container clusters get-credentials <your_cluster_name>

# Configure the local gcloud service to point to the cluster
gcloud config set container/cluster <your_cluster_name>
gcloud config set compute/zone <your_cluster_name>
gcloud config set project <your_PROJECT_name>

```

### To run this application locally follow these steps:

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

## Development

### Running locally
The application can be started locally with the following command:
```bash
$ npm start -s # Run the application, kick off the test watch command along with the lint watcher.
```

### Running tests
Tests can be executed with the following test command:
```bash
$ npm test # Run tests
$ npm run test:coverage # Run tests with coverage
```

### Running tests with `--watch`
In order to properly run the the tests in watch mode you may need to install `watchman` via homebrew on OSX.
```bash
$ brew install watchman # Install watchman via homebrew
$ npm run test:watch # Run the tests and watch the source code for changes, re-running tests accordingly
```

## Contributing

The main purpose of this repository is to continue to evolve Merchant Dashboard, making it a robust dashboard experience.


#### Environment Variables
| **Name** | **Description**|
|----------|-------|
| `GOOGLE_PROJECT` | The project that houses the infrastructure   | |
| `NOD_ENV` | The Node environment   | |
| `IMAGE_STORAGE_BUCKET` | The bucket name that images are stored to   | |
| `DOMAIN_ENDPOINT` | The backend domain endpoint   | |

#### License

mdjs-io is [AGPLv3 licensed](./LICENSE.md).