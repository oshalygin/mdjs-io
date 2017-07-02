#!/usr/bin/env bash
#
# Script that builds the docker image and pushes to DockerHub and GCP Container Registry
#
set -o nounset
set -o errexit -o errtrace

current_version=$(node -p -e "require('./package.json').version");

docker build --build-arg version=${current_version}\
  -t index.docker.io/oshalygin/merchant-dashboard:${current_version}\
  -t us.gcr.io/mdjs-io/merchant-dashboard:${current_version}\
  .;

# Push to Google Container Registry
export GOOGLE_APPLICATION_CREDENTIALS="${PWD}/infrastructure/service-account.json"

sudo gcloud docker -- push us.gcr.io/mdjs-io/merchant-dashboard:${current_version};
