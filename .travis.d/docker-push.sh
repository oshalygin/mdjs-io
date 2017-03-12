#!/usr/bin/env bash
#
# Script that builds the docker image and pushes to DockerHub and GCP Container Registry
#
set -o nounset
set -o errexit -o errtrace

docker build --build-arg version=$(node -p -e "require('./package.json').version") -t index.docker.io/oshalygin/merchant-dashboard:$(node -p -e "require('./package.json').version") .;
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
docker push oshalygin/merchant-dashboard:$(node -p -e "require('./package.json').version");