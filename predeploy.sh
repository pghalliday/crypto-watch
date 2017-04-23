#!/bin/bash

set -e

sed -i.bak 's/"\/index/"\/crypto-watch\/index/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
sed -i.bak 's/"\/manifest/"\/crypto-watch\/manifest/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
sed -i.bak 's/"\/images/"\/crypto-watch\/images/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
sed -i.bak 's/\/service-worker/\/crypto-watch\/service-worker/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
sed -i.bak 's/"\/bower_components/"\/crypto-watch\/bower_components/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
sed -i.bak 's/"\/ui/"\/crypto-watch\/ui/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
