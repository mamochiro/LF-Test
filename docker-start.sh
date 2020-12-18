#!/bin/bash

echo "Run migration:"
yarn db:migrate

echo "Start node server:"
yarn watch