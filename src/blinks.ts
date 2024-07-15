import { ActionGetResponse } from "@solana/actions";

export const getDepositAction = (): ActionGetResponse => {
  const icon =
    "https://docs.symmetry.fi/~gitbook/image?url=https%3A%2F%2F3691622348-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FFDffzwxToFrOmEMnt9Pr%252Ficon%252FXzMnubd1k86Jo5xSrgdg%252Fasmf.png%3Falt%3Dmedia%26token%3D6f9159cf-e663-43dc-bdc3-1236d3b4f535&width=32&dpr=2&quality=100&sign=bd9b4298&sv=1";
  const label = "Deposit";
  const title = "Deposit to Symmetry Basket";
  const description =
    "Deposit funds into a Symmetry basket. Choose a preset amount or enter a custom amount.";
  const disabled = false;
  const amountQuery = "amount";

  const links: ActionGetResponse["links"] = {
    actions: [
      {
        label: "$10",
        href: `/deposit?${amountQuery}=10`,
      },
      {
        label: "$100",
        href: `/deposit?${amountQuery}=100`,
      },
      {
        label: "$1,000",
        href: `/deposit?${amountQuery}=1000`,
      },
      {
        label: "Custom Deposit",
        href: `/deposit?${amountQuery}={${amountQuery}}`,
        parameters: [
          {
            name: amountQuery,
            label: "Enter a deposit amount in USD",
          },
        ],
      },
    ],
  };

  const response: ActionGetResponse = {
    icon,
    label,
    title,
    description,
    disabled,
    links,
  };

  return response;
};
