export type FileAttachment = {
  id: string;
  name: string;
  size: number;
  type: "image" | "document" | "other";
  url?: string;
};

export type ChatMessage = {
  id: string;
  clientId: number;
  from: "me" | "them";
  text: string;
  sentAt: string; // ISO
  attachments?: FileAttachment[];
};

export type ChatPresence = {
  clientId: number;
  online: boolean;
  unread: number;
};

export const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    clientId: 1,
    from: "me",
    text: "Good morning Adrian! I just sent you the form 8821",
    sentAt: "2025-07-29T07:45:00",
  },
  {
    id: "m2",
    clientId: 1,
    from: "them",
    text: "Good morning Joe! Let me check",
    sentAt: "2025-07-29T07:47:00",
  },
  {
    id: "m3",
    clientId: 1,
    from: "me",
    text: "Here are the documents you requested",
    sentAt: "2025-07-29T08:15:00",
    attachments: [
      {
        id: "att1",
        name: "tax-form-8821.pdf",
        size: 245760,
        type: "document",
        url: "#",
      },
      {
        id: "att2",
        name: "receipts.jpg",
        size: 1024000,
        type: "image",
        url: "#",
      },
    ],
  },
  {
    id: "m4",
    clientId: 1,
    from: "them",
    text: "Perfect! I can see the documents clearly. Thank you!",
    sentAt: "2025-07-29T08:17:00",
  },
];

export const CHAT_PRESENCE: ChatPresence[] = [
  { clientId: 1, online: true, unread: 1 },
  { clientId: 2, online: false, unread: 0 },
  { clientId: 3, online: false, unread: 0 },
  { clientId: 4, online: false, unread: 0 },
  { clientId: 5, online: false, unread: 0 },
  { clientId: 6, online: false, unread: 0 },
  { clientId: 7, online: false, unread: 0 },
];
