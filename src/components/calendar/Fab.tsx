import { ZOOM_CONNECTED } from "../../data/calendar";
type Props = { onTask: () => void; onZoom: () => void; onEvent: () => void; open: boolean; setOpen: (b: boolean)=>void; };

export default function Fab({ onTask, onZoom, onEvent, open, setOpen }: Props) {
  return (
    <div className="fixed right-4 bottom-24 z-20">
      {open && (
        <div className="mb-3 p-3 rounded-2xl bg-black/70 text-white w-64 space-y-2">
          <button className="w-full rounded-lg bg-green-600 px-3 py-2 text-left font-semibold"
                  onClick={onTask}>
            📋 Schedule a Task or To Do
          </button>

          <button
            className={`w-full rounded-lg px-3 py-2 text-left font-semibold ${ZOOM_CONNECTED ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"}`}
            onClick={() => ZOOM_CONNECTED && onZoom()}>
            🎥 Schedule Zoom Meeting
          </button>

          <button className="w-full rounded-lg bg-red-500 px-3 py-2 text-left font-semibold"
                  onClick={onEvent}>
            📅 Schedule Calendar Event
          </button>
        </div>
      )}
      <button
        className="w-14 h-14 rounded-full bg-blue-500 text-white grid place-items-center shadow-xl"
        onClick={() => setOpen(!open)}
        aria-label="Add"
      >
        +
      </button>
    </div>
  );
}
