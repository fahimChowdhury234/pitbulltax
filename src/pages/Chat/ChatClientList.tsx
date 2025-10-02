import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CLIENTS } from "../../data/clients";
import { useChat } from "../../data/chatStore";

const PAGE_SIZE = 6;

export default function ChatClientList() {
  const navigate = useNavigate();
  const chat = useChat();
  const [q, setQ] = useState("");
  const [isBiz, setIsBiz] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Add error handling for chat context
  if (!chat) {
    return (
      <div className="pb-28 flex items-center justify-center min-h-screen">
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
    );
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return CLIENTS.filter((c) => {
      const typeOk = isBiz ? c.kind === "business" : c.kind !== "business";
      const matches =
        c.name.toLowerCase().includes(term) ||
        c.role.toLowerCase().includes(term);
      return typeOk && matches;
    });
  }, [q, isBiz]);

  const total = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Simulate loading for better UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [q, isBiz, page]);

  const handleClientSelect = (clientId: number) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/chat/${clientId}`);
    }, 200);
  };

  return (
    <div className=" pb-24 sm:pb-28">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Chat</h1>
        <div className="mt-1 sm:mt-2 text-base sm:text-lg text-gray-300 opacity-80">
          Select Client
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-xl sm:rounded-2xl p-0.5 sm:p-1">
          <button
            onClick={() => {
              setIsBiz(false);
              setPage(1);
            }}
            className={`flex-1  py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
              !isBiz
                ? "bg-white text-[#0E3561] shadow-sm"
                : "text-gray-600 hover:text-[#0E3561]"
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => {
              setIsBiz(true);
              setPage(1);
            }}
            className={`flex-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
              isBiz
                ? "bg-white text-[#0E3561] shadow-sm"
                : "text-gray-600 hover:text-[#0E3561]"
            }`}
          >
            Business
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3 sm:mb-4">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search clients..."
            className="w-full rounded-xl sm:rounded-2xl border-2 border-gray-200 px-3 sm:px-4 py-2 sm:py-3 pl-8 sm:pl-10 focus:border-[#1F66D1] focus:outline-none transition-colors text-sm sm:text-base"
          />
          <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base">
            🔍
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F66D1]"></div>
        </div>
      )}

      {/* Client List */}
      {!isLoading && (
        <div className="space-y-2 sm:space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">💬</div>
              <div className="text-white font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                No clients found
              </div>
              <div className="text-gray-300 text-sm sm:text-base">
                {q
                  ? "Try adjusting your search terms"
                  : "No clients available for this category"}
              </div>
            </div>
          ) : (
            items.map((c) => {
              const p = chat.presenceByClient(c.id);
              return (
                <div
                  key={c.id}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#1F66D1] to-[#0E3561] flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${
                          p.online ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    </div>

                    {/* Client Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="font-bold text-[#0E3561] truncate text-sm sm:text-base">
                          {c.name}
                        </div>
                        {p.unread > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-1.5 sm:px-2 py-0.5 font-bold min-w-[18px] sm:min-w-[20px] text-center flex-shrink-0">
                            {p.unread}
                          </span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">
                        {c.role}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 sm:mt-1">
                        {p.online ? "🟢 Online" : "⚫ Offline"}
                      </div>
                    </div>
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => handleClientSelect(c.id)}
                    className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#1F66D1] text-white font-bold hover:bg-[#0E3561] transition-colors duration-200 group-hover:scale-105 transform text-xs sm:text-sm flex-shrink-0"
                  >
                    Select
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && total > 1 && (
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-1 sm:gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 sm:w-10 sm:h-10 grid place-items-center rounded-full border-2 border-gray-200 hover:border-[#1F66D1] hover:text-[#1F66D1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          >
            ‹
          </button>
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 sm:w-10 sm:h-10 grid place-items-center rounded-full font-semibold transition-colors text-sm sm:text-base ${
                page === i + 1
                  ? "bg-[#1F66D1] text-white"
                  : "border-2 border-gray-200 hover:border-[#1F66D1] hover:text-[#1F66D1]"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(total, p + 1))}
            disabled={page === total}
            className="w-8 h-8 sm:w-10 sm:h-10 grid place-items-center rounded-full border-2 border-gray-200 hover:border-[#1F66D1] hover:text-[#1F66D1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
