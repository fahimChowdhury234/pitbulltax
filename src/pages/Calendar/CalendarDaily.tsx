// src/pages/Calendar/CalendarDaily.tsx
import { CAL_ITEMS } from "../../data/calendar";
import { useMemo } from "react";

const SELECTED_DAY = "2025-04-22";

export default function CalendarDaily() {
  const events = useMemo(
    () =>
      CAL_ITEMS.filter((i) => i.date === SELECTED_DAY).sort((a, b) =>
        a.start.localeCompare(b.start)
      ),
    []
  );

  return (
    <div className="relative min-h-screen bg-white text-[#0E3561]">
      {/* HEADER */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-[34px] leading-8 font-extrabold">Calendar</h1>

        {/* Week strip */}
        <div className="mt-4 grid grid-cols-7 text-center text-[18px] font-bold">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={d + i} className="pb-1">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center text-[18px] font-semibold text-[#0E3561]">
          {[18, 19, 20, 21, 22, 23, 24].map((n) => (
            <div key={n} className="py-1">
              <span
                className={
                  n === 22
                    ? "inline-flex w-9 h-9 items-center justify-center rounded-full bg-[#1F66D1] text-white shadow"
                    : "inline-flex w-9 h-9 items-center justify-center rounded-full"
                }
              >
                {n}
              </span>
            </div>
          ))}
        </div>

        {/* Date + sync line */}
        <div className="mt-2">
          <div className="text-[22px] font-extrabold text-[#135AA5]">
            Friday 22 April 2025
          </div>
          <div className="mt-1 flex items-center gap-2 text-[14px] text-[#135AA5]">
            <span className="text-[18px]">📅</span>
            Synched with Google Calendar
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      {/* TIME RAIL + EVENTS */}
      <div className="relative">
        {/* Time slots with proper spacing */}
        <div className="px-4">
          {["03", "04", "05", "06", "07", "08", "09", "10", "11"].map((hr) => (
            <div key={hr} className="relative h-20 border-b border-gray-100">
              <div className="absolute left-0 top-6 text-[22px] font-extrabold text-[#0E3561]/80">
                {hr}:00
              </div>
            </div>
          ))}
        </div>

        {/* Events positioned absolutely */}
        <div className="absolute left-4 right-4 top-0">
          {events.map((e) => {
            const bg =
              e.kind === "task"
                ? "from-[#12903F] to-[#17B24C]"
                : e.kind === "zoom"
                ? "from-[#4BA2FF] to-[#6BB6FF]"
                : "from-[#DF2E33] to-[#F05B60]";

            const Icon =
              e.kind === "task"
                ? TaskIcon
                : e.kind === "zoom"
                ? CameraIcon
                : CalendarIcon;

            // Calculate position based on time - 80px per hour slot
            const getTimePosition = (time: string) => {
              const [hour, minute] = time.split(":").map(Number);
              const hourIndex = hour - 3; // 03:00 is index 0
              const minuteOffset = (minute / 60) * 80; // 80px per hour slot
              return hourIndex * 80 + minuteOffset + 24; // +24 for padding
            };

            const topPosition = getTimePosition(e.start);

            return (
              <div
                key={e.id}
                className={`absolute left-0 right-0 rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,.12)] px-4 py-4 text-white bg-gradient-to-r ${bg}`}
                style={{ top: `${topPosition}px` }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 grid place-items-center rounded-lg bg-white/15 flex-shrink-0">
                    <Icon />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-extrabold leading-5">
                      {e.kind === "event"
                        ? "Event"
                        : e.kind === "zoom"
                        ? "Zoom Meeting"
                        : "Task"}
                      : <span className="font-semibold">{e.title}</span>
                    </div>
                    {e.description && (
                      <div className="text-[13px] opacity-90 -mt-0.5">
                        Description: {e.description}
                      </div>
                    )}
                    {e.client && (
                      <div className="text-[13px] opacity-90 -mt-0.5">
                        Client: {e.client}
                      </div>
                    )}
                    <div className="text-[13px] opacity-90">
                      Due Time: {e.start}
                    </div>
                  </div>
                  <span className="ml-2 flex-shrink-0">
                    <EditIcon />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating + button */}
      <button
        className="fixed bottom-20 right-5 w-[78px] h-[78px] rounded-full bg-gradient-to-br from-[#58A9FF] to-[#2766EA] text-white text-5xl font-light shadow-xl grid place-items-center hover:scale-105 transition-transform"
        onClick={() => alert("Add new (Task / Zoom / Event)")}
      >
        +
      </button>

      {/* Bottom tabs */}
      <Footer active="Daily" />
    </div>
  );
}

/* ------- Icons (pure SVG so no extra packages) ------- */
function TaskIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19 3H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
    </svg>
  );
}
function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M17 10.5V7a2 2 0 0 0-2-2H5A2 2 0 0 0 3 7v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 2.5V8l-4 2.5Z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M7 2v2H5a2 2 0 0 0-2 2v2h18V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm14 8H3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10Z" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="m3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" />
    </svg>
  );
}

/* ------- Footer tabs (styled to match mockup) ------- */
function Footer({ active }: { active: string }) {
  return (
    <div className="fixed left-0 right-0 bottom-0 bg-[#1F66D1] px-4 py-3 flex items-center justify-between">
      <div className="flex gap-0">
        <a
          href="/calendar/today"
          className={`px-4 py-2 text-sm font-medium ${
            active === "Today"
              ? "bg-white text-[#1F66D1] rounded-md"
              : "text-white"
          }`}
        >
          Today
        </a>
        <a
          href="/calendar/daily"
          className={`px-4 py-2 text-sm font-medium ${
            active === "Daily"
              ? "bg-white text-[#1F66D1] rounded-md"
              : "text-white"
          }`}
        >
          Daily
        </a>
        <a
          href="/calendar/weekly"
          className={`px-4 py-2 text-sm font-medium ${
            active === "Weekly"
              ? "bg-white text-[#1F66D1] rounded-md"
              : "text-white"
          }`}
        >
          Weekly
        </a>
        <a
          href="/calendar/monthly"
          className={`px-4 py-2 text-sm font-medium ${
            active === "Monthly"
              ? "bg-white text-[#1F66D1] rounded-md"
              : "text-white"
          }`}
        >
          Monthly
        </a>
      </div>
      <div className="flex items-center gap-2 text-white">
        <span className="text-lg">🗓️</span>
        <span className="text-sm font-medium">Calendar</span>
        <span className="text-lg">☰</span>
      </div>
    </div>
  );
}
