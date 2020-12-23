#!/bin/bash

echo "Run migration:"
yarn db:migrate

# echo "Run seed:"
# yarn db:seed

echo "Start node server:"
yarn watch