import { ActionGetResponse } from "@solana/actions";

export const getDepositAction = (): ActionGetResponse => {
  const icon =
    "https://image.lexica.art/full_webp/137513ea-76f3-4222-97e2-c323f70619e8";
  const label = "Deposit";
  const title = "Earn upto 21% APY on symmetry.fi 🐳";
  const description =
    "Beyond LST is a basket that contains top performing validator LSTs with highest yield";
  const disabled = false;
  const amountQuery = "depositAmount";

  const links: ActionGetResponse["links"] = {
    actions: [
      {
        label: "0.1 SOL",
        href: `/deposit?amount=0.1`,
      },
      {
        label: "0.5 SOL",
        href: `/deposit?amount=0.5`,
      },
      {
        label: "$1 SOL",
        href: `/deposit?amount=1`,
      },
      {
        label: "Deposit",
        href: `/deposit?amount={${amountQuery}}`,
        parameters: [
          {
            name: amountQuery,
            label: "Enter amount (in SOL)",
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
