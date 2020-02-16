const staticTodo = "todo-pwa-js-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/font-awesome.css",
  "/fonts/FontAwesome.otf",
  "/fonts/fontawesome-webfont.eot",
  "/fonts/fontawesome-webfont.svg",
  "/fonts/fontawesome-webfont.ttf",
  "/fonts/fontawesome-webfont.woff",
  "/fonts/fontawesome-webfont.woff2",
  "/js/app.js",
  "/img/bg2.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticTodo).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })