import CalendarHeader from "../../components/calendar/CalendarHeader";
import { CAL_ITEMS } from "../../data/calendar";
import { Chip } from "../../components/calendar/Chip";
import { useMemo, useState } from "react";
import Fab from "../../components/calendar/Fab";
import ScheduleEventModal from "../../components/calendar/ScheduleEventModal";
import ScheduleZoomModal from "../../components/calendar/ScheduleZoomModal";
import ScheduleTaskModal from "../../components/calendar/ScheduleTaskModal";

const today = "2025-04-22"; // keep in sync with demo data

export default function CalendarToday() {
  const [fabOpen, setFabOpen] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [showTask, setShowTask] = useState(false);

  const todays = useMemo(() => CAL_ITEMS.filter(i => i.date === today), []);
  const tasks = todays.filter(i => i.kind === "task");
  const zooms = todays.filter(i => i.kind === "zoom");
  const events = todays.filter(i => i.kind === "event");

  return (
    <div className="pb-28">
    <div className="flex flex-col pb-12 bg-white text-black rounded-md">

      <CalendarHeader subtitle={<div className="mt-2">
          <div className="text-blue-600 font-bold text-xl">Friday 22 April 2025</div>
          <div className="text-xs mt-1 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={20} className="text-green-600">
  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
</svg>

             Synched with Google Calendar</div>
        </div>}
      />

      <Section title={`${tasks.length} Tasks`}>
        <div className="space-y-2">
          {tasks.map(t => (
            <Chip key={t.id}
              colorClass="bg-green-600"
              label={`Task: ${t.title}`}
              sub={`Description: ${t.description}  •  Due Time: ${t.start}`}
              icon={<span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={20}>
  <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd" />
  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
</svg>

              </span>}
              editable
            />
          ))}
        </div>
      </Section>

      <Section title={`${zooms.length} Zoom Meetings`}>
        <div className="space-y-2">
          {zooms.map(z => (
            <Chip key={z.id}
              colorClass="bg-blue-400"
              label={`${z.title}`}
              sub={`Client: ${z.client}  •  Time: ${fmt(z.start)} - ${fmt(z.end)}`}
              icon={<span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={20}>
  <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
</svg>

              </span>}
              editable
            />
          ))}
        </div>
      </Section>

      <Section title={`${events.length} Calendar Events`}>
        <div className="space-y-2">
          {events.map(e => (
            <Chip key={e.id}
              colorClass={e.color ?? "bg-red-500"}
              label={`Event: ${e.title}`}
              sub={`Client: ${e.client}  •  Time: ${fmt(e.start)} - ${fmt(e.end)}`}
              icon={<span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={20}>
  <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
  <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
</svg>

              </span>}
              editable
            />
          ))}
        </div>
      </Section>

      <Footer active="Today" />

      <Fab
        open={fabOpen} setOpen={setFabOpen}
        onTask={()=>setShowTask(true)} onZoom={()=>setShowZoom(true)} onEvent={()=>setShowEvent(true)}
      />

      <ScheduleEventModal open={showEvent} onClose={()=>setShowEvent(false)} />
      <ScheduleZoomModal  open={showZoom}  onClose={()=>setShowZoom(false)} />
      <ScheduleTaskModal  open={showTask}  onClose={()=>setShowTask(false)} />
        </div>
    </div>
  );
}

function fmt(hm: string){ // "07:00" -> "7:00AM"
  const [h,m] = hm.split(":").map(Number);
  const am = h < 12;
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2,"0")}${am?"AM":"PM"}`;
}
function Section({title, children}:{title:string; children:React.ReactNode}){
  return (
    <section className="px-4 mt-4">
      <div className="text-[#0E3561] font-extrabold mb-2">{title}</div>
      {children}
    </section>
  );
}
/* ------- Footer tabs (kept from your version, styled to match) ------- */
function Footer({active}:{active:string}){
  const mk=(l:string,u:string,on:boolean)=><a href={u} className={`px-4 py-2 rounded-md ${on?"bg-blue-100 text-blue-700":"text-[#0E3561]"}`}>{l}</a>;
  return (
    <div className="fixed left-0 right-0 bottom-[86px] mx-3 rounded-3xl bg-white border-t px-4 py-3 flex items-center gap-2 justify-between">
      <div className="flex gap-2">
        {mk("Today","/calendar/today", active==="Today")}
        {mk("Daily","/calendar/daily", active==="Daily")}
        {mk("Weekly","/calendar/weekly", active==="Weekly")}
        {mk("Monthly","/calendar/monthly", active==="Monthly")}
      </div>
      <div className="px-3 py-2 rounded-md bg-[#1F66D1] text-white">🗓️ Calendar</div>
    </div>
  );
}
