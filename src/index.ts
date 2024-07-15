import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { getDepositAction } from "./blinks";
import { depositToSymmetryBasket } from "./symmetry";
import { ActionPostResponse } from "@solana/actions";

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
    const amount: string = c.req.query("amount") as string;

    const { account } = await c.req.json();

    if (account === undefined) {
      console.log(await c.req.json());
      return c.json({ error: "Missing required parameters" }, 400);
    }
    const depositAmount = amount !== undefined ? parseFloat(amount) : 1;

    const basket = "5GPvpZ9Jga9JoZ5eVQms9hQARwexmCjuqDaTxF6LMdsF";
    const transaction = await depositToSymmetryBasket(
      account,
      basket,
      depositAmount
    );

    if (transaction === null || transaction === undefined) {
      return c.json({ error: "Failed to generate transaction" }, 500);
    }

    return c.json(transaction);
  } catch (error) {
    console.error("Error processing deposit request:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default {
  port: 3000,
  fetch: app.fetch,
};
