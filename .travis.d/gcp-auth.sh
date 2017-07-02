#!/usr/bin/env bash
#
# This script will automatically pull down the latest GCloud SDK, install the latest kubectl CLI and authenticate with GCP.
set -o nounset
set -o errexit -o errtrace
set -o pipefail

readonly GOOGLE_PROJECT=mdjs-io
readonly CLUSTER=mdjs-kube
readonly ZONE=us-central1-a
readonly GCLOUD_SDK_VERSION=161.0.0-0
readonly CREDENTIAL_FILE="${PWD}/infrastructure/service-account.json"

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/common.sh"

function install_cloud_sdk
{
    rm -rf ${HOME}/google-cloud-sdk
    
    export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
    echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
    sudo apt-get update && sudo apt-get install google-cloud-sdk=${GCLOUD_SDK_VERSION} 
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
    sudo apt-get install kubectl
    # Add kubectl to path
    export PATH="${HOME}/google-cloud-sdk/bin:$PATH"
    # Authenticate the service account against the kubernetes cluster
    sudo gcloud auth activate-service-account --key-file ${CREDENTIAL_FILE}
    #   When running in CI or other systems on Google Cloud machines with
    #   a restricted Google account, you have to use gcloud auth
    #   activate-service-account before calling gcloud container clusters
    #   get-credentials, but then have to override that authentication by
    #   setting GOOGLE_APPLICATION_CREDENTIALS before calling kubectl.
    export GOOGLE_APPLICATION_CREDENTIALS="${CREDENTIAL_FILE}"
    gcloud config set container/use_application_default_credentials true
    sudo gcloud container clusters get-credentials ${CLUSTER}
    # Fix permissions for .kube so that kubectl can access the configuration file
    sudo chown -R travis:travis /home/travis/.kube/config
    
    # Execute necessary kubectl commands
    kubectl cluster-info
}

info "Pulling down GCloud SDK, installing kubectl CLI and Authenticating with GCP" 

# Functions that orchestrate the necessary steps involved to authenticate with GCP and get the environment ready.
install_cloud_sdk
configure_gcloud
setup_kubernetes
