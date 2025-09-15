import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "../../icons/Icons";

type Zone = { id: string; offset: string; label: string; abbr: string };

const ZONES: Zone[] = [
  {
    id: "CHST",
    offset: "+10:00",
    label: "Chamorro Standard Time",
    abbr: "CHST",
  },
  { id: "AST", offset: "-04:00", label: "Atlantic Standard Time", abbr: "AST" },
  { id: "EST", offset: "-05:00", label: "Eastern Standard Time", abbr: "EST" },
  { id: "CST", offset: "-06:00", label: "Central Standard Time", abbr: "CST" },
  { id: "MST", offset: "-07:00", label: "Mountain Standard Time", abbr: "MST" },
  { id: "PST", offset: "-08:00", label: "Pacific Standard Time", abbr: "PST" },
  { id: "AKST", offset: "-09:00", label: "Alaska Standard Time", abbr: "AKST" },
  {
    id: "HST",
    offset: "-10:00",
    label: "Hawaii-Aleutian Standard Time",
    abbr: "HST",
  },
  { id: "SST", offset: "-11:00", label: "Samoa Standard Time", abbr: "SST" },
];

const STORAGE_KEY = "settings.timezone";

export default function TimeZones() {
  const navigate = useNavigate();

  // read saved selection once
  const initial = useMemo<Zone>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (
      ZONES.find((z) => z.id === saved) ?? ZONES.find((z) => z.id === "EST")!
    );
  }, []);

  const [selected, setSelected] = useState<Zone>(initial);
  const [open, setOpen] = useState(false);

  // close on outside click
  const boxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  function choose(z: Zone) {
    setSelected(z);
    setOpen(false);
  }

  function onSave() {
    localStorage.setItem(STORAGE_KEY, selected.id);
    navigate(-1);
  }

  return (
    <div className=" pb-32">
      {/* Title */}
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <header className="pt-2 pb-3">
        <h1 className="text-2xl font-extrabold text-white">
          Select your time zone:
        </h1>
      </header>

      {/* Card container */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        {/* Select box */}
        <div ref={boxRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="w-full text-sm flex items-center justify-between rounded-xl border border-[#0E3561]/20 bg-white px-3 py-3 text-[#0E3561] font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1F66D1]/60"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span>
              <span className="tabular-nums mr-2">{selected.offset}</span>
              {selected.label}{" "}
              <span className="opacity-70">({selected.abbr})</span>
            </span>
            <ChevronRight
              className={`w-5 h-5 text-[#1F66D1] transition  ${
                open ? "-rotate-90" : "rotate-90"
              }`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div
              role="listbox"
              className="absolute z-20 mt-2 w-full rounded-xl border border-black/10 bg-white shadow-lg overflow-hidden"
            >
              <div className="max-h-72 overflow-y-auto">
                {ZONES.map((z) => {
                  const isActive = z.id === selected.id;
                  return (
                    <button
                      key={z.id}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => choose(z)}
                      className={
                        "w-ful text-sml text-left px-4 py-3 border-b border-black/5 transition " +
                        (isActive
                          ? "bg-[#E9EFFC] text-[#1F66D1] font-extrabold"
                          : "hover:bg-black/[0.03] text-[#0E3561]")
                      }
                    >
                      <span className="tabular-nums mr-2">{z.offset}</span>
                      {z.label} <span className="opacity-70">({z.abbr})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-xl bg-gray-200 text-[#0E3561] font-extrabold text-sm active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="flex-1 py-3 rounded-xl bg-[#1F66D1] text-white font-extrabold text-sm active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
