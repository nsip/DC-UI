#!/bin/bash

set -e

if [ -z "$(git status --porcelain)" ]; then
  echo "Working on new release..."
else
  echo "Uncommitted GIT changes. Please start with a clean repository"
  exit 1
fi

git checkout master
npm version patch
git add package.json
git commit -m 'Auto update'
git push
git push --tags"
