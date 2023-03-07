#!/bin/bash

set -eu

dir="$(dirname "$0")"
source "${dir}/vars"

# local variables
STATUS=0

function wait_for_jobs() {
    for job in $(jobs -p)
    do
      wait "$job" || STATUS=$?
    done
}

function terminate() {
  yarn tunnel:stop
  exit $STATUS
}

trap terminate SIGINT SIGTERM EXIT

yarn install --frozen-lockfile

yarn tunnel:start

(
TARGET=browserstack yarn test &
TARGET=lambdatest yarn test &
wait_for_jobs
)
