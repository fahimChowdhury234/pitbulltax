// src/pages/Clients.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SegmentedTabs from "../../components/SegmentedTabs";
import SearchBar from "../../components/SearchBar";
import ClientCard from "../../components/ClientCard";
import Pagination from "../../components/Pagination";
import { CLIENTS, type Client } from "../../data/clients";

const PAGE_SIZE = 6;

export default function Clients() {
  const navigate = useNavigate();

  const [segment, setSegment] = useState<"individual" | "business">("individual");
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  // Filter by segment + search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CLIENTS.filter(
      (c: Client) =>
        c.kind === segment &&
        (q === "" ||
          c.name.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q))
    );
  }, [segment, query]);

  // Pagination
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  // Reset page when filters change
  function onSegmentChange(next: "individual" | "business") {
    setSegment(next);
    setPage(1);
  }
  function onSearchChange(q: string) {
    setQuery(q);
    setPage(1);
  }

  return (
    <div className="space-y-4">
      {/* Title */}
      <header className="px-4 pt-2">
        <h1 className="text-4xl font-extrabold text-white">Clients</h1>
      </header>

      {/* Tabs */}
      <section>
        <SegmentedTabs value={segment} onChange={onSegmentChange} />
      </section>

      {/* Search */}
      <section>
        <SearchBar value={query} onChange={onSearchChange} />
      </section>

      {/* List */}
      <section className="space-y-3">
        {paged.map((c) => (
          <ClientCard
            key={c.id}
            name={c.name}
            role={c.role}
            color={c.color}
            onSummary={() => navigate(`/clients/${c.id}/summary`)}
          />
        ))}

        {paged.length === 0 && (
          <div className="text-white/90 text-center py-16">
            No results. Try a different search.
          </div>
        )}
      </section>

      {/* Pagination */}
      <section className="px-4 pb-24">
        <Pagination page={page} pages={pages} onChange={setPage} />
      </section>
    </div>
  );
}
