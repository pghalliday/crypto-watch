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
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/hodler/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-header-layout/app-header-layout.html","d6da150b240311fe05a0ada9287eb105"],["bower_components/app-layout/app-header/app-header.html","922a8661d7f61f66ae77cb623e87ea5b"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","d4113c4350da36b7c26b09e1f527e255"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","afd8a3998d2928718d4107b59d45b2ce"],["bower_components/app-layout/app-toolbar/app-toolbar.html","5f67aea4a70b83d62357070a53e79b1a"],["bower_components/app-layout/helpers/helpers.html","ed3bdc746c9680011cf9911d8608975a"],["bower_components/app-localize-behavior/app-localize-behavior.html","a329f731db2241780bd0949dd5ba9139"],["bower_components/font-roboto/roboto.html","22fe760d42278ca3b2b3718390fbb1bd"],["bower_components/intl-messageformat/dist/intl-messageformat.min.js","51b67920a4b58bea399834222cd962ef"],["bower_components/intl/dist/Intl.js","08d58a592ca99da03815b94a1d983c58"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","ae4b16e04c9c8254de6d4981a1fc0a3a"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","638546ad88c0dc64ba51f2338c62f90a"],["bower_components/iron-ajax/iron-ajax.html","3eecf0c54f795f7df3e4da054cdf4b5d"],["bower_components/iron-ajax/iron-request.html","8053a74476d24ae2c4ab7ccabc672a79"],["bower_components/iron-behaviors/iron-button-state.html","37ebe387dd76be09732b6ba4d729a4cf"],["bower_components/iron-behaviors/iron-control-state.html","ef7349adfa52a0534aa29f3651ed041b"],["bower_components/iron-flex-layout/iron-flex-layout-classes.html","18d233106c65817145c05368e0bec0c1"],["bower_components/iron-flex-layout/iron-flex-layout.html","e2784155f5abdeb2f03998199f182a73"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","b01c564985afe597f3eae64241eeec15"],["bower_components/iron-image/iron-image.html","acc61b6e3d56bec031e751dfee8af96f"],["bower_components/iron-input/iron-input.html","a656672c7ab1946f720ffc6e7e2418a4"],["bower_components/iron-meta/iron-meta.html","17a804b684751f78cc3730260e843ff3"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","385b8b06b7245818ac941836a6e82093"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","b6049c1ea7a3ba24bacab937a036b47e"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","277a7e1184b7c4f50d4351679bba2759"],["bower_components/paper-behaviors/paper-button-behavior.html","b37febacd821c5ff28b0e5764d8b2937"],["bower_components/paper-behaviors/paper-ripple-behavior.html","39a22833854e425fa057252b33931b00"],["bower_components/paper-button/paper-button.html","6a935e67a38ef16ad9bafac157a7eb16"],["bower_components/paper-card/paper-card.html","c12b61712f34d37268bcb8bc3752aa44"],["bower_components/paper-input/paper-input-addon-behavior.html","e1e4ca850180ff67335cfcf82cdfa66c"],["bower_components/paper-input/paper-input-behavior.html","6729810d1a8716f9e458e352a2a7b82b"],["bower_components/paper-input/paper-input-char-counter.html","d6409962d0daaa6a89b1e69e3cda627c"],["bower_components/paper-input/paper-input-container.html","3c6c6b1e5e0107aa34755afb128c9952"],["bower_components/paper-input/paper-input-error.html","eac3d9819347be3b60d0f77f7af25087"],["bower_components/paper-input/paper-input.html","7ccb46a8eb7e543012d0e624fd29a7f4"],["bower_components/paper-ripple/paper-ripple.html","17c03afde19e51b6eba32c7ac58abe1c"],["bower_components/paper-spinner/paper-spinner-behavior.html","7564bd3692068d7f8d0316916472afbc"],["bower_components/paper-spinner/paper-spinner-lite.html","395ffc15a83ceabc089740c0cac979fa"],["bower_components/paper-spinner/paper-spinner-styles.html","7a7e3975c31540dd209e69d7b9cb7ac0"],["bower_components/paper-styles/color.html","0bee1212eacd6ea7fcc0c2e6211a9d52"],["bower_components/paper-styles/default-theme.html","e69931aff30bfe4671f0621ce4d52b9c"],["bower_components/paper-styles/element-styles/paper-material-styles.html","7fa473750d47f8cceac27f745711fb81"],["bower_components/paper-styles/shadow.html","0e0a41589c15fa772391a5f9bf5487de"],["bower_components/paper-styles/typography.html","37d88a94cb474c18a7451d9dc657a378"],["bower_components/polymer-redux/dist/polymer-redux.html","6c6f6d8f8d7745c05311899d1d2b8c34"],["bower_components/polymer-redux/polymer-redux.html","ec8326f447d29f97c92ce71aaed2b8ba"],["bower_components/polymer/lib/elements/array-selector.html","293567a494cbecd613948de54a7fe18a"],["bower_components/polymer/lib/elements/custom-style.html","02791e608e2446c6a323a2cbc2677e71"],["bower_components/polymer/lib/elements/dom-bind.html","3e3b63dc650aabe575cd025ebf44a8e2"],["bower_components/polymer/lib/elements/dom-if.html","3ae6a7200c70ea7995b865de3fe65ae1"],["bower_components/polymer/lib/elements/dom-module.html","ae47be4e18cccb1e2b23aae3239f95fb"],["bower_components/polymer/lib/elements/dom-repeat.html","0193d0e9497f1223806ec965ea96737b"],["bower_components/polymer/lib/legacy/class.html","12cbddaeafd1d49b0446980580130999"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","e690f4f85dd88bc2de998611863663f2"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","03728c6d1b60e205b8cf0ced8268e22c"],["bower_components/polymer/lib/legacy/polymer-fn.html","4a09ba23e2974fabfdb181b879778211"],["bower_components/polymer/lib/legacy/polymer.dom.html","ed46d392400d5c65f91356769ccbf7b4"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","6c777176966bbdbd0446cf14a965347b"],["bower_components/polymer/lib/mixins/element-mixin.html","89bf71e6ed23dda179df4b57b4dbd19e"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","cdca7602a260dd65f2b57c8d65cbfdd6"],["bower_components/polymer/lib/mixins/mutable-data.html","8c1e26e33648f43682083d5e3faad842"],["bower_components/polymer/lib/mixins/property-accessors.html","edb10cc1c4bdb96996ada243bfe3dbb5"],["bower_components/polymer/lib/mixins/property-effects.html","c2b7d03237f7a5116dcde636cd64d2a2"],["bower_components/polymer/lib/mixins/template-stamp.html","ae60b662e1cad59590b204eb5a56da48"],["bower_components/polymer/lib/utils/array-splice.html","42d8507f46ff54d9a23ddf867b99e230"],["bower_components/polymer/lib/utils/async.html","4e3ea50edfd1d11e9a37b5a6cf74ae60"],["bower_components/polymer/lib/utils/boot.html","15dc407179ea24a28a745e2b9b9f4892"],["bower_components/polymer/lib/utils/case-map.html","f14ac33b1b03ea65770d8f4d43658c87"],["bower_components/polymer/lib/utils/debounce.html","9106183685363b5cfd611ca1c4a56f34"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","a06d3930338b24a30b3bb808e930ede3"],["bower_components/polymer/lib/utils/flush.html","57825ceb4ce6a79aceec4c694c15c43d"],["bower_components/polymer/lib/utils/gestures.html","2d57ab314f9ef8b2a7a31ed41d41a498"],["bower_components/polymer/lib/utils/import-href.html","f382c443702554ec815eafa974f0dd0a"],["bower_components/polymer/lib/utils/mixin.html","e0869e5b0ee1334968e23bfabc569dc9"],["bower_components/polymer/lib/utils/path.html","660d2968130a880af0f34de7f0ad848c"],["bower_components/polymer/lib/utils/render-status.html","800cd03d3735c453e019e6b35b0c9721"],["bower_components/polymer/lib/utils/resolve-url.html","47191e0c93f758d8a1ce84c528a55f8f"],["bower_components/polymer/lib/utils/style-gather.html","28db59336532fcf3e9ff0eac4a93879c"],["bower_components/polymer/lib/utils/templatize.html","310e1fca5c7a642ccc8be12640c15e94"],["bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["bower_components/polymer/polymer-element.html","7b4e0d287a6fe066a9fcd472ae2055d9"],["bower_components/polymer/polymer.html","06fac75a2cb45d455be9f34dfe248800"],["bower_components/shadycss/apply-shim.html","e77c26755ebd590793dfd33295c90f4d"],["bower_components/shadycss/apply-shim.min.js","985834a8133da3bf5ef839002604a080"],["bower_components/shadycss/custom-style-interface.html","5bfbeb127a043a9adba50edd885945ee"],["bower_components/shadycss/custom-style-interface.min.js","eb89d3862a054d45bdd7c0a009f0a98c"],["bower_components/webcomponentsjs/custom-elements-es5-adapter.js","e6324a1b9a6f7dbac892a472464088db"],["bower_components/webcomponentsjs/gulpfile.js","5b9593e6c3a2a87a866c1169114c745e"],["bower_components/webcomponentsjs/webcomponents-hi-ce.js","495de81020abfefd4f0e3dcff6b7fd3e"],["bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","68bc22bcb5543e6caabd1d66dc9e1ca9"],["bower_components/webcomponentsjs/webcomponents-hi.js","0ac538bae69f6beb629d2357350041e7"],["bower_components/webcomponentsjs/webcomponents-lite.js","c89f66cb63a098895f4b1b42eb371673"],["bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["bower_components/webcomponentsjs/webcomponents-sd-ce.js","c5f6fe397db634cde89f66c2f1bc2f62"],["index.html","10bc151bfaf4bf2a1c95adaac04df929"],["locales.json","a197ec1cc20e9e5154fa0aae9a1bad18"],["manifest.json","4228f2bd98240c3f758633abc9e4e440"],["ui/app/bundle.js","f4b0dd6cbacfb3b436d101172dac8690"],["ui/src/create/create-container.html","7ac5c6428ca565faa41ec406d5ac1463"],["ui/src/create/create-view.html","fbb1d93b66a54b3f67c8eaa74585aced"],["ui/src/initialize-error.html","5de4beb6bf6dcc15c35b76a751fb0514"],["ui/src/initialize-pending.html","ffa24750faed43adb331872add296818"],["ui/src/lib/app.html","d1a7248e5726febaa9961bd95fd8dec9"],["ui/src/lib/intl.html","ee744b13198b01d317b6ec9a050c683d"],["ui/src/lib/redux-mixin.html","b8354a18ca3c7f4bfbf5ac805ad8f122"],["ui/src/main/main-view.html","51353b385a96b3b0722a3b3c98a84969"],["ui/src/ui-root.html","bd7f630f108aac14be80a298cb1ef624"],["ui/src/ui-theme.html","8af1839bdf3200fd271fd2eb047291d7"],["ui/src/unlock/unlock-container.html","ffcb0ca7ba8b32668a1a0a43aaf344c0"],["ui/src/unlock/unlock-view.html","d73399084bec981859f8e12a0eef37d5"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
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
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

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
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
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

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
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
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
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







