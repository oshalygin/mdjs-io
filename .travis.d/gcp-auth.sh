#!/usr/bin/env bash
#
# This script will automatically pull down the latest GCloud SDK, install the latest kubectl CLI and authenticate with GCP.

set -o nounset
set -o errexit -o errtrace

readonly GOOGLE_PROJECT=merchant-dash
readonly CLUSTER=merchant-dashboard-kube
readonly ZONE=us-central1-f

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/common.sh"

function install_cloud_sdk
{
  # Remove existing google-cloud-sdk directory which comes bundled with Travis services.
  # This is necessary because there is already an older(2014)
  # installation of the GCP SDK which conflicts with the latest release.
  rm -rf ${HOME}/google-cloud-sdk
  sudo curl https://sdk.cloud.google.com | bash -s -- --disable-prompts
  sudo gcloud auth activate-service-account --key-file ./infrastructure/service-account.json
}

function configure_gcloud
{
    # Configure the local gcloud service to point to the cluster
    gcloud config set container/cluster ${CLUSTER}
    gcloud config set compute/zone ${ZONE}
    gcloud config set project ${GOOGLE_PROJECT}
}

function setup_kubernetes
{
    # Install the kubernetes component
    sudo gcloud components install kubectl
    # Add kubectl to path
    export PATH="${HOME}/google-cloud-sdk/bin:$PATH"
    # Authenticate the service account against the kubernetes cluster
    sudo gcloud container clusters get-credentials ${CLUSTER}
    #   When running in CI or other systems on Google Cloud machines with
    #   a restricted Google account, you have to use gcloud auth
    #   activate-service-account before calling gcloud container clusters
    #   get-credentials, but then have to override that authentication by
    #   setting GOOGLE_APPLICATION_CREDENTIALS before calling kubectl.
    export GOOGLE_APPLICATION_CREDENTIALS="${PWD}/infrastructure/service-account.json"
    # Update the kubernetes component once more
    ${HOME}/google-cloud-sdk/bin/gcloud components update kubectl --quiet
    # Print out the cluster information
    sudo ${HOME}/google-cloud-sdk/bin/kubectl cluster-info
}

info "Pulling down GCloud SDK, installing kubectl CLI and Authenticating with GCP" 

# Functions that orchestrate the necessary steps involved to authenticate with GCP and get the environment ready.
install_cloud_sdk
configure_gcloud
setup_kubernetes
