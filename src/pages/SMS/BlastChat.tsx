import { useMemo, useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

/** Same source as BlastList (or load by id) */
const GROUPS = [
  { id: "cq", name: "CQ Group", participants: 10 },
  { id: "updates", name: "Updates Group", participants: 10 },
  { id: "promo", name: "Promo Group", participants: 10 },
];

type ChatMsg = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string; // "03:32 PM"
};

export default function BlastChat() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();

  const group = useMemo(() => GROUPS.find((g) => g.id === groupId), [groupId]);

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: "m1",
      from: "them",
      text: "SMS test — did you receive?",
      time: "03:32 PM",
    },
  ]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  function send() {
    const t = text.trim();
    if (!t) return;
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        from: "me",
        text: t,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setText("");
  }

  const charsLeft = 160 - text.length;
  const canSend = text.trim().length > 0;

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col bg-slate-50 rounded-md overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur px-4 pt-4 pb-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-[#0E3561]" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1F66D1] text-white grid place-items-center shadow">
              <GroupIcon className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="text-[17px] font-extrabold text-[#0E3561]">
                {group?.name ?? "Group"}
              </div>
              <div className="text-xs text-slate-500">
                {group?.participants ?? 0} participants
              </div>
            </div>
          </div>
          </div>

          <span className="text-[13px] font-bold text-red-500 whitespace-nowrap">
            800 <span className="font-normal text-red-400">SMS Remaining</span>
          </span>
        </div>
      </header>

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <DateChip label="March 28, 2025" />
        <div className="space-y-3">
          {messages.map((m) => (
            <MessageBubble key={m.id} msg={m} />
          ))}
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white px-3 pt-5 pb-3">
        <div className="flex items-start gap-2">
          <button
            type="button"
            title="Attach"
            className="shrink-0 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 160))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Message"
              className="w-full resize-none rounded-lg  text-black border border-slate-200 px-4 py-2 leading-6 outline-none focus:ring-2 focus:ring-[#1F66D1]/50"
            />
            <div className="mt-1 text-xs text-slate-400">
              {charsLeft} characters left
            </div>
          </div>

          <button
            onClick={send}
            disabled={!canSend}
            className={
              "shrink-0 px-4 py-2 rounded-2xl font-semibold text-white transition " +
              (canSend
                ? "bg-[#1F66D1] hover:brightness-110 active:scale-95"
                : "bg-slate-300 cursor-not-allowed")
            }
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- small components ---------------- */

function MessageBubble({ msg }: { msg: ChatMsg }) {
  const isMe = msg.from === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={
          "max-w-[78%] rounded-2xl px-3 py-2 shadow " +
          (isMe
            ? "bg-[#E7F0FF] text-slate-900 rounded-br-sm"
            : "bg-white text-slate-900 rounded-bl-sm")
        }
      >
        <div className="text-[15px]">{msg.text}</div>
        <div className="mt-0.5 text-[11px] text-slate-500 text-right">
          {msg.time}
        </div>
      </div>
    </div>
  );
}

function DateChip({ label }: { label: string }) {
  return (
    <div className="sticky top-1 z-0 flex justify-center py-1">
      <span className="px-3 py-1 text-xs text-slate-500 bg-white/80 border border-slate-200 rounded-full shadow-sm">
        {label}
      </span>
    </div>
  );
}

/* ---------------- inline icons ---------------- */
function ArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M15 18l-6-6 6-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function GroupIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm-7.5 7a6 6 0 0 1 12 0H4.5Z" />
      <path d="M17 10a2 2 0 1 0-2-2 2 2 0 0 0 2 2Zm2.5 9a5.5 5.5 0 0 0-4.2-5.33 7.49 7.49 0 0 1 4.2 5.33Z" />
    </svg>
  );
}
function Paperclip(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M21 12.5V7a5 5 0 10-10 0v10a3 3 0 006 0V9"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
