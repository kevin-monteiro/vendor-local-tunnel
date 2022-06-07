#!/bin/sh
export TARGET=browserstack
export BROWSERSTACK_USER=YOUR_BS_USERNAME
export BROWSERSTACK_KEY=YOUR_BS_KEY

yarn bs-tunnel:start
yarn test
yarn tunnel:stop