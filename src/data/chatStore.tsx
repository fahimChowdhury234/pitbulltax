import { createContext, useContext, useMemo, useState } from "react";
import {
  CHAT_MESSAGES,
  CHAT_PRESENCE,
  ChatMessage,
  FileAttachment,
} from "../data/chat";

type ChatCtx = {
  messagesByClient(id: number): ChatMessage[];
  send(id: number, text: string, attachments?: FileAttachment[]): void;
  edit(messageId: string, text: string): void;
  remove(messageId: string): void;
  presenceByClient(id: number): { online: boolean; unread: number };
  markRead(id: number): void;
};

const Ctx = createContext<ChatCtx>(null as any);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [presence, setPresence] = useState(CHAT_PRESENCE);

  const api: ChatCtx = useMemo(
    () => ({
      messagesByClient: (clientId) =>
        messages
          .filter((m) => m.clientId === clientId)
          .sort((a, b) => a.sentAt.localeCompare(b.sentAt)),
      send: (clientId, text, attachments) =>
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            clientId,
            from: "me",
            text,
            sentAt: new Date().toISOString(),
            attachments: attachments || [],
          },
        ]),
      edit: (messageId, text) =>
        setMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...m, text } : m))
        ),
      remove: (messageId) =>
        setMessages((prev) => prev.filter((m) => m.id !== messageId)),
      presenceByClient: (clientId) =>
        presence.find((p) => p.clientId === clientId) ?? {
          online: false,
          unread: 0,
        },
      markRead: (clientId) =>
        setPresence((prev) =>
          prev.map((p) => (p.clientId === clientId ? { ...p, unread: 0 } : p))
        ),
    }),
    [messages, presence]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
export const useChat = () => useContext(Ctx);
