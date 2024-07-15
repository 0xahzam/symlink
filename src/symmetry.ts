import { PublicKey } from "@solana/web3.js";

interface SymmetryTxn {
  success: boolean;
  transaction: string;
}

export async function depositToSymmetryBasket(
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
