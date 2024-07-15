import { ActionGetResponse } from "./types";

const title = "title";
const icon = "boo";
const description = "lalla";
const label = "yo";

const action: ActionGetResponse = {
  title: title,
  icon: icon,
  description: description,
  label: label,
  links: {
    actions: [
      {
        label: "$10",
        href: "/api/buy?amount=10",
      },
      {
        label: "$100",
        href: "/api/buy?amount=100",
      },
      {
        label: "$1,000",
        href: "/api/buy?amount=1000",
      },
      {
        label: "Buy WIF",
        href: "/api/buy?amount={amount}",
        parameters: [
          {
            name: "amount",
            label: "Enter a custom USD amount",
          },
        ],
      },
    ],
  },
};
