// src/pages/Files/ClientFiles.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CLIENTS } from "../../data/clients";
import SearchBar from "../../components/SearchBar";
import { UserMini } from "../../icons/Icons";

export default function ClientFiles() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CLIENTS.filter(c =>
      c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="px-4 pb-28 space-y-4">
      <header className="pt-2">
        <h1 className="text-4xl font-extrabold text-white">Select Client</h1>
      </header>

      <SearchBar value={query} onChange={setQuery} placeholder="Search Clients" />

      <div className="space-y-3">
        {results.map(c => (
          <div key={c.id} className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 grid place-items-center rounded-full ${c.color === "red" ? "bg-red-500" : "bg-[#1F66D1]"} text-white`}>
                <UserMini className="w-4 h-4" />
              </span>
              <div>
                <div className="font-extrabold text-[#0E3561]">{c.name}</div>
                <div className="text-sm text-gray-500">{c.role}</div>
              </div>
            </div>
            <button
              onClick={() => navigate(`/files/${c.id}`)}
              className="px-4 py-2 rounded-full bg-[#1F66D1] text-white font-extrabold"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
