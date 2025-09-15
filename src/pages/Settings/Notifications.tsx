import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DayToggle from "../../components/settings/DayToggle";
import TimeRow from "../../components/settings/TimeRow";
import { DAYS, STORAGE_KEY, Day } from "../../components/settings/constants";

export default function Notifications() {
  const navigate = useNavigate();

  // load saved config
  const saved = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as { days: Day[]; from?: string; to?: string }) : null;
    } catch {
      return null;
    }
  }, []);

  const [selectedDays, setSelectedDays] = useState<Set<Day>>(new Set(saved?.days ?? []));
  const [fromTime, setFromTime] = useState<string>(saved?.from ?? "");
  const [toTime, setToTime] = useState<string>(saved?.to ?? "");
  const hasSelection = selectedDays.size > 0;

  function toggleDay(d: Day) {
    setSelectedDays(prev => {
      const next = new Set(prev);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });
  }

  function onSave() {
    const payload = {
      days: Array.from(selectedDays),
      from: fromTime || undefined,
      to: toTime || undefined,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    navigate(-1);
  }

  return (
    <div className="pb-32">
      <header className="pt-2 pb-3">
        <h1 className="text-2xl font-extrabold text-white">Notifications</h1>
      </header>

      <div className="p-4 rounded-2xl bg-white shadow-sm">
        <h2 className="text-[#0E3561] text-sm font-extrabold leading-snug mb-3">
          Select days and time period to mute notifications:
        </h2>

        {/* Days */}
        <div className="space-y-2">
          {DAYS.map((d) => (
            <DayToggle
              key={d}
              label={d}
              checked={selectedDays.has(d)}
              onChange={() => toggleDay(d)}
            />
          ))}
        </div>

        {/* Times */}
        <div className="mt-4 space-y-3">
          <TimeRow
            label="From:"
            value={fromTime}
            onChange={setFromTime}
            disabled={!hasSelection}
          />
          <TimeRow
            label="To:"
            value={toTime}
            onChange={setToTime}
            disabled={!hasSelection}
          />
          <p className="text-[#0E3561]/70 text-sm">Leave blank if no time restrictions</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-xl bg-gray-200 text-[#0E3561] font-extrabold text-sm active:scale-95"
          >
            ✕ Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!hasSelection}
            className={
              "flex-1 py-3 rounded-xl font-extrabold text-sm active:scale-95 " +
              (hasSelection
                ? "bg-[#1F66D1] text-white"
                : "bg-[#b9c7e6] text-white/80 cursor-not-allowed")
            }
          >
            ✓ Save
          </button>
        </div>
      </div>
    </div>
  );
}
