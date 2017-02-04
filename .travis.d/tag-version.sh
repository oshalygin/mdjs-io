#!/usr/bin/env bash
#
# Script that automatically sets the git tag on the current commit.
# The tag version has the form of {vX.X.X} where the X's represent semver representation of the project version.
# Note that if the version already exists in the tag history, the tag is first deleted and then reset to the current commit
# If the tag does not exist for that version, it is set accordingly.
#
set -o nounset
set -o errexit -o errtrace

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/common.sh"


function push_tag
{
  git push origin --tags
  Log_Success "Successfully pushed the new tag: ${current_version}"
}

function get_current_version
{
  current_version="v$(node -p -e "require('${SCRIPT_DIR}/../package.json').version")"
  Log_Info "Project Version: ${current_version}";
}

function remove_existing_tag
{
  result=$(git tag --delete "${current_version}")
  Log_Warn "${current_version} removed"
}

function add_tag
{
  Log_Info "Setting new tag: ${current_version}"
  $(git tag "${current_version}")
  Log_Success "Successfully set the new tag: ${current_version}"
}

function set_tag
{
 if [[ `git tag -l $current_version` == $current_version ]]; then
    Log_Warn "Version, ${current_version}, already exists, deleting ${current_version}"
    remove_existing_tag
    add_tag
  else
    add_tag
  fi
}

Display_Banner "Processing and setting the git tag version on the latest commit." \

get_current_version
set_tag
push_tag
