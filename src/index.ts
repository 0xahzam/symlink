import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["*"],
    exposeHeaders: ["*"],
    maxAge: 86400,
    credentials: true,
  })
);

app.use(logger());

app.get("/", (c) => {
  return c.text("gm!");
});

export default {
  port: 3000,
  fetch: app.fetch,
};
