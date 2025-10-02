import { Link, useLocation } from "react-router-dom";
import { tasks, zoomMeetings, events, synced } from "../../data/calendar";

export default function Calendar() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const location = useLocation();
  const currentView =
    location.pathname.includes("/daily") ? "Daily" :
    location.pathname.includes("/weekly") ? "Weekly" :
    location.pathname.includes("/monthly") ? "Monthly" : "Today";

  return (
    <div className="flex flex-col min-h-screen bg-white text-black rounded-md">
      {/* Header */}
      <header className="px-4 pt-4">
        <h1 className="text-2xl font-extrabold text-[#0E3561]">Calendar</h1>
        <p className="text-gray-600">Today’s summary</p>
        <h2 className="text-xl font-bold text-blue-700">{dateStr}</h2>
        {synced && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={20}>
            
  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
</svg>

            Synched with Google Calendar
          </div>
        )}
      </header>

      {/* Tasks */}
      <section className="px-4 mt-4">
        <h3 className="font-bold text-lg">{tasks.length} Tasks</h3>
        <div className="mt-1 space-y-2">
          {tasks.map((t, i) => (
            <div key={i} className="p-3 rounded-xl bg-green-600 text-white">
              <div className="font-semibold">Task: {t.title}</div>
              <div className="text-sm">Description: {t.desc}</div>
              <div className="text-xs">Due Time: {t.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Zoom Meetings */}
      <section className="px-4 mt-4">
        <h3 className="font-bold text-lg">{zoomMeetings.length} Zoom Meetings</h3>
        <div className="mt-1 space-y-2">
          {zoomMeetings.map((z, i) => (
            <div key={i} className="p-3 rounded-xl bg-blue-400 text-white">
              <div className="font-semibold">Zoom Meeting</div>
              <div className="text-sm">Client: {z.client}</div>
              <div className="text-xs">Time: {z.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar Events */}
      <section className="px-4 mt-4 mb-20">
        <h3 className="font-bold text-lg">{events.length} Calendar Events</h3>
        <div className="mt-1 space-y-2">
          {events.map((e, i) => (
            <div key={i} className={`p-3 rounded-xl text-white ${e.color}`}>
              <div className="font-semibold">Event: {e.title}</div>
              <div className="text-sm">Client: {e.client}</div>
              <div className="text-xs">Time: {e.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Add */}
      <button
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-3xl flex items-center justify-center shadow-lg"
      >
        +
      </button>

      {/* Footer Tabs */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t flex">
        {["Today","Daily","Weekly","Monthly"].map(v=>(
          <Link
            key={v}
            to={`/calendar/${v.toLowerCase()}`}
            className={`flex-1 text-center py-2 ${currentView===v?"bg-blue-100 font-bold":""}`}
          >
            {v}
          </Link>
        ))}
      </footer>
    </div>
  );
}
