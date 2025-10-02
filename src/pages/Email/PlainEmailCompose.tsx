import { useParams, useNavigate } from "react-router-dom";
import { CLIENTS } from "../../data/clients";
import { useState, useRef, useCallback } from "react";

type FileAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
};

export default function PlainEmailCompose() {
  const { clientId } = useParams();
  const nav = useNavigate();
  const client = CLIENTS.find((c) => String(c.id) === String(clientId));

  const [from, setFrom] = useState("SECOND ACCOUNT");
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [copy, setCopy] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!to.trim()) {
      newErrors.to = "Recipient email is required";
    } else if (!validateEmail(to)) {
      newErrors.to = "Please enter a valid email address";
    }

    if (cc && !validateEmail(cc)) {
      newErrors.cc = "Please enter a valid CC email address";
    }

    if (bcc && !validateEmail(bcc)) {
      newErrors.bcc = "Please enter a valid BCC email address";
    }

    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!body.trim()) {
      newErrors.body = "Message body is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
      if (file.size > 25 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 25MB.`);
        return;
      }

      const attachment: FileAttachment = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      };
      setAttachments((prev) => [...prev, attachment]);
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

  const send = async () => {
    if (!validateForm()) return;

    setIsSending(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(
        `Email sent successfully to: ${to}\nSubject: ${subject}\nAttachments: ${attachments.length}`
      );
      nav(-1);
    } catch (error) {
      alert("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className={`py-6 pb-28 ${
        isDragOver ? "ring-2 ring-blue-400 ring-opacity-50" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => nav(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          title="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div>
          <h1 className="text-4xl font-extrabold text-white">Compose Email</h1>
          <p className="text-gray-300 mt-1">
            Send a professional email to your client
          </p>
        </div>
      </div>

      <div className="mt-4 bg-white text-black rounded-2xl shadow-lg p-6 space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1F66D1] to-[#0E3561] text-white grid place-items-center shadow-lg">
            <UserIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="font-extrabold text-[#0E3561] text-lg">
              {client?.name || "Client"}
            </div>
            <div className="text-sm text-gray-500">adrian@pitbulltax.com</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="From:" error={errors.from}>
            <select
              className={`w-full rounded-xl border px-4 py-3 transition-colors focus:ring-2 focus:ring-[#1F66D1]/50 focus:border-[#1F66D1] ${
                errors.from ? "border-red-500" : "border-slate-300"
              }`}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              <option>SECOND ACCOUNT</option>
              <option>MAIN ACCOUNT</option>
            </select>
          </Field>

          <Field label="To:" error={errors.to} required>
            <input
              className={`w-full rounded-xl border px-4 py-3 transition-colors focus:ring-2 focus:ring-[#1F66D1]/50 focus:border-[#1F66D1] ${
                errors.to ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="client@example.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Cc:" error={errors.cc}>
            <input
              className={`w-full rounded-xl border px-4 py-3 transition-colors focus:ring-2 focus:ring-[#1F66D1]/50 focus:border-[#1F66D1] ${
                errors.cc ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="cc@example.com"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
            />
          </Field>

          <Field label="Bcc:" error={errors.bcc}>
            <input
              className={`w-full rounded-xl border px-4 py-3 transition-colors focus:ring-2 focus:ring-[#1F66D1]/50 focus:border-[#1F66D1] ${
                errors.bcc ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="bcc@example.com"
              value={bcc}
              onChange={(e) => setBcc(e.target.value)}
            />
          </Field>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
          <input
            type="checkbox"
            id="copy"
            checked={copy}
            onChange={(e) => setCopy(e.target.checked)}
            className="w-4 h-4 text-[#1F66D1] rounded focus:ring-[#1F66D1]"
          />
          <label
            htmlFor="copy"
            className="text-[#0E3561] font-medium cursor-pointer"
          >
            Email me a copy
          </label>
        </div>

        <Field label="Subject:" error={errors.subject} required>
          <input
            className={`w-full rounded-xl border px-4 py-3 transition-colors focus:ring-2 focus:ring-[#1F66D1]/50 focus:border-[#1F66D1] ${
              errors.subject ? "border-red-500" : "border-slate-300"
            }`}
            placeholder="Enter email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Field>

        <Field label="Message" error={errors.body} required>
          <textarea
            className={`w-full rounded-xl border px-4 py-3 min-h-[200px] resize-y transition-colors focus:ring-2 focus:ring-[#1F66D1]/50 focus:border-[#1F66D1] ${
              errors.body ? "border-red-500" : "border-slate-300"
            }`}
            placeholder="Type your message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Field>

        {/* File Attachments */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-[#0E3561]">
              Attachments ({attachments.length})
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#1F66D1] hover:bg-[#1F66D1]/10 rounded-lg transition-colors"
            >
              <Paperclip className="w-4 h-4" />
              Add Files
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="*/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />

          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map((attachment) => (
                <AttachmentPreview
                  key={attachment.id}
                  attachment={attachment}
                  onRemove={() => removeAttachment(attachment.id)}
                />
              ))}
            </div>
          )}

          {isDragOver && (
            <div className="border-2 border-dashed border-[#1F66D1] rounded-xl p-8 text-center bg-[#1F66D1]/5">
              <div className="text-[#1F66D1] font-medium">
                Drop files here to attach
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => nav(-1)}
          className="px-6 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={send}
          disabled={isSending}
          className={`px-8 py-3 rounded-xl text-white font-semibold transition-all flex items-center gap-2 ${
            isSending
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#1F66D1] to-[#0E3561] hover:shadow-lg hover:scale-105 active:scale-95"
          }`}
        >
          {isSending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <SendIcon className="w-4 h-4" />
              Send Email
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 mb-2">
        <div className="text-sm font-semibold text-[#0E3561]">{label}</div>
        {required && <span className="text-red-500 text-sm">*</span>}
      </div>
      {children}
      {error && (
        <div className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertIcon className="w-4 h-4" />
          {error}
        </div>
      )}
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
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
      <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center">
        <FileIcon className="w-4 h-4 text-slate-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-900 truncate">
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
        className="p-1 hover:bg-slate-200 rounded transition-colors"
        title="Remove attachment"
      >
        <X className="w-4 h-4 text-slate-500" />
      </button>
    </div>
  );
}

/* ---------- Icons ---------- */
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

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
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

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M22 2L11 13"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
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

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
