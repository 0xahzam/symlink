import { PublicKey } from "@solana/web3.js";
import { SymmetryTxn } from "./types";
import { Hono } from "hono";

async function depositToSymmetryBasket(
  publicKeyString: string,
  basket: string,
  amount: number
): Promise<string | null> {
  try {
    const publicKey = new PublicKey(publicKeyString);
    const depositParameters = {
      user: publicKey.toBase58(),
      basket: basket,
      amount: amount,
    };

    const request = await fetch("https://api.symmetry.fi/baskets/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(depositParameters),
    });

    if (!request.ok) {
      throw new Error("Network response was not ok");
    }

    let response: SymmetryTxn = (await request.json()) as SymmetryTxn;
    return response.transaction;
  } catch (error) {
    console.error("Failed to deposit to Symmetry Basket:", error);
    return null;
  }
}

const app = new Hono();

app.post("/", async (c) => {
  try {
    const { publicKey, basket, amount } = await c.req.json();

    if (!publicKey || !basket || amount === undefined) {
      return c.json({ error: "Missing required parameters" }, 400);
    }

    const transaction = await depositToSymmetryBasket(
      publicKey,
      basket,
      amount
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

export default app;
