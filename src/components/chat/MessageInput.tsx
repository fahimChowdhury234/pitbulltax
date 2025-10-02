import { useState, useRef, useCallback } from "react";

type FileAttachment = {
  id: string;
  file: File;
  preview?: string;
  type: "image" | "document" | "other";
};

type Props = {
  value: string;
  onChange(v: string): void;
  onSend(): void;
  onFileUpload?: (files: FileAttachment[]) => void;
  attachments?: FileAttachment[];
  onRemoveAttachment?: (id: string) => void;
};

export default function MessageInput({
  value,
  onChange,
  onSend,
  onFileUpload,
  attachments = [],
  onRemoveAttachment,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (value.trim() || attachments.length > 0) {
      onSend();
    }
  };

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || !onFileUpload) return;

      const newAttachments: FileAttachment[] = Array.from(files).map((file) => {
        const id = Math.random().toString(36).substr(2, 9);
        const type = file.type.startsWith("image/")
          ? "image"
          : file.type.includes("pdf") || file.type.includes("document")
          ? "document"
          : "other";

        let preview: string | undefined;
        if (type === "image") {
          preview = URL.createObjectURL(file);
        }

        return { id, file, preview, type };
      });

      onFileUpload(newAttachments);
    },
    [onFileUpload]
  );

  const removeAttachment = (id: string) => {
    if (onRemoveAttachment) {
      onRemoveAttachment(id);
    }
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div
      className={`p-2 sm:p-4 bg-white border-t transition-colors ${
        isDragOver ? "bg-blue-50 border-blue-200" : "border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* File Attachments Preview */}
      {attachments.length > 0 && (
        <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Attachments ({attachments.length})
            </span>
            <button
              onClick={() => {
                attachments.forEach((attachment) => {
                  if (onRemoveAttachment) {
                    onRemoveAttachment(attachment.id);
                  }
                });
              }}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-1 sm:gap-2 bg-white rounded-md sm:rounded-lg p-1.5 sm:p-2 border shadow-sm"
              >
                {attachment.type === "image" && attachment.preview ? (
                  <img
                    src={attachment.preview}
                    alt="Preview"
                    className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded"
                  />
                ) : (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded flex items-center justify-center text-xs sm:text-sm">
                    {attachment.type === "document" ? "📄" : "📎"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-800 truncate">
                    {attachment.file.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatFileSize(attachment.file.size)}
                  </div>
                </div>
                <button
                  onClick={() => removeAttachment(attachment.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drag & Drop Overlay */}
      {isDragOver && (
        <div className="absolute inset-0 bg-blue-50 bg-opacity-90 border-2 border-dashed border-blue-300 rounded-xl flex items-center justify-center z-10">
          <div className="text-center">
            <div className="text-4xl mb-2">📁</div>
            <div className="text-blue-600 font-medium">Drop files here</div>
            <div className="text-blue-500 text-sm">to attach them</div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Attachment Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors group"
          title="Attach file"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#1F66D1] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
        />

        {/* Message Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type a message..."
              className={`w-full text-black resize-none rounded-xl sm:rounded-2xl border-2 px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 outline-none transition-all duration-200 text-sm sm:text-base ${
                isFocused
                  ? "border-[#1F66D1] bg-blue-50 shadow-sm"
                  : "border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300"
              }`}
              rows={1}
              maxLength={1000}
              style={{
                minHeight: "40px",
                maxHeight: "120px",
                height: "auto",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, 120) + "px";
              }}
            />

            {/* Character count */}
            {value.length > 800 && (
              <div className="absolute bottom-1 sm:bottom-2 right-8 sm:right-12 text-xs text-gray-400 bg-white px-1 rounded">
                {value.length}/1000
              </div>
            )}
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!value.trim() && attachments.length === 0}
          className={`p-2 sm:p-3 rounded-full font-semibold transition-all duration-200 ${
            value.trim() || attachments.length > 0
              ? "bg-gradient-to-r from-[#1F66D1] to-[#0E3561] text-white hover:from-[#0E3561] hover:to-[#1F66D1] hover:scale-105 transform shadow-lg hover:shadow-xl"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 gap-1 sm:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <span className="hidden sm:inline">
            Press Enter to send, Shift+Enter for new line
          </span>
          <span className="sm:hidden">Enter to send</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Drag & drop files to attach</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Max 10MB per file</span>
        </div>
      </div>
    </div>
  );
}
