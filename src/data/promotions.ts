export type PromotionItem = {
  id: number;
  title: string;
  createdAt: string; // ISO or pretty string
  body: string;
  expiresAt?: string; // optional expiry date
  unread?: boolean;
};

export const PROMOTIONS: PromotionItem[] = [
  {
    id: 1,
    title: "Register Today for Our August 28-29 PitBullax Intermediate Workshop!",
    createdAt: "2029-07-28T09:39:00",
    unread: true,
    body:
      "Join us for our Intermediate Workshop on August 28-29. This promotion covers topics like ...",
    expiresAt: "2029-08-30T00:00:00",
  },
  {
    id: 2,
    title: "Introducing PitBullTax Memberships – Zero Liabilities, Total Domination",
    createdAt: "2025-07-21T11:20:00",
    unread: true,
    body:
      "We are excited to announce new PitBullTax Membership plans offering zero liabilities ...",
    expiresAt: "2026-07-21T00:00:00",
  },
];
