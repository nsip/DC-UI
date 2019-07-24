#!/bin/bash

set -e

echo "START (please check you get a COMPLETE)"
if [ -z "$(git status --porcelain)" ]; then
  echo "NOTE: Working on new release..."
else
  echo "ERROR: Uncommitted GIT changes. Please start with a clean repository"
  exit 1
fi

echo "STEP: Checkout latest version"
git checkout master
echo "STEP: Patch version (auto increment)"
npm version patch
echo "STEP: Commit package version changes"
git add package.json
git diff-index --quiet HEAD || git commit -m 'Auto update'
echo "STEP: Pushing repository and tags"
git push
git push --tags

echo "COMPLETE"
