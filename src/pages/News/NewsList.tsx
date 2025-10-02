import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import { NEWS } from "../../data/news";

const PAGE_SIZE = 5;

export default function NewsList() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // local read tracking (demo): store read IDs in localStorage
  const readIds = useMemo<number[]>(
    () => JSON.parse(localStorage.getItem("readNews") ?? "[]"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [/* force read on mount */]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NEWS.filter(
      n =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt?.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q)
    ).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  function openItem(id: number) {
    // mark as read (demo)
    const current = new Set<number>(
      JSON.parse(localStorage.getItem("readNews") ?? "[]")
    );
    current.add(id);
    localStorage.setItem("readNews", JSON.stringify([...current]));
    nav(`/news/${id}`);
  }

  return (
    <div className="pt-6 pb-28">
      <h1 className="text-5xl font-extrabold text-white">News</h1>
      <p className="text-gray-300 mt-2">Click the button to view the news</p>

      <div className="mt-5">
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search News" />
      </div>

      <div className="mt-4 space-y-4">
        {paged.map((n) => {
          const read = readIds.includes(n.id) || !n.unread;
          return (
            <div
              key={n.id}
              className="bg-white rounded-2xl shadow px-4 py-4 flex items-center justify-between"
            >
              <div className="pr-3">
                <div className="flex items-start gap-3">
                  {/* unread dot */}
                  <span
                    className={`mt-2 w-2.5 h-2.5 rounded-full ${
                      read ? "bg-transparent" : "bg-[#1D72E7]"
                    }`}
                  />
                  <div>
                    <div className="text-[20px] leading-snug font-extrabold text-[#0E3561]">
                      {n.title}
                    </div>
                    <div className="text-[#0E3561]/40 text-sm mt-1">
                      {formatDate(n.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => openItem(n.id)}
                className="px-6 py-2 rounded-full bg-[#1F66D1] text-white font-semibold shrink-0"
              >
                View
              </button>
            </div>
          );
        })}

        {paged.length === 0 && (
          <div className="text-center text-white/90 py-16">No news found.</div>
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
