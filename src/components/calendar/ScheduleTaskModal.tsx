import Modal from "./Modal";
import { useState } from "react";

export default function ScheduleTaskModal({ open, onClose }: { open: boolean; onClose: () => void; }) {
  const [client, setClient] = useState("James, LeBron");
  const [assignees, setAssignees] = useState("Adrian Orozco, Mateo Sarmiento");
  const [title, setTitle] = useState("Print Form 433-A");
  const [dueDate, setDueDate] = useState("2025-04-22");
  const [dueTime, setDueTime] = useState("09:00");
  const [caseName, setCaseName] = useState("Tax Resolution Case Investigation");
  const [priority, setPriority] = useState<"low"|"high">("low");
  const [type, setType] = useState("To Do");
  const [recurring, setRecurring] = useState(true);
  const [notes, setNotes] = useState("NOTES ARE IMPORTANT IN CALENDAR EVENT CONFIGURATION");

  return (
    <Modal open={open} onClose={onClose} title="📋 Schedule Task" color="bg-green-600">
      <Row label="Client"><input value={client} onChange={e=>setClient(e.target.value)} className="input"/></Row>
      <Row label="Assign to"><input value={assignees} onChange={e=>setAssignees(e.target.value)} className="input"/></Row>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" className="accent-green-600" defaultChecked /> <span>Select all representatives</span>
      </label>

      <Row label="Title"><input value={title} onChange={e=>setTitle(e.target.value)} className="input"/></Row>

      <div className="grid grid-cols-2 gap-3">
        <Row label="Due date"><input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} className="input"/></Row>
        <Row label="Due Time"><input type="time" value={dueTime} onChange={e=>setDueTime(e.target.value)} className="input"/></Row>
      </div>

      <Row label="Case"><input value={caseName} onChange={e=>setCaseName(e.target.value)} className="input"/></Row>

      <div className="mb-3">
        <div className="font-semibold text-sm text-[#0E3561] mb-1">Priority</div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="prio" checked={priority==="low"} onChange={()=>setPriority("low")} className="accent-green-600"/> Low
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="prio" checked={priority==="high"} onChange={()=>setPriority("high")} className="accent-green-600"/> High
          </label>
        </div>
      </div>

      <Row label="Type">
        <select value={type} onChange={e=>setType(e.target.value)} className="input">
          <option>To Do</option><option>Call</option><option>Follow Up</option>
        </select>
      </Row>

      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" checked={recurring} onChange={e=>setRecurring(e.target.checked)} className="accent-green-600"/>
        <span>Recurring</span>
      </label>

      <Row label="Notes"><textarea value={notes} onChange={e=>setNotes(e.target.value)} className="input min-h-[96px]"/></Row>

      <div className="flex items-center gap-3 justify-end">
        <button className="rounded-lg bg-slate-200 px-4 py-2 font-semibold text-[#0E3561]" onClick={onClose}>Cancel</button>
        <button className="rounded-lg bg-green-600 text-white px-4 py-2 font-semibold" onClick={onClose}>Next Step</button>
      </div>
    </Modal>
  );
}
function Row({label, children}:{label:string; children:React.ReactNode}) {
  return <label className="block space-y-1 mb-3"><div className="font-semibold text-sm text-[#0E3561]">{label}</div>{children}</label>;
}
