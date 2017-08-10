#!/usr/bin/env bash
#
# This script updates the web-deployment.yaml configuration file so that the latest
# image is persisted.  To orchestrate this, k8s-config is used.
set -o nounset
set -o errexit -o errtrace

readonly utility_version="1.2.0"
readonly utility_binary="linux_amd64_k8s-config"
readonly k8s_utility="${PWD}/.travis.d/k8s-config"
readonly application_version=$(node -p -e "require('./package.json').version");

# Retrieve the latest binary
wget https://github.com/oshalygin/k8s-config/releases/download/$utility_version/$utility_binary \
      -O $k8s_utility

# Update access permissions of the utility
chmod +x $k8s_utility

sudo $k8s_utility \
  --type=deployment \
  --file-path=./infrastructure/resources/web-deployment.yaml \
  --tag=$application_version;
