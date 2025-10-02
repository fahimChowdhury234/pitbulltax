import { useEffect, useMemo, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CLIENTS } from "../../data/clients";
import { useChat } from "../../data/chatStore";
import MessageBubble from "../../components/chat/MessageBubble";
import MessageInput from "../../components/chat/MessageInput";

export default function ChatWindow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const clientId = Number(id);
  const client = useMemo(
    () => CLIENTS.find((c) => c.id === clientId),
    [clientId]
  );

  const chat = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<any[]>([]);

  // Add error handling for chat context
  if (!chat) {
    return (
      <div className="flex flex-col h-screen">
        <div className="px-4 py-3 flex items-center gap-3 border-b bg-white">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-[#0E3561]"
          >
            ←
          </button>
          <h1 className="text-3xl font-extrabold text-[#0E3561]">Chat</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-lg mb-2">⚠️</div>
            <div className="text-[#0E3561] font-semibold">
              Chat service unavailable
            </div>
            <div className="text-gray-500 text-sm mt-1">
              Please try refreshing the page
            </div>
          </div>
        </div>
      </div>
    );
  }

  const presence = chat.presenceByClient(clientId);
  const msgs = chat.messagesByClient(clientId);

  useEffect(() => {
    chat.markRead(clientId);
  }, [clientId]); // Remove chat from dependencies to prevent infinite loop

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  if (!client) {
    return (
      <div className="flex flex-col h-screen">
        <div className="px-4 py-3 flex items-center gap-3 border-b bg-white">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-[#0E3561]"
          >
            ←
          </button>
          <h1 className="text-3xl font-extrabold text-[#0E3561]">Chat</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">👤</div>
            <div className="text-[#0E3561] font-semibold text-lg mb-2">
              Client not found
            </div>
            <div className="text-gray-500">
              The requested client does not exist
            </div>
            <button
              onClick={() => navigate("/chat")}
              className="mt-4 px-6 py-2 bg-[#1F66D1] text-white rounded-full font-semibold hover:bg-[#0E3561] transition-colors"
            >
              Back to Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  const send = () => {
    const t = text.trim();
    if (!t && pendingAttachments.length === 0) return;

    setIsTyping(true);

    // Convert file attachments to the format expected by the chat store
    const attachments = pendingAttachments.map((attachment) => ({
      id: attachment.id,
      name: attachment.file.name,
      size: attachment.file.size,
      type: attachment.type,
      url: attachment.preview, // For now, use preview as URL
    }));

    chat.send(clientId, t, attachments);
    setText("");
    setPendingAttachments([]);

    // Simulate typing indicator
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleFileUpload = (files: any[]) => {
    // Store the file attachments for sending
    setPendingAttachments((prev) => [...prev, ...files]);
  };

  const formatLastSeen = (lastSeen: string) => {
    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInMinutes = Math.floor(
      (now.getTime() - lastSeenDate.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return lastSeenDate.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Header */}
      <header className="px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 border-b bg-white shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors group"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#0E3561] group-hover:text-[#1F66D1] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-[#0E3561] truncate">
            {client.name}
          </h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span
              className={`inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                presence.online ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            />
            <span
              className={`${
                presence.online ? "text-green-600 font-medium" : "text-gray-500"
              }`}
            >
              {presence.online ? "Online" : "Offline"}
            </span>
            {!presence.online && (
              <span className="text-gray-400 text-xs hidden sm:inline">
                • Last seen {formatLastSeen(new Date().toISOString())}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Call Button - Hidden on mobile */}
          <button className="hidden sm:block p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors group">
            <svg
              className="w-5 h-5 text-green-600 group-hover:text-green-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </button>
          {/* Video Call Button - Hidden on mobile */}
          <button className="hidden sm:block p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors group">
            <svg
              className="w-5 h-5 text-blue-600 group-hover:text-blue-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          {/* Client Avatar */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#1F66D1] to-[#0E3561] flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg">
            {client.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-3 sm:py-6 space-y-3 sm:space-y-4 bg-gradient-to-b from-transparent to-gray-50/50">
        {msgs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <div className="text-center max-w-xs sm:max-w-md mx-auto px-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-[#1F66D1] to-[#0E3561] rounded-full flex items-center justify-center text-white text-2xl sm:text-4xl shadow-xl">
                💬
              </div>
              <div className="text-[#0E3561] font-bold text-lg sm:text-xl mb-2 sm:mb-3">
                Start a conversation
              </div>
              <div className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                Send a message to begin chatting with{" "}
                <span className="font-semibold text-[#0E3561]">
                  {client.name}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="hidden sm:inline">
                  Messages are end-to-end encrypted
                </span>
                <span className="sm:hidden">Encrypted</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {msgs.map((m) => (
              <div key={m.id} className="group">
                <MessageBubble
                  id={m.id}
                  from={m.from}
                  text={m.text}
                  time={new Date(m.sentAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  attachments={m.attachments}
                  onEdit={(mid, t) => chat.edit(mid, t)}
                  onDelete={(mid) => chat.remove(mid)}
                />
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1F66D1] rounded-full animate-bounce"></div>
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1F66D1] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1F66D1] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      <span className="hidden sm:inline">
                        {client.name} is typing...
                      </span>
                      <span className="sm:hidden">typing...</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t relative">
        <MessageInput
          value={text}
          onChange={setText}
          onSend={send}
          onFileUpload={handleFileUpload}
          attachments={pendingAttachments}
          onRemoveAttachment={(id) => {
            setPendingAttachments((prev) => prev.filter((a) => a.id !== id));
          }}
        />
      </div>
    </div>
  );
}
