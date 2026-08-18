/* BD2 角色 spine 资源本地缓存 Service Worker
 * 拦截 jelosus2.github.io 的角色资源请求：命中缓存直接返回，未命中则下载并缓存。
 * 首次加载过的角色之后切换/刷新均不再走网络。 */
var CACHE = 'bd2-spine-v1';
var HOST = 'jelosus2.github.io';
var MARK = '/assets/spines/';

self.addEventListener('install', function (e) {
  self.skipWaiting();
});
self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function (e) {
  var url = e.request.url;
  if (url.indexOf(HOST) !== -1 && url.indexOf(MARK) !== -1) {
    e.respondWith(
      caches.open(CACHE).then(function (cache) {
        return cache.match(e.request).then(function (hit) {
          if (hit) return hit;
          return fetch(e.request).then(function (res) {
            if (res && res.ok) cache.put(e.request, res.clone());
            return res;
          }).catch(function () {
            return new Response('', { status: 504, statusText: 'offline' });
          });
        });
      })
    );
  }
});
