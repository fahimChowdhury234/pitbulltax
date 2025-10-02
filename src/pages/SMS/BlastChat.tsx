import { useMemo, useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

/** Same source as BlastList (or load by id) */
const GROUPS = [
  { id: "cq", name: "CQ Group", participants: 10 },
  { id: "updates", name: "Updates Group", participants: 10 },
  { id: "promo", name: "Promo Group", participants: 10 },
];

type FileAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status: "uploading" | "uploaded" | "failed";
};

type ChatMsg = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string; // "03:32 PM"
  files?: FileAttachment[];
  status?: "sending" | "sent" | "delivered" | "failed";
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
      status: "delivered",
    },
  ]);
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  // Simulate typing indicator
  useEffect(() => {
    if (text.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [text]);

  function send() {
    const t = text.trim();
    if (!t && attachments.length === 0) return;

    const newMessage: ChatMsg = {
      id: String(Date.now()),
      from: "me",
      text: t,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      files: attachments.length > 0 ? [...attachments] : undefined,
      status: "sending",
    };

    setMessages((prev) => [...prev, newMessage]);
    setText("");
    setAttachments([]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "sent" as const } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id
            ? { ...msg, status: "delivered" as const }
            : msg
        )
      );
    }, 2000);
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const attachment: FileAttachment = {
        id: String(Date.now() + Math.random()),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
      };

      setAttachments((prev) => [...prev, attachment]);

      // Simulate file upload
      setTimeout(() => {
        setAttachments((prev) =>
          prev.map((att) =>
            att.id === attachment.id
              ? {
                  ...att,
                  status: "uploaded" as const,
                  url: URL.createObjectURL(file),
                }
              : att
          )
        );
      }, 1500);
    });
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const fileArray = Array.from(files);
      fileArray.forEach((file) => {
        const attachment: FileAttachment = {
          id: String(Date.now() + Math.random()),
          name: file.name,
          size: file.size,
          type: file.type,
          status: "uploading",
        };

        setAttachments((prev) => [...prev, attachment]);

        // Simulate file upload
        setTimeout(() => {
          setAttachments((prev) =>
            prev.map((att) =>
              att.id === attachment.id
                ? {
                    ...att,
                    status: "uploaded" as const,
                    url: URL.createObjectURL(file),
                  }
                : att
            )
          );
        }, 1500);
      });
    }
  }

  const charsLeft = 160 - text.length;
  const canSend = text.trim().length > 0 || attachments.length > 0;

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 pt-4 pb-4 shadow-lg border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="p-2 -ml-2 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-[#0E3561]" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1F66D1] to-[#0E3561] text-white grid place-items-center shadow-lg">
                <GroupIcon className="w-6 h-6" />
              </div>
              <div className="leading-tight">
                <div className="text-xl font-bold text-[#0E3561]">
                  {group?.name ?? "Group"}
                </div>
                <div className="text-sm text-slate-500 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {group?.participants ?? 0} participants
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-bold text-red-500">
                800 SMS Remaining
              </div>
              <div className="text-xs text-slate-500">Credits</div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white grid place-items-center shadow-lg">
              <SmsIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Chat body */}
      <div
        className={`flex-1 overflow-y-auto px-6 py-4 transition-colors duration-200 ${
          isDragOver ? "bg-blue-50" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <DateChip label="March 28, 2025" />
        <div className="space-y-4">
          {messages.map((m) => (
            <MessageBubble key={m.id} msg={m} />
          ))}
        </div>

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-200">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* File attachments preview */}
      {attachments.length > 0 && (
        <div className="px-6 py-3 bg-white border-t border-slate-200">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file) => (
              <FilePreview
                key={file.id}
                file={file}
                onRemove={() => removeAttachment(file.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white px-6 pt-4 pb-4">
        <div className="flex items-end gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Attach files"
            className="shrink-0 p-3 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-600 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1">
            <div className="relative">
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
                placeholder="Type your message..."
                className="w-full resize-none rounded-2xl text-black border-2 border-slate-200 px-4 py-3 leading-6 outline-none focus:border-[#1F66D1] focus:ring-2 focus:ring-[#1F66D1]/20 transition-all duration-200 shadow-sm"
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
              <div className="absolute bottom-2 right-3 text-xs text-slate-400">
                {charsLeft}
              </div>
            </div>
          </div>

          <button
            onClick={send}
            disabled={!canSend}
            className={`shrink-0 px-6 py-3 rounded-2xl font-bold text-white transition-all duration-200 shadow-lg ${
              canSend
                ? "bg-gradient-to-r from-[#1F66D1] to-[#0E3561] hover:shadow-xl hover:scale-105 active:scale-95"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
        />
      </div>
    </div>
  );
}

/* ---------------- small components ---------------- */

function MessageBubble({ msg }: { msg: ChatMsg }) {
  const isMe = msg.from === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} group`}>
      <div className="max-w-[85%]">
        <div
          className={`rounded-3xl px-4 py-3 shadow-lg ${
            isMe
              ? "bg-gradient-to-br from-[#1F66D1] to-[#0E3561] text-white rounded-br-lg"
              : "bg-white text-slate-900 rounded-bl-lg border border-slate-200"
          }`}
        >
          {/* Message text */}
          {msg.text && (
            <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
              {msg.text}
            </div>
          )}

          {/* File attachments */}
          {msg.files && msg.files.length > 0 && (
            <div className="mt-2 space-y-2">
              {msg.files.map((file) => (
                <FileAttachment key={file.id} file={file} isMe={isMe} />
              ))}
            </div>
          )}

          {/* Message footer */}
          <div className="flex items-center justify-between mt-2">
            <div
              className={`text-xs ${isMe ? "text-blue-100" : "text-slate-500"}`}
            >
              {msg.time}
            </div>
            {isMe && msg.status && (
              <div className="ml-2">
                <MessageStatus status={msg.status} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DateChip({ label }: { label: string }) {
  return (
    <div className="sticky top-1 z-0 flex justify-center py-2">
      <span className="px-4 py-2 text-sm text-slate-500 bg-white/90 border border-slate-200 rounded-2xl shadow-sm backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}

function FilePreview({
  file,
  onRemove,
}: {
  file: FileAttachment;
  onRemove: () => void;
}) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 border border-slate-200">
      <FileIcon className="w-4 h-4 text-slate-500" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-700 truncate">
          {file.name}
        </div>
        <div className="text-xs text-slate-500">
          {formatFileSize(file.size)}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {file.status === "uploading" && (
          <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
        )}
        {file.status === "uploaded" && (
          <CheckIcon className="w-4 h-4 text-green-500" />
        )}
        {file.status === "failed" && <XIcon className="w-4 h-4 text-red-500" />}
        <button
          onClick={onRemove}
          className="p-1 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <XIcon className="w-3 h-3 text-slate-500" />
        </button>
      </div>
    </div>
  );
}

function FileAttachment({
  file,
  isMe,
}: {
  file: FileAttachment;
  isMe: boolean;
}) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const isAudio = file.type.startsWith("audio/");

  return (
    <div
      className={`rounded-xl border-2 border-dashed p-3 ${
        isMe ? "border-blue-200 bg-blue-50/50" : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isMe ? "bg-blue-100" : "bg-slate-100"
          }`}
        >
          {isImage ? (
            <ImageIcon className="w-5 h-5 text-blue-600" />
          ) : isVideo ? (
            <VideoIcon className="w-5 h-5 text-blue-600" />
          ) : isAudio ? (
            <AudioIcon className="w-5 h-5 text-blue-600" />
          ) : (
            <FileIcon className="w-5 h-5 text-blue-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm font-medium truncate ${
              isMe ? "text-blue-900" : "text-slate-700"
            }`}
          >
            {file.name}
          </div>
          <div
            className={`text-xs ${isMe ? "text-blue-600" : "text-slate-500"}`}
          >
            {formatFileSize(file.size)}
          </div>
        </div>
        {file.status === "uploaded" && (
          <button className="p-1 hover:bg-white/50 rounded-lg transition-colors">
            <DownloadIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function MessageStatus({
  status,
}: {
  status: "sending" | "sent" | "delivered" | "failed";
}) {
  switch (status) {
    case "sending":
      return (
        <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
      );
    case "sent":
      return <CheckIcon className="w-4 h-4 text-white/70" />;
    case "delivered":
      return (
        <div className="flex">
          <CheckIcon className="w-3 h-3 text-white/70" />
          <CheckIcon className="w-3 h-3 text-white/70 -ml-1" />
        </div>
      );
    case "failed":
      return <XIcon className="w-4 h-4 text-red-300" />;
    default:
      return null;
  }
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-slate-500">Typing</span>
      <div className="flex gap-1">
        <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
        <div
          className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
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

function SmsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M21 12c0 3.866-3.582 7-8 7a9.7 9.7 0 0 1-3.5-.63L3 20l1.6-3.6A6.9 6.9 0 0 1 3 12c0-3.866 3.582-7 8-7s8 3.134 8 7Z" />
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

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22,2 15,22 11,13 2,9 22,2" />
    </svg>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
    </svg>
  );
}

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21,15 16,10 5,21" />
    </svg>
  );
}

function VideoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function AudioIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
