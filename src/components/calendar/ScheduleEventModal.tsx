import Modal from "./Modal";
import { useState } from "react";

export default function ScheduleEventModal({ open, onClose }: { open: boolean; onClose: () => void; }) {
  const [client, setClient] = useState("James, LeBron");
  const [date, setDate] = useState("2025-04-22");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("09:30");
  const [subject, setSubject] = useState("CALENDAR EVENT CONFIGURATION");
  const [location, setLocation] = useState("RIGHT HERE");
  const [repeat, setRepeat] = useState("none");
  const [color, setColor] = useState("#EF4444");
  const [notes, setNotes] = useState("NOTES ARE IMPORTANT IN CALENDAR EVENT CONFIGURATION");
  const [remind, setRemind] = useState("5");

  return (
    <Modal open={open} onClose={onClose} title="📅 Schedule Calendar Event" color="bg-red-500">
      <FormRow label="Client">
        <input value={client} onChange={e=>setClient(e.target.value)} className="input" />
      </FormRow>

      <FormRow label="Date">
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="input"/>
      </FormRow>

      <div className="grid grid-cols-2 gap-3">
        <FormRow label="Start Time"><input type="time" value={start} onChange={e=>setStart(e.target.value)} className="input"/></FormRow>
        <FormRow label="End Time"><input type="time" value={end} onChange={e=>setEnd(e.target.value)} className="input"/></FormRow>
      </div>

      <FormRow label="Subject"><input value={subject} onChange={e=>setSubject(e.target.value)} className="input"/></FormRow>
      <FormRow label="Location"><input value={location} onChange={e=>setLocation(e.target.value)} className="input"/></FormRow>

      <FormRow label="Recurrence">
        <select value={repeat} onChange={e=>setRepeat(e.target.value)} className="input">
          <option value="none">Does not Repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </FormRow>

      <FormRow label="Select Color">
        <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="h-10 w-16 rounded-md border"/>
      </FormRow>

      <FormRow label="Notes">
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} className="input min-h-[96px]" />
      </FormRow>

      <FormRow label="Reminders">
        <select value={remind} onChange={e=>setRemind(e.target.value)} className="input">
          <option value="0">None</option>
          <option value="5">5 minutes before start</option>
          <option value="15">15 minutes before start</option>
        </select>
      </FormRow>

      <div className="pt-2 flex justify-end">
        <button className="btn-red" onClick={onClose}>Schedule Meeting</button>
      </div>
    </Modal>
  );
}

function FormRow({label, children}:{label:string; children:React.ReactNode}) {
  return (
    <label className="block space-y-1 mb-3">
      <div className="font-semibold text-sm text-[#0E3561]">{label}</div>
      {children}
    </label>
  );
}
