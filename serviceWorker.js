const staticTodo = "todo-pwa-js-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/img/backdrop.jpg",
  "/img/icons/plus.png",
  "/img/icons/trash.png",
  "/js/app.js",
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