#!/bin/bash

set -e
go get gopkg.in/cheggaaa/pb.v1
cd tools; go build release.go; cd ..

VERSION="$(./tools/release n3 version)"

CWD=`pwd`
npm install
./node_modules/.bin/quasar build

cd dist/spa-mat/
zip -qr ../../DC-UI-$VERSION.zip *

echo "If happy with zip, run the following release command"
echo " ./tools/release DC-UI DC-UI.zip DC-UI-$VERSION.zip"
