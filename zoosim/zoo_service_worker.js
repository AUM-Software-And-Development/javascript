console.log("Service worker output:");

let cache_name = "v1";
let cache_objects = [
  "./animals.js",
  "./eventhandlers.js",
  "./functions.js",
  "./index.html",
  "./main.js",
  "./styles.css",
  "./zoo_service_worker.js",
  "./zoos.js",
];

self.addEventListener("install", function (event) {
  console.log("Service worker installed.");
  event.waitUntil(
    caches
      .open(cache_name)
      .then(function (cache) {
        cache.addAll(cache_objects);
        console.log("Index cached.");
      })
      .catch(function (error) {
        console.log("Caching mechanism failed." + error);
      })
  );
});

self.addEventListener("activate", (e) => {
  console.log("Service worker activated.");
  // caches.keys().then((key) => {
  //   key.forEach((key) => {
  //     if (key === "v1") caches.delete(key);
  //   });
  // });
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
