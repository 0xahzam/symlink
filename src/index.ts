import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { getDepositAction } from "./blinks";
import { depositToSymmetryBasket } from "./symmetry";

const app = new Hono();
app.use(logger());

app.use(cors({ origin: "*" }));

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
    const { account, amount } = await c.req.json();

    if (account === undefined) {
      console.log(await c.req.json());
      return c.json({ error: "Missing required parameters" }, 400);
    }
    const depositAmount = amount !== undefined ? amount : 1;

    const basket = "4RofqKG4d6jfUD2HjtWb2F9UkLJvJ7P3kFmyuhX7H88d";
    const transaction = await depositToSymmetryBasket(
      account,
      basket,
      depositAmount
    );
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
