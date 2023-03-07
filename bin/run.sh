#!/bin/bash

set -eu

docker-compose --file ./docker-compose.test.yml run \
          --rm \
          nodejs \
          ./bin/lt.sh
