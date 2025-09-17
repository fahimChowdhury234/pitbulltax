import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { CLIENTS } from "../../../data/clients";

type TItem = { key: string; label: string; default?: boolean };

const TRANSCRIPT_ITEMS: TItem[] = [
  { key: "account", label: "Account Transcript", default: true },
  { key: "wincome", label: "Wage & Income Transcript", default: true },
  { key: "winsum", label: "Wage & Income Summary", default: true },
  { key: "return", label: "Tax Return Transcript", default: true },
  { key: "record", label: "Record of Account", default: true },
  { key: "separate", label: "Separate Assessment" },
  { key: "civil", label: "Civil Penalties" },
];

export default function RequestForm() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const client = useMemo(
    () => CLIENTS.find((c) => String(c.id) === String(clientId)),
    [clientId]
  );

  const [spanish, setSpanish] = useState(true);
  const [who, setWho] = useState<"taxpayer" | "spouse">("taxpayer");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>(
    Object.fromEntries(TRANSCRIPT_ITEMS.map((i) => [i.key, !!i.default]))
  );

  if (!client) {
    return (
      <div className="px-4 py-10 text-white">
        <p>Client not found.</p>
      </div>
    );
  }

  function submit() {
    const chosen = TRANSCRIPT_ITEMS.filter((i) => checks[i.key]).map((i) => i.label);
    // stub: replace with API call
    alert(
      `Requesting transcripts for ${client?.name ?? "Unknown Client"}\nWho: ${who}\nSpanish copy: ${spanish}\nFrom: ${from}\nTo: ${to}\nItems:\n- ${chosen.join(
        "\n- "
      )}`
    );
    navigate("/transcripts");
  }

  return (
    <div className="px-4 pb-28 space-y-5">
      <header className="pt-2">
        <h1 className="text-4xl font-extrabold text-white">Request Transcripts</h1>
        <p className="text-white/85 mt-2">Select the periods and transcripts to request</p>
      </header>

      {/* Selected client pill */}
      <div className="bg-white rounded-xl px-4 py-3 shadow flex items-center justify-between">
        <div>
          <div className="font-semibold text-[#0E3561]">{client.name}</div>
          <div className="text-sm text-gray-500">SSN: 123-12-1232</div>
        </div>
      </div>

      {/* toggles */}
      <div className="flex items-center gap-3">
        <Toggle
          active={who === "taxpayer"}
          onClick={() => setWho("taxpayer")}
          label="Taxpayer"
        />
        <Toggle active={who === "spouse"} onClick={() => setWho("spouse")} label="Spouse" />
      </div>

      <label className="flex items-center gap-3 text-white/95">
        <input
          type="checkbox"
          className="w-5 h-5 accent-[#1F66D1]"
          checked={spanish}
          onChange={(e) => setSpanish(e.target.checked)}
        />
        Download a copy of the report in Spanish
      </label>

      {/* Consecutive Periods */}
      <div className="bg-white rounded-2xl shadow">
        <div className="px-4 py-3 font-semibold text-[#0E3561]">Consecutive Periods</div>
        <div className="px-4 pb-4 grid grid-cols-1 gap-3">
          <TextField label="From" value={from} onChange={setFrom} placeholder="Enter YYYY or MM/YYYY" />
          <TextField label="To" value={to} onChange={setTo} placeholder="Enter YYYY or MM/YYYY" />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="bg-white rounded-2xl shadow divide-y">
        {TRANSCRIPT_ITEMS.map((i) => (
          <label key={i.key} className="flex items-center gap-3 px-4 py-3">
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#1F66D1]"
              checked={!!checks[i.key]}
              onChange={(e) => setChecks({ ...checks, [i.key]: e.target.checked })}
            />
            <span className="text-[#0E3561] font-medium">{i.label}</span>
          </label>
        ))}
      </div>

      <div className="h-2" />

      <div className="fixed left-0 right-0 bottom-20 px-4 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 h-12 rounded-2xl bg-white/90 text-[#0E3561] font-semibold shadow"
        >
          Back
        </button>
        <button
          onClick={submit}
          className="flex-1 h-12 rounded-2xl bg-red-600 text-white font-semibold shadow"
        >
          Get Transcripts
        </button>
      </div>
    </div>
  );
}

/* UI bits */
function Toggle({
  active,
  label,
  onClick,
}: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-2 rounded-full text-sm font-semibold " +
        (active ? "bg-[#1F66D1] text-white" : "bg-white text-[#0E3561]")
      }
    >
      {label}
    </button>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <div className="text-sm text-[#0E3561] mb-1">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/90 border border-black/10 px-3 py-3 text-[#0E3561] placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-[#1F66D1]/60"
      />
    </label>
  );
}
