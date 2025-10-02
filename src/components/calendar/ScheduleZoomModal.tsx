import Modal from "./Modal";
import { useState } from "react";

export default function ScheduleZoomModal({ open, onClose }: { open: boolean; onClose: () => void; }) {
  const [client, setClient] = useState("James, LeBron");
  const [date, setDate] = useState("2025-04-22");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("09:30");
  const [inviteWhen, setInviteWhen] = useState("15");
  const [invitation, setInvitation] = useState(
`Adrian Orozco is inviting you to a scheduled Zoom meeting.
Topic: Adrian Orozco's Personal Meeting Room

Join Zoom Meeting
https://zoom.example.com/abc
Meeting ID: 253 295 6926
Passcode: 123`
  );

  return (
    <Modal open={open} onClose={onClose} title="🎥 Schedule Zoom Meeting" color="bg-blue-400">
      <Row label="Client"><input value={client} onChange={e=>setClient(e.target.value)} className="input"/></Row>
      <Row label="Date"><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="input"/></Row>
      <div className="grid grid-cols-2 gap-3">
        <Row label="Start Time"><input type="time" value={start} onChange={e=>setStart(e.target.value)} className="input"/></Row>
        <Row label="End Time"><input type="time" value={end} onChange={e=>setEnd(e.target.value)} className="input"/></Row>
      </div>

      <Row label="Send Invitation">
        <select value={inviteWhen} onChange={e=>setInviteWhen(e.target.value)} className="input">
          <option value="0">Immediately</option>
          <option value="15">15 minutes before the meeting starts</option>
          <option value="60">1 hour before</option>
        </select>
      </Row>

      <Row label="Invitation">
        <textarea value={invitation} onChange={e=>setInvitation(e.target.value)} className="input min-h-[140px]" />
      </Row>

      <div className="flex items-center gap-3">
        <button className="rounded-lg bg-slate-200 px-3 py-2 font-semibold text-[#0E3561]" onClick={()=>navigator.clipboard.writeText(invitation)}>Copy Invitation</button>
        <div className="flex-1"></div>
        <button className="btn-red" onClick={onClose}>Schedule Meeting</button>
      </div>
    </Modal>
  );
}
function Row({label, children}:{label:string; children:React.ReactNode}) {
  return <label className="block space-y-1 mb-3"><div className="font-semibold text-sm text-[#0E3561]">{label}</div>{children}</label>;
}
