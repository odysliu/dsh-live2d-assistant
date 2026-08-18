import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * @module dsh-live2d-assistant
 *
 * Host-side Cordis plugin for the DeepSeek Harness Web surface. It owns the
 * live2d assistant's browser assets and their delivery:
 *
 *   - serves the client script, the spine runtime, and the Service Worker
 *     over explicit webserver routes (so the plugin is self-contained and
 *     does not require touching the frontend dist);
 *   - registers an index.html tap that injects the client script tag.
 *
 * The client script (`assets/bd2-avatar.js`) is a self-contained browser
 * module: it renders a daily-rotating BD2 character (spine), adds hover
 * menus (actions + characters), action switching, and double-click zoom.
 * Character spine assets are fetched from the BD2 L2D Viewer CDN and cached
 * locally by the bundled Service Worker.
 */

/** Stable Cordis plugin name. */
const name = "live2d-assistant";

/** Services required before this plugin can mount. */
const inject = ["webServer"];

/** Read a bundled asset as UTF-8 text (assets live beside lib/ at package root). */
function readAsset(rel) {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

/** Build a minimal node:http route handler serving a fixed text payload. */
function textHandler(content, type) {
  return (req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405);
      res.end();
      return;
    }
    res.writeHead(200, { "content-type": type });
    res.end(req.method === "HEAD" ? undefined : content);
  };
}

const CLIENT_SCRIPT = "/assets/bd2-avatar.js";
const SPINE_RUNTIME = "/assets/vendor/spine-player.min.js";
const SERVICE_WORKER = "/sw.js";

/**
 * Mount the plugin: register the static routes and the index tap.
 * @param ctx - plugin context carrying the webServer service.
 */
function apply(ctx) {
  const webServer = ctx.webServer;

  webServer.register({
    kind: "exact",
    path: CLIENT_SCRIPT,
    handler: textHandler(readAsset("../assets/bd2-avatar.js"), "text/javascript; charset=utf-8")
  });

  webServer.register({
    kind: "exact",
    path: SPINE_RUNTIME,
    handler: textHandler(readAsset("../assets/spine-player.min.js"), "text/javascript; charset=utf-8")
  });

  webServer.register({
    kind: "exact",
    path: SERVICE_WORKER,
    handler: textHandler(readAsset("../assets/sw.js"), "text/javascript; charset=utf-8")
  });

  webServer.tapIndex((html) => {
    if (html.includes(CLIENT_SCRIPT)) return html;
    return html.replace("</body>", `    <script src="${CLIENT_SCRIPT}"></script>\n  </body>`);
  });
}

export { name, inject, apply };
