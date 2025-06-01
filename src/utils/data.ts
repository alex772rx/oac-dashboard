import { createListCollection } from "@chakra-ui/react";

export const implantsType = [
  { label: "All", value: "" },
  { label: "SS", value: "SS" },
  { label: "TITANIUM", value: "TITANIUM" },
];

export const assigned = createListCollection({
  items: [
    { label: "All Assigned", value: "" },
    { label: "Santosh", value: "Santosh" },
    { label: "Shiva", value: "Shiva" },
    { label: "Neither", value: "Neither" },
  ],
});

export const implantsTypeCollection = createListCollection({
  items: [
    { label: "SS", value: "SS" },
    { label: "TITANIUM", value: "TITANIUM" },
  ],
});
