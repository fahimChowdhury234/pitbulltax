import { useState, useRef, useEffect } from "react";

type FileAttachment = {
  id: string;
  name: string;
  size: number;
  type: "image" | "document" | "other";
  url?: string;
};

type Props = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
  attachments?: FileAttachment[];
  onEdit(id: string, next: string): void;
  onDelete(id: string): void;
};

export default function MessageBubble({
  id,
  from,
  text,
  time,
  attachments = [],
  onEdit,
  onDelete,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mine = from === "me";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (draft.trim() && draft.trim() !== text) {
      onEdit(id, draft.trim());
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(text);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEdit();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return "🖼️";
      case "document":
        return "📄";
      default:
        return "📎";
    }
  };

  return (
    <div
      className={`flex ${
        mine ? "justify-end" : "justify-start"
      } relative group`}
    >
      <div
        className={`max-w-[90%] sm:max-w-[85%] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm transition-all duration-200 ${
          mine
            ? "bg-gradient-to-br from-[#1F66D1] to-[#0E3561] text-white"
            : "bg-white border border-gray-200 text-gray-800"
        }`}
      >
        {isEditing ? (
          <div className="space-y-2">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-white/90 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1F66D1]"
              placeholder="Edit message..."
            />
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="text-xs px-3 py-1 rounded-lg bg-[#1F66D1] text-white hover:bg-[#0E3561] transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="text-xs px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* File Attachments */}
            {attachments.length > 0 && (
              <div className="mb-2 sm:mb-3 space-y-1 sm:space-y-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl border ${
                      mine
                        ? "bg-white/20 border-white/30"
                        : "bg-gray-100 border-gray-200"
                    }`}
                  >
                    <div className="text-lg sm:text-2xl">
                      {getFileIcon(attachment.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs sm:text-sm font-medium truncate ${
                          mine ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {attachment.name}
                      </div>
                      <div
                        className={`text-[10px] sm:text-xs ${
                          mine ? "text-white/70" : "text-gray-500"
                        }`}
                      >
                        {formatFileSize(attachment.size)}
                      </div>
                    </div>
                    <button
                      className={`p-1 rounded hover:bg-white/20 transition-colors ${
                        mine
                          ? "text-white/70 hover:text-white"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      onClick={() => {
                        // Handle file download/view
                        if (attachment.url) {
                          window.open(attachment.url, "_blank");
                        }
                      }}
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Message Text */}
            {text && (
              <div className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                {text}
              </div>
            )}

            {/* Timestamp */}
            <div
              className={`text-[10px] sm:text-[11px] mt-1 sm:mt-2 opacity-70 ${
                mine ? "text-right" : "text-left"
              }`}
            >
              {time}
            </div>
          </>
        )}
      </div>

      {/* Message Actions Menu */}
      {!isEditing && (
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`absolute top-1 sm:top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              mine ? "-left-6 sm:-left-8" : "-right-6 sm:-right-8"
            } p-1 rounded-full hover:bg-gray-100`}
            aria-label="message-menu"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              className={`absolute z-20 w-40 rounded-xl bg-white border border-gray-200 shadow-lg py-1 ${
                mine ? "right-0" : "left-0"
              }`}
            >
              <button
                onClick={() => {
                  setEditing(true);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
