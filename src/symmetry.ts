import { ActionPostResponse } from "@solana/actions";
import { PublicKey } from "@solana/web3.js";

interface SymmetryTxn {
  success: boolean;
  transaction: string;
}

export async function depositToBeyondLstBasket(
  publicKeyString: string,
  amount: number
): Promise<ActionPostResponse | null> {
  try {
    const publicKey = new PublicKey(publicKeyString);
    const onCurve = PublicKey.isOnCurve(publicKey);

    if (!onCurve) {
      console.error("Public key is invalid");
      return null;
    }

    const lstBasket = "5GPvpZ9Jga9JoZ5eVQms9hQARwexmCjuqDaTxF6LMdsF";
    const sol = "So11111111111111111111111111111111111111112";

    const depositParameters = {
      user: publicKey.toBase58(),
      basket: lstBasket,
      tokenMint: sol,
      amount: amount,
    };

    let request = await fetch("https://api.symmetry.fi/baskets/mint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(depositParameters),
    });

    if (!request.ok) {
      console.error("Failed to deposit to Symmetry Basket");
      return null;
    }

    let response: SymmetryTxn = (await request.json()) as SymmetryTxn;

    if (!response.success) return null;

    const actionResponse: ActionPostResponse = {
      transaction: response.transaction,
      message: "Successfully deposited in basket",
    };

    return actionResponse;
  } catch (error) {
    console.error("Failed to deposit to Symmetry Basket:", error);
    return null;
  }
}
