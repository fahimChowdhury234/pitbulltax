import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { CLIENTS } from "../../data/clients";

type Msg = {
  from: "me" | "them";
  text: string;
  time: string; // e.g. "03:32 PM"
};

export default function SingleSMSChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = useMemo(() => CLIENTS.find((c) => String(c.id) === id), [id]);

  const [messages, setMessages] = useState<Msg[]>([
    { from: "them", text: "SMS test did you receive?", time: "03:32 PM" },
  ]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  function sendMessage() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      {
        from: "me",
        text: trimmed,
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
      <header className="px-4 pt-4 pb-3 bg-white/90 backdrop-blur sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-2">
            <button
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-95"
              onClick={() => navigate(-1)}
              aria-label="Back"
            >
              <ArrowLeft className="w-6 h-6 text-[#0E3561]" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1F66D1] text-white grid place-items-center shadow">
                <UserMini className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="font-extrabold text-[#0E3561] text-[17px]">
                  {client?.name ?? "Unknown Client"}
                </div>
                <div className="text-xs text-slate-500">+1 (954) 223-5455</div>
              </div>
            </div>
          </div>

          <span className="text-[13px] font-bold text-red-500 whitespace-nowrap">
            800 <span className="font-normal text-red-400">SMS Remaining</span>
          </span>
        </div>
      </header>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {/* Example date separator */}
        <DateChip label="March 28, 2025" />

        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} />
        ))}

        <div ref={endRef} />
      </div>

      {/* Composer */}
      <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white px-3 pt-5 pb-3">
        <div className="flex items-start gap-2">
          <button
            type="button"
            className="shrink-0 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            title="Attach"
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
                  sendMessage();
                }
              }}
              rows={1}
              placeholder="Message"
              className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2 leading-6 outline-none text-black focus:ring-2 focus:ring-[#1F66D1]/50"
            />
            <div className="mt-1 text-xs text-slate-400">
              {charsLeft} characters left
            </div>
          </div>

          <button
            onClick={sendMessage}
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

/* ---------- Small components ---------- */

function MessageBubble({ msg }: { msg: Msg }) {
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
    <div className="sticky top-1 flex justify-center py-1">
      <span className="px-3 py-1 text-xs text-slate-500 bg-white/80 border border-slate-200 rounded-full shadow-sm">
        {label}
      </span>
    </div>
  );
}

/* ---------- Inline icons ---------- */
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
function UserMini(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="9" r="4" />
      <path d="M4 21c1.6-4 13.4-4 16 0" />
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
