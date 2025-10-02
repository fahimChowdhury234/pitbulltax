import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import { PROMOTIONS } from "../../data/promotions";

const PAGE_SIZE = 5;

export default function PromotionsList() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // track read promotions in localStorage
  const readIds = useMemo<number[]>(
    () => JSON.parse(localStorage.getItem("readPromotions") ?? "[]"),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const now = new Date();
    return PROMOTIONS.filter(
      (p) =>
        // not expired:
        (!p.expiresAt || new Date(p.expiresAt) > now) &&
        (p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q))
    ).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  function openItem(id: number) {
    const current = new Set<number>(
      JSON.parse(localStorage.getItem("readPromotions") ?? "[]")
    );
    current.add(id);
    localStorage.setItem("readPromotions", JSON.stringify([...current]));
    nav(`/promotions/${id}`);
  }

  return (
    <div className=" pt-6 pb-28">
      <h1 className="text-5xl font-extrabold text-white">Promotions</h1>
      <p className="text-gray-300 mt-2">
        Click the button to view the promotions
      </p>

      <div className="mt-5">
        <SearchBar
          value={query}
          onChange={(v) => {
            setQuery(v);
            setPage(1);
          }}
          placeholder="Search Promotions"
        />
      </div>

      <div className="mt-4 space-y-4">
        {paged.map((p) => {
          const read = readIds.includes(p.id) || !p.unread;
          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow px-4 py-4 flex items-center justify-between"
            >
              <div className="flex items-start gap-3 pr-3">
                {/* tag icon for unread */}
                {!read && (
                  <span className="text-[#1F66D1] mt-1">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.59 13.41 11.18 4H4v7.17l9.41 9.41a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.82ZM6 6h4.76l7.83 7.83-3.88 3.88L6 10.88V6Z" />
                    </svg>
                  </span>
                )}
                <div>
                  <div
                    className={`text-[18px] leading-snug ${
                      read
                        ? "font-normal text-[#0E3561]"
                        : "font-extrabold text-[#0E3561]"
                    }`}
                  >
                    {p.title}
                  </div>
                  <div className="text-[#0E3561]/40 text-sm mt-1">
                    {formatDate(p.createdAt)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => openItem(p.id)}
                className="px-6 py-2 rounded-full bg-[#1F66D1] text-white font-semibold shrink-0"
              >
                View
              </button>
            </div>
          );
        })}

        {paged.length === 0 && (
          <div className="text-center text-white/90 py-16">
            No promotions found.
          </div>
        )}
      </div>

      <div className="mt-6">
        <Pagination page={page} pages={pages} onChange={setPage} />
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    const dStr = d.toLocaleDateString(undefined, {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const tStr = d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${dStr} ${tStr}`;
  } catch {
    return iso;
  }
}
