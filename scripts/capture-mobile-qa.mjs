import fs from "node:fs/promises";
import WebSocket from "ws";

const [, , url, outputPath, widthArg = "390", heightArg = "736"] = process.argv;
const width = Number(widthArg);
const height = Number(heightArg);

if (!url || !outputPath) {
  throw new Error("Usage: node capture-mobile-qa.mjs <url> <output> [width] [height]");
}

const target = await fetch(
  `http://127.0.0.1:9222/json/new?${encodeURIComponent(url)}`,
  { method: "PUT" },
).then((response) => response.json());

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.once("open", resolve);
  socket.once("error", reject);
});

let nextId = 0;
const pending = new Map();
socket.on("message", (raw) => {
  const message = JSON.parse(raw.toString());
  if (!message.id) return;
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});

function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 640,
  screenWidth: width,
  screenHeight: height,
});

const initialLoad = new Promise((resolve) => {
  const onMessage = (raw) => {
    const message = JSON.parse(raw.toString());
    if (message.method === "Page.loadEventFired") {
      socket.off("message", onMessage);
      resolve();
    }
  };
  socket.on("message", onMessage);
});
await send("Page.navigate", { url });
await initialLoad;
await send("Runtime.evaluate", {
  expression: `localStorage.setItem("fac-cookie-consent", "declined")`,
});

const loaded = new Promise((resolve) => {
  const onMessage = (raw) => {
    const message = JSON.parse(raw.toString());
    if (message.method === "Page.loadEventFired") {
      socket.off("message", onMessage);
      resolve();
    }
  };
  socket.on("message", onMessage);
});
await send("Page.reload");
await loaded;
await new Promise((resolve) => setTimeout(resolve, 1500));
await send("Runtime.evaluate", {
  expression: `document.querySelector('[role="dialog"]')?.remove()`,
});
await new Promise((resolve) => setTimeout(resolve, 250));

const screenshot = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});
await fs.writeFile(outputPath, Buffer.from(screenshot.data, "base64"));
socket.close();
