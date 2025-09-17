import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CLIENTS } from "../../data/clients";
import SearchBar from "../../components/SearchBar";

type Props = { kind: "plain" | "template" };

export default function EmailClientPicker({ kind }: Props) {
  const nav = useNavigate();
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CLIENTS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
    );
  }, [query]);

  const title = kind === "plain" ? "Plain Email" : "Email";

  return (
    <div className=" py-6 pb-28">
      <button onClick={() => nav(-1)} className="text-white mb-2">&larr; Back</button>

      <h1 className="text-4xl font-extrabold text-white">{title}</h1>
      <p className="text-gray-300 mt-2">Select the Client to Send Email</p>

      <div className="mt-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Search Clients" />
      </div>

      <div className="mt-4 space-y-3">
        {list.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow px-4 py-3 flex items-center justify-between"
          >
            <div>
              <div className="font-extrabold text-[#0E3561] text-lg">{c.name}</div>
              <div className="text-sm text-gray-500">{c.role}</div>
            </div>
            <button
              onClick={() => nav(`/email/plain/${c.id}`)}
              className="px-4 py-2 rounded-full bg-[#1F66D1] text-white font-semibold"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
