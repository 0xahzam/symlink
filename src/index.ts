import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { getDepositAction } from "./blinks";
import { depositToSymmetryBasket } from "./symmetry";

const app = new Hono();
app.use("*", cors());
app.use(logger());

app.get("/", (c) => {
  return c.text("gm!");
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
    const { sender, amount } = await c.req.json();

    const basket = "4RofqKG4d6jfUD2HjtWb2F9UkLJvJ7P3kFmyuhX7H88d";

    if (!sender || !basket || amount === undefined) {
      return c.json({ error: "Missing required parameters" }, 400);
    }

    const transaction = await depositToSymmetryBasket(sender, basket, amount);

    if (transaction === null) {
      return c.json({ error: "Failed to generate transaction" }, 500);
    }

    return c.json({ transaction });
  } catch (error) {
    console.error("Error processing deposit request:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default {
  port: 3000,
  fetch: app.fetch,
};
