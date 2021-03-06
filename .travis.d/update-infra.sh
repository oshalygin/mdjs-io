#!/usr/bin/env bash
#
# Script that orchestrates a rolling deployment on all of the services, deployments and secrets in the application.
#
set -o nounset
set -o errexit -o errtrace

# Apply an update to all resources in the current infrastructure
sudo kubectl apply -f ${PWD}/infrastructure/resources/kube-lego
sudo kubectl apply -f ${PWD}/infrastructure/resources
