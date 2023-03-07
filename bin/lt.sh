#!/bin/bash

set -eu

dir="$(dirname "$0")"
source "${dir}/vars"

export TARGET=lambdatest

yarn install --frozen-lockfle

# nohup yarn lt-tunnel:start &
# sleep 20
yarn lt-tunnel:start

yarn test
yarn tunnel:stop