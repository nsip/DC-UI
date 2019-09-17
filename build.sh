#!/bin/bash

set -e

VERSION="v0.0.0"

CWD=`pwd`

mkdir -p build
mkdir -p build/Linux64/DC-UI
mkdir -p build/Mac/DC-UI
mkdir -p build/Win64/DC-UI
./node_modules/.bin/quasar build
rsync -av dist/spa-mta/* build/Linux64/DC-UI/
rsync -av dist/spa-mta/* build/Mac/DC-UI/
rsync -av dist/spa-mta/* build/Win64/DC-UI/

echo "Building Linux64 binaries..."
GOOS=linux
GOARCH=amd64
LDFLAGS="-s -w"
OUTPUT=$CWD/build/Linux64/DC-UI
GOOS="$GOOS" GOARCH="$GOARCH" go build -ldflags="$LDFLAGS" -o $OUTPUT/static tools/static.go

echo "Building Win64 binaries..."
GOOS=windows
GOARCH=amd64
LDFLAGS="-s -w"
OUTPUT=$CWD/build/Win64/DC-UI
GOOS="$GOOS" GOARCH="$GOARCH" go build -ldflags="$LDFLAGS" -o $OUTPUT/static.exe tools/static.go

echo "Building Macintosh binaries..."
GOOS=darwin
GOARCH=amd64
LDFLAGS="-s -w"
OUTPUT=$CWD/build/Mac/DC-UI
GOOS="$GOOS" GOARCH="$GOARCH" go build -ldflags="$LDFLAGS" -o $OUTPUT/static tools/static.go

echo "ZIP Linux64"
cd $CWD/build/Linux64
zip -qr ../DC-UI-Linux64-$VERSION.zip *

echo "ZIP Win64"
cd $CWD/build/Win64
zip -qr ../DC-UI-Win64-$VERSION.zip *

echo "ZIP Mac"
cd $CWD/build/Mac
zip -qr ../DC-UI-Mac-$VERSION.zip *
