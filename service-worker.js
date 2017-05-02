/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/crypto-watch/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/crypto-watch/bower_components/app-layout/app-header-layout/app-header-layout.html","d3072f8cf30de94a99ac4825d1e07df8"],["/crypto-watch/bower_components/app-layout/app-header/app-header.html","62d69c07d519c29122a10f54fee304af"],["/crypto-watch/bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","1c3ff0cfca67f55047c384153d391ade"],["/crypto-watch/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","ffadeb52557b2c0fc7a28ff106903622"],["/crypto-watch/bower_components/app-layout/app-toolbar/app-toolbar.html","1969068eeac3ed606025f04bf7871282"],["/crypto-watch/bower_components/app-layout/helpers/helpers.html","1da38888481edb36a5d7f15a8633dd9f"],["/crypto-watch/bower_components/app-localize-behavior/app-localize-behavior.html","3b6ddc164e65e4db8b22c1a4a958a9b7"],["/crypto-watch/bower_components/font-roboto/roboto.html","22fe760d42278ca3b2b3718390fbb1bd"],["/crypto-watch/bower_components/intl-messageformat/dist/intl-messageformat.min.js","51b67920a4b58bea399834222cd962ef"],["/crypto-watch/bower_components/intl/dist/Intl.js","2b747d7644258a4a34531f894cfa98d3"],["/crypto-watch/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","2147d8e18cb4f776df227ff7c5c6da86"],["/crypto-watch/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","d798f4d8d47b190b6affe66e78e96774"],["/crypto-watch/bower_components/iron-ajax/iron-ajax.html","eacd7c4faffd60ca36c412a7059d3aef"],["/crypto-watch/bower_components/iron-ajax/iron-request.html","dd88de95d125293385136115566ccab6"],["/crypto-watch/bower_components/iron-behaviors/iron-button-state.html","ba52a53a33c5bddd0eaa1ed670d2da05"],["/crypto-watch/bower_components/iron-behaviors/iron-control-state.html","fb2613f2ffc10065e718be1f9969acb5"],["/crypto-watch/bower_components/iron-flex-layout/iron-flex-layout-classes.html","ee5afaf32c03f8ec633dc72a623f734f"],["/crypto-watch/bower_components/iron-flex-layout/iron-flex-layout.html","3e285c2698feec264710fffd609630ad"],["/crypto-watch/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","2f0a609a52c3b90dc78d529858f04445"],["/crypto-watch/bower_components/iron-image/iron-image.html","bb978e6a1dfb2b535c26b2ef2ce22ffe"],["/crypto-watch/bower_components/iron-input/iron-input.html","13561c0aa93c046a964d55a400333cf4"],["/crypto-watch/bower_components/iron-meta/iron-meta.html","aa90ac8b9694a6a582c9bed8b3bef3f8"],["/crypto-watch/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","9795c8d13481e2eef73b7a5e45cec94d"],["/crypto-watch/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","3b8b0aa413dc28f29b833c9cdb221ae8"],["/crypto-watch/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","504b1856b7fdd09f43bf98eb3ea697b3"],["/crypto-watch/bower_components/paper-behaviors/paper-button-behavior.html","793782859ac11addc2f665dda089da48"],["/crypto-watch/bower_components/paper-behaviors/paper-ripple-behavior.html","f8da6bdab811221037f001d1b16785c9"],["/crypto-watch/bower_components/paper-button/paper-button.html","274872a286e733c9b97d99b2466d47f3"],["/crypto-watch/bower_components/paper-card/paper-card.html","da6b13bec865f1d6e150905e1255a605"],["/crypto-watch/bower_components/paper-input/paper-input-addon-behavior.html","db9171b2bf4fdb8327dd4f311ccc0296"],["/crypto-watch/bower_components/paper-input/paper-input-behavior.html","09a441207199ff292e1f38d35ffb32ac"],["/crypto-watch/bower_components/paper-input/paper-input-char-counter.html","5e800861916aee9a137a5c6397265435"],["/crypto-watch/bower_components/paper-input/paper-input-container.html","6d826668288efcf92ad80f8d2482f67f"],["/crypto-watch/bower_components/paper-input/paper-input-error.html","bd45af6be1c5185799be39f0194252ea"],["/crypto-watch/bower_components/paper-input/paper-input.html","5bea84423672ac2d030f436526e9e857"],["/crypto-watch/bower_components/paper-ripple/paper-ripple.html","78a6527daf75dee33e32cf61c97cece8"],["/crypto-watch/bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["/crypto-watch/bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["/crypto-watch/bower_components/paper-styles/element-styles/paper-material.html","41d21c82843f2567c6cd73a5f747dce0"],["/crypto-watch/bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["/crypto-watch/bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["/crypto-watch/bower_components/polymer-redux/dist/polymer-redux.html","4d9b5ad598415244ceb6c14b175aed0a"],["/crypto-watch/bower_components/polymer-redux/polymer-redux.html","27a48debbea877c6295fbdc2524ed92c"],["/crypto-watch/bower_components/polymer/lib/elements/array-selector.html","474bd7d514a420b505e9cc8b9aa482b2"],["/crypto-watch/bower_components/polymer/lib/elements/custom-style.html","05ce94bb092aa27eb12a06627c97c93d"],["/crypto-watch/bower_components/polymer/lib/elements/dom-bind.html","1ab3456c30127e3049c438fef0dc5de0"],["/crypto-watch/bower_components/polymer/lib/elements/dom-if.html","7a23597245202b7e87bcb8b86f07dfd1"],["/crypto-watch/bower_components/polymer/lib/elements/dom-module.html","8f3f894603d7a5ef58fef2b3ccc7e927"],["/crypto-watch/bower_components/polymer/lib/elements/dom-repeat.html","5fcc7d03b5b734f06f628cf2b4d3c53e"],["/crypto-watch/bower_components/polymer/lib/legacy/class.html","1a5d003bab32daa385419110b5d47072"],["/crypto-watch/bower_components/polymer/lib/legacy/legacy-element-mixin.html","3c885e50e770194335bc37d09508703a"],["/crypto-watch/bower_components/polymer/lib/legacy/mutable-data-behavior.html","a03f5783244490e022bfdee9bc36c1d8"],["/crypto-watch/bower_components/polymer/lib/legacy/polymer-fn.html","c03705f7bd4dbee4b347bc1ee2d742ab"],["/crypto-watch/bower_components/polymer/lib/legacy/polymer.dom.html","7f5f299d5221a16f7fc4b76719fa799b"],["/crypto-watch/bower_components/polymer/lib/legacy/templatizer-behavior.html","b68221cfeaa232f815aa9eac5d307d22"],["/crypto-watch/bower_components/polymer/lib/mixins/element-mixin.html","d62af274213ab28404f17f8ce3cab311"],["/crypto-watch/bower_components/polymer/lib/mixins/gesture-event-listeners.html","94ee744198e1b7c65a3ae790990631f9"],["/crypto-watch/bower_components/polymer/lib/mixins/mutable-data.html","adb616476ca09782b92d61a01d20aabd"],["/crypto-watch/bower_components/polymer/lib/mixins/property-accessors.html","e43e28a522c72b91efffbb0015f206fb"],["/crypto-watch/bower_components/polymer/lib/mixins/property-effects.html","2a0a3799ac6f497f92e05401644a0768"],["/crypto-watch/bower_components/polymer/lib/mixins/template-stamp.html","3eca0a16a4c0518ec494835914807a10"],["/crypto-watch/bower_components/polymer/lib/utils/array-splice.html","9c1a8201554264f7ab03047243aa008e"],["/crypto-watch/bower_components/polymer/lib/utils/async.html","16db8592c7ca246f0d7ae821b2f8b7ed"],["/crypto-watch/bower_components/polymer/lib/utils/boot.html","8f5b454f3d80931956398db5528c6450"],["/crypto-watch/bower_components/polymer/lib/utils/case-map.html","64a92e8ff052e4e0eef6f91c2b377672"],["/crypto-watch/bower_components/polymer/lib/utils/debounce.html","65c71b209c6fc595b60246a25f1df631"],["/crypto-watch/bower_components/polymer/lib/utils/flattened-nodes-observer.html","978b505083a2fa45f869a412ecb23700"],["/crypto-watch/bower_components/polymer/lib/utils/flush.html","ba27adf065d373f6b0e434d0d8ef6fd9"],["/crypto-watch/bower_components/polymer/lib/utils/gestures.html","f7614300cc976d920cf5c75256178c10"],["/crypto-watch/bower_components/polymer/lib/utils/import-href.html","d8b6004a95ea428da210fb8ac176b583"],["/crypto-watch/bower_components/polymer/lib/utils/mixin.html","0e4ba1a810f7c2d5df89f7c41f2ffb86"],["/crypto-watch/bower_components/polymer/lib/utils/path.html","15575ff2f79d923e6f9ed443a1ea98b2"],["/crypto-watch/bower_components/polymer/lib/utils/render-status.html","60fa263b678961716ff8fe7e948c8f4a"],["/crypto-watch/bower_components/polymer/lib/utils/resolve-url.html","dfc0c7635dbb36cb322720ca162c05ec"],["/crypto-watch/bower_components/polymer/lib/utils/style-gather.html","b60d81b7ee3a04c859f1bdd2c77b0268"],["/crypto-watch/bower_components/polymer/lib/utils/templatize.html","0e0a4af945d09667bd2b17e99afa4f96"],["/crypto-watch/bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["/crypto-watch/bower_components/polymer/polymer-element.html","31b98668d3a96df5ab93c6fd2dd8d6db"],["/crypto-watch/bower_components/polymer/polymer.html","041f02f3388a7a3c087298fde431df80"],["/crypto-watch/bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["/crypto-watch/bower_components/shadycss/apply-shim.min.js","d157caa00f3dc7c16ec70d58db3a35a4"],["/crypto-watch/bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["/crypto-watch/bower_components/shadycss/custom-style-interface.min.js","211b6018628e5a0e8f0a835eacee3174"],["/crypto-watch/bower_components/webcomponentsjs/custom-elements-es5-adapter.js","76bf14c68e996daeddf9d8ec2ee46edb"],["/crypto-watch/bower_components/webcomponentsjs/gulpfile.js","5b9593e6c3a2a87a866c1169114c745e"],["/crypto-watch/bower_components/webcomponentsjs/webcomponents-hi-ce.js","8b8c2f7ac3d539f8953b8d390e0b047e"],["/crypto-watch/bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","6a21877a41a295a9f7f03280db05d2cd"],["/crypto-watch/bower_components/webcomponentsjs/webcomponents-hi.js","497996949b601c43ba5bfe979f4ffb4b"],["/crypto-watch/bower_components/webcomponentsjs/webcomponents-lite.js","827d9579de08d0667676870cf8be87fe"],["/crypto-watch/bower_components/webcomponentsjs/webcomponents-loader.js","18e2b6703854f7fb9a0abb7e4a905005"],["/crypto-watch/bower_components/webcomponentsjs/webcomponents-sd-ce.js","5207ea7f061239bd7b471e37f25b67f5"],["/crypto-watch/index.html","062574fe292d145e27f50fbf334fdc02"],["/crypto-watch/manifest.json","2a38ee61a7d443cc9d0cf9bba002b5b5"],["/crypto-watch/ui/app/bundle.js","5e9c67394f999b7b621a9014cd80384a"],["/crypto-watch/ui/src/initialize-passphrase.html","c0b55c8bfb9ba1cc5c44f857004f3aa8"],["/crypto-watch/ui/src/lib/app.html","e2fdc7c85971f36ce9e041c0da0ff807"],["/crypto-watch/ui/src/lib/intl.html","2e96949655ae48732e6f589d16967221"],["/crypto-watch/ui/src/lib/redux-mixin.html","9af5bc9dec545b1801de5d8edd0c3928"],["/crypto-watch/ui/src/ui-root.html","8490ba18bec4f402a82b6bc6e5750894"],["/crypto-watch/ui/src/ui-theme.html","cf99d6eba394312352e7b4f2f3bfd28e"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







