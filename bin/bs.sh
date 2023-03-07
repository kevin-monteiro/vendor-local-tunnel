#!/bin/bash

set -eu

dir="$(dirname "$0")"
source "${dir}/vars"

export TARGET=browserstack

yarn install --frozen-lockfle

yarn bs-tunnel:start

yarn test
yarn tunnel:stop