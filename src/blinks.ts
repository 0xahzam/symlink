import { ActionGetResponse } from "@solana/actions";
import { Hono } from "hono";

const getDepositAction = (): ActionGetResponse => {
  const title = "Deposit to Symmetry Basket";
  const icon =
    "https://docs.symmetry.fi/~gitbook/image?url=https%3A%2F%2F3691622348-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FFDffzwxToFrOmEMnt9Pr%252Ficon%252FXzMnubd1k86Jo5xSrgdg%252Fasmf.png%3Falt%3Dmedia%26token%3D6f9159cf-e663-43dc-bdc3-1236d3b4f535&width=32&dpr=2&quality=100&sign=bd9b4298&sv=1";
  const description =
    "Deposit funds into a Symmetry basket. Choose a preset amount or enter a custom amount.";
  const label = "Deposit";

  const action: ActionGetResponse = {
    title,
    icon,
    description,
    label,
    links: {
      actions: [
        {
          label: "$10",
          href: "/deposit?amount=10",
        },
        {
          label: "$100",
          href: "/deposit?amount=100",
        },
        {
          label: "$1,000",
          href: "/deposit?amount=1000",
        },
        {
          label: "Custom Deposit",
          href: "/deposit?amount={amount}",
          parameters: [
            {
              name: "amount",
              label: "Enter a deposit amount in USD",
            },
          ],
        },
      ],
    },
  };

  return action;
};

const app = new Hono();

app.get("/", async (c) => {
  try {
    return c.json(getDepositAction());
  } catch (error) {
    console.error("Error generating deposit action:", error);
    return c.json({ error: "Failed to generate deposit action" }, 500);
  }
});

export default app;
