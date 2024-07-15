import { PublicKey } from "@solana/web3.js";
import { SymmetryTxn } from "./types";

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

(async () => {
  const publicKeyString = "2FJZ49vWsN3LE3tmNsd14DmtSmxNtsr32vsrgKBUv77p";
  const basket = "4RofqKG4d6jfUD2HjtWb2F9UkLJvJ7P3kFmyuhX7H88d";
  const amount = 1;

  const result = await depositToSymmetryBasket(publicKeyString, basket, amount);
  if (result !== null) {
    console.log("Deposit successful:", result);
  } else {
    console.log("Deposit failed");
  }
})();
