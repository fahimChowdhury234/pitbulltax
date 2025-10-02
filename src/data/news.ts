// Simple demo data. Replace with API later if needed.
export type NewsItem = {
  id: number;
  title: string;
  createdAt: string; // ISO or pretty string
  excerpt?: string;
  body: string;      // plain text or HTML string
  unread?: boolean;
};

export const NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Offer in Compromise Forms Updated - April 2025",
    createdAt: "2025-04-24T09:43:00",
    unread: true,
    excerpt:
      "Latest changes to OIC forms for April 2025. Click to view what changed and how it impacts filings.",
    body:
      "Here are the changes to the Offer in Compromise forms released in April 2025...\n\n• New line items for financials\n• Updated instructions for mailing\n• Clarified supporting documents list",
  },
  {
    id: 2,
    title: "Tax Return and Trust Fund Report for Form 941",
    createdAt: "2025-02-04T11:03:00",
    body:
      "A summary of updates to Form 941. Employers should pay attention to the following guidance...",
  },
  {
    id: 3,
    title: "New Revision of Form 843",
    createdAt: "2024-01-17T08:25:00",
    body:
      "The IRS has released a new revision of Form 843. This article explains the main changes...",
  },
  {
    id: 4,
    title: "Offer in Compromise Forms Updated",
    createdAt: "2024-04-09T09:34:00",
    body:
      "General updates to OIC forms including formatting, examples, and links to resources.",
  },
  {
    id: 5,
    title:
      "Forms 2848/8821: Default Pre-sets & Bulk Generation",
    createdAt: "2022-05-05T12:50:00",
    body:
      "We added default pre-sets and bulk generation options for 2848/8821. Here’s how to use them...",
  },
];
