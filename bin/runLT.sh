#!/bin/sh
export TARGET=lambdatest
export LAMBDATEST_USER=YOUR_LT_USERNAME
export LAMBDATEST_KEY=YOUR_LT_KEY

yarn lt-tunnel:start
yarn test
yarn tunnel:stop