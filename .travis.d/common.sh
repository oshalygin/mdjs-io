#!/usr/bin/env bash
#
# Common constants, functions and helpers.
set -o nounset
set -o errexit -o errtrace


readonly Color_switch="\033["
readonly Color_off="${Color_switch}0m"
readonly Color_orange="${Color_switch}0;33m"
readonly Color_blue="${Color_switch}0;34m"
readonly Color_light_green="${Color_switch}1;32m"
readonly Color_yellow="${Color_switch}0;33m"
readonly Color_red="${Color_switch}1;31m"


function FatalE
{
    local -i status=$1; shift
    trap - EXIT

    (( status != 0 )) || status=1

    echo -e >&2 "Fatal: $@"
    exit $status
}

function Fatal
{
    FatalE 1 "$@"
}

function Display_Banner
{
    echo -e "********************************************************************************"
    for m in "$@"; do
        echo -e "$m"
    done
    echo -e "********************************************************************************"
}

function Log_Message
{
    local message=$1
    echo -e "${message}"
}

function Log_Info
{
    local message=$1
    echo -e "${Color_blue}[INFO] ${message}${Color_off}"
}

function Log_Warn
{
    local message=$1
    echo -e "${Color_yellow}[WARN] ${message}${Color_off}"
}

function Log_Error
{
    local message=$1
    echo -e "${Color_red}[ERROR] ${message}${Color_off}"
}

function Log_Success
{
    local message=$1
    echo -e "${Color_light_green}[SUCCESS] ${message}${Color_off}"
}
