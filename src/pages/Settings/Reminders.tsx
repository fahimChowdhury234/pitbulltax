import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "../../components/ui/Switch";
import { ArrowLeft } from "../../icons/Icons";

const STORAGE_KEY = "settings.remindersCalendar.enabled";

export default function Reminders() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    setEnabled(raw === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(enabled));
  }, [enabled]);

  return (
    <div className="pb-32">
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <header className="pt-2 pb-3">
        <h1 className="text-2xl font-extrabold text-white">
          Reminders and Calendar
        </h1>
      </header>
      {/* Card */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <p className="rounded-xl bg-black/[0.04] text-[#0E3561] p-3 leading-relaxed font-semibold">
          Sync your PitBullTax To-Do list with your phone&apos;s calendar and
          reminders.
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-[#0E3561] text-xl font-extrabold">Enable</span>
          <Switch checked={enabled} onChange={setEnabled} />
        </div>
      </div>
    </div>
  );
}
