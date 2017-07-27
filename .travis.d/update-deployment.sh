#!/usr/bin/env bash
#
# This script updates the web-deployment.yaml configuration file so that the latest
# image is persisted.  To orchestrate this, k8s-config is used.
set -o nounset
set -o errexit -o errtrace

readonly utility_version="1.0.0"
readonly application_version=$(node -p -e "require('./package.json').version");

# Retrieve the latest binary
wget https://github.com/oshalygin/k8s-config/releases/download/$utility_version/darwin_amd64_k8s-config \
      -O k8s-config

# Set the proper version from package.json

sudo ./.k8s-config \
  --type=deployment \
  --file-path=./infrastructure/resources/web-deployment.yaml \
  --tag=$application_version;
