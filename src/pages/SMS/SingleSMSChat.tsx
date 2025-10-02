import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { CLIENTS } from "../../data/clients";

type FileAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  preview?: string;
};

type Msg = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string; // e.g. "03:32 PM"
  attachments?: FileAttachment[];
  isTyping?: boolean;
};

export default function SingleSMSChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = useMemo(() => CLIENTS.find((c) => String(c.id) === id), [id]);

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "1",
      from: "them",
      text: "SMS test did you receive?",
      time: "03:32 PM",
    },
  ]);
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const attachment: FileAttachment = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
          preview: file.type.startsWith("image/")
            ? (e.target?.result as string)
            : undefined,
        };
        setAttachments((prev) => [...prev, attachment]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const attachment = prev.find((a) => a.id === id);
      if (attachment) {
        URL.revokeObjectURL(attachment.url);
      }
      return prev.filter((a) => a.id !== id);
    });
  };

  const sendMessage = () => {
    const trimmed = text.trim();
    if (!trimmed && attachments.length === 0) return;

    const newMessage: Msg = {
      id: Date.now().toString(),
      from: "me",
      text: trimmed,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setText("");
    setAttachments([]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const charsLeft = 160 - text.length;
  const canSend = text.trim().length > 0 || attachments.length > 0;

  return (
    <div
      className={`flex h-[calc(100vh-200px)] flex-col bg-slate-50 rounded-md overflow-hidden ${
        isDragOver ? "ring-2 ring-blue-400 ring-opacity-50" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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

        {messages.map((m) => (
          <MessageBubble key={m.id} msg={m} />
        ))}

        <div ref={endRef} />
      </div>

      {/* File Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-3 py-2 bg-slate-50 border-t border-slate-200">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment) => (
              <AttachmentPreview
                key={attachment.id}
                attachment={attachment}
                onRemove={() => removeAttachment(attachment.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white px-3 pt-5 pb-3">
        <div className="flex items-start gap-2">
          <button
            type="button"
            className="shrink-0 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Attach files"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf,text/plain,.doc,.docx"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />

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
        {/* Message text */}
        {msg.text && <div className="text-[15px]">{msg.text}</div>}

        {/* Attachments */}
        {msg.attachments && msg.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {msg.attachments.map((attachment) => (
              <div key={attachment.id} className="max-w-[200px]">
                {attachment.preview ? (
                  <img
                    src={attachment.preview}
                    alt={attachment.name}
                    className="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(attachment.url, "_blank")}
                  />
                ) : (
                  <div
                    className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg cursor-pointer hover:bg-slate-200 transition-colors"
                    onClick={() => window.open(attachment.url, "_blank")}
                  >
                    <FileIcon className="w-4 h-4 text-slate-600" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-900 truncate">
                        {attachment.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {(() => {
                          const bytes = attachment.size;
                          if (bytes === 0) return "0 Bytes";
                          const k = 1024;
                          const sizes = ["Bytes", "KB", "MB", "GB"];
                          const i = Math.floor(Math.log(bytes) / Math.log(k));
                          return (
                            parseFloat((bytes / Math.pow(k, i)).toFixed(2)) +
                            " " +
                            sizes[i]
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-0.5 text-[11px] text-slate-500 text-right">
          {msg.time}
        </div>
      </div>
    </div>
  );
}

function AttachmentPreview({
  attachment,
  onRemove,
}: {
  attachment: FileAttachment;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 shadow-sm max-w-[200px]">
      {attachment.preview ? (
        <img
          src={attachment.preview}
          alt={attachment.name}
          className="w-8 h-8 rounded object-cover"
        />
      ) : (
        <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
          <FileIcon className="w-4 h-4 text-slate-600" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-slate-900 truncate">
          {attachment.name}
        </div>
        <div className="text-xs text-slate-500">
          {(() => {
            const bytes = attachment.size;
            if (bytes === 0) return "0 Bytes";
            const k = 1024;
            const sizes = ["Bytes", "KB", "MB", "GB"];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return (
              parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
            );
          })()}
        </div>
      </div>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-slate-100 rounded transition-colors"
        title="Remove attachment"
      >
        <X className="w-3 h-3 text-slate-500" />
      </button>
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

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M18 6L6 18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6l12 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
