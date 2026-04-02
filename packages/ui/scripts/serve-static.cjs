const http = require("http")
const fs = require("fs")
const path = require("path")

const base = path.resolve(__dirname, "..", "storybook-static")
const port = Number(process.env.PORT || 6006)

const mime = {
  ".css": "text/css",
  ".gif": "image/gif",
  ".html": "text/html",
  ".jpg": "image/jpeg",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
}

http
  .createServer((req, res) => {
    let reqPath = decodeURIComponent((req.url || "/").split("?")[0])
    if (reqPath === "/") {
      reqPath = "/index.html"
    }

    let filePath = path.join(base, reqPath)
    if (!filePath.startsWith(base)) {
      res.statusCode = 403
      res.end("Forbidden")
      return
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html")
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.statusCode = 404
        res.end("Not found")
        return
      }

      res.setHeader(
        "Content-Type",
        mime[path.extname(filePath)] || "application/octet-stream"
      )
      res.end(data)
    })
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`serving ${base} on ${port}`)
  })
