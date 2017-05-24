#!/bin/bash

set -e

sed -i.bak 's/"\/index/"\/hodler\/index/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
sed -i.bak 's/"\/manifest/"\/hodler\/manifest/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
sed -i.bak 's/"\/images/"\/hodler\/images/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
sed -i.bak 's/\/service-worker/\/hodler\/service-worker/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
sed -i.bak 's/"\/bower_components/"\/hodler\/bower_components/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
sed -i.bak 's/"\/ui/"\/hodler\/ui/g' build/default/index.html build/default/service-worker.js build/default/manifest.json
rm build/default/*.bak
