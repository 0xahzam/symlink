import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { getDepositAction } from "./blinks";
import { ActionError } from "@solana/actions";
import { depositToBeyondLstBasket } from "./symmetry";

const app = new Hono();

app.use(logger());

app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Content-Encoding",
      "Accept-Encoding",
    ],
  })
);

app.options("*", (c) => {
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  c.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Encoding, Accept-Encoding"
  );
  return c.text("OK");
});

app.get("/", (c) => {
  const icon =
    "https://image.lexica.art/full_webp/137513ea-76f3-4222-97e2-c323f70619e8";
  const label = "Deposit";
  const title = "Earn upto 21% APY on symmetry.fi 🐳";
  const description =
    "Beyond LST is a basket that contains top performing validator LSTs with highest yield";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <meta name="description" content="${description}">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="${c.req.url}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${icon}">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${c.req.url}">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description}">
        <meta property="twitter:image" content="${icon}">
    </head>
    <body>
        <h1>${title}</h1>
        <p>${description}</p>
    </body>
    </html>
  `;

  return c.html(html);
});

app.get("/actions.json", (c) => {
  return c.json({
    rules: [
      {
        pathPattern: "/**",
        apiPath: "/blinks",
      },
    ],
  });
});

app.get("/blinks", async (c) => {
  try {
    const response = getDepositAction();
    return c.json(response);
  } catch (error) {
    console.error("Error generating deposit action:", error);
    return c.json({ error: "Failed to generate deposit action" }, 500);
  }
});

app.post("/deposit", async (c) => {
  try {
    const amount = c.req.query("amount");
    const body = await c.req.json();
    const account = body.account;

    if (!amount || !account) {
      return c.json({ error: "Missing required parameters" }, 400);
    }

    const tx = await depositToBeyondLstBasket(account, parseFloat(amount));

    if (!tx) {
      return c.json(
        { message: "Failed to generate transaction" } as ActionError,
        400
      );
    }

    return c.json(tx);
  } catch (error) {
    console.error("Error processing Beyond LST deposit request:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default {
  port: 3000,
  fetch: app.fetch,
};
