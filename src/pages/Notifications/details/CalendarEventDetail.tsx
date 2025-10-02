import { useParams } from "react-router-dom";
import { NOTIFICATIONS } from "../../../data/notifications";
import DetailShell from "./DetailShell";

export default function CalendarEventDetail() {
  const { id } = useParams();
  const n = NOTIFICATIONS.find(x => x.id === id)!;

  return (
    <DetailShell n={n}>
      <div className="grid gap-3">
        <LabeledInput label="Event" value="GOOGLE CALENDAR SYNC TEST" />
        <LabeledInput label="Location" value="" />
        <div className="grid grid-cols-2 gap-3">
          <LabeledInput label="Start Time" value="05/29/2025 12:00 AM" />
          <LabeledInput label="End Time" value="05/30/2025 12:00 AM" />
        </div>
        <LabeledInput label="Select Recurring" value="Does not repeat" />
        <LabeledInput label="Attendees" value="Adrian Orozco" />
        <LabeledInput label="Clients" value="" />
        <LabeledTextarea label="Notes" value="" rows={5} />
        <div className="text-sm text-gray-500">Reminder: None</div>
      </div>
    </DetailShell>
  );
}

function LabeledInput({ label, value }: { label: string; value: string }) {
  return (
    <label className="text-sm font-semibold text-[#0E3561]">
      {label}
      <input disabled value={value} className="mt-1 w-full rounded-xl bg-gray-100/80 px-3 py-2" />
    </label>
  );
}
function LabeledTextarea({ label, value, rows=4 }: { label: string; value: string; rows?: number }) {
  return (
    <label className="text-sm font-semibold text-[#0E3561]">
      {label}
      <textarea disabled rows={rows} value={value} className="mt-1 w-full rounded-xl bg-gray-100/80 px-3 py-2" />
    </label>
  );
}
