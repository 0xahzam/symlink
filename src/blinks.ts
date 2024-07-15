import { ActionGetResponse } from "@solana/actions";

export const getDepositAction = (): ActionGetResponse => {
  const icon =
    "https://image.lexica.art/full_webp/137513ea-76f3-4222-97e2-c323f70619e8";
  const label = "Deposit";
  const title = "Earn upto 21% APY on symmetry.fi 🐳";
  const description =
    "Beyond LST is a basket that contains top performing validator LSTs with highest yield";
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
