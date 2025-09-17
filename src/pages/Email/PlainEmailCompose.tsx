import { useParams, useNavigate } from "react-router-dom";
import { CLIENTS } from "../../data/clients";
import { useState } from "react";

export default function PlainEmailCompose() {
  const { clientId } = useParams();
  const nav = useNavigate();
  const client = CLIENTS.find((c) => String(c.id) === String(clientId));

  const [from, setFrom] = useState("SECOND ACCOUNT");
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [copy, setCopy] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  function send() {
    // here you would call your API
    alert(`Email sent to: ${to || client?.name}\nSubject: ${subject}`);
    nav(-1);
  }

  return (
    <div className=" py-6 pb-28">
      <button onClick={() => nav(-1)} className="text-white mb-2">&larr; Back</button>
      <h1 className="text-4xl font-extrabold text-white">Plain Email</h1>
      <p className="text-gray-300 mt-1">Prepare the Email</p>

      <div className="mt-4 bg-white text-black rounded-2xl shadow p-4 space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b">
          <span className="w-10 h-10 rounded-full bg-[#1F66D1] text-white grid place-items-center">👤</span>
          <div>
            <div className="font-extrabold text-[#0E3561]">{client?.name}</div>
            <div className="text-sm text-gray-500">adrian@pitbulltax.com</div>
          </div>
        </div>

        <Field label="From:">
          <select
            className="w-full rounded-xl border px-3 py-2"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option>SECOND ACCOUNT</option>
            <option>MAIN ACCOUNT</option>
          </select>
        </Field>

        <Field label="To:">
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="email@client.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </Field>

        <Field label="Cc:">
          <input className="w-full rounded-xl border px-3 py-2" value={cc} onChange={(e) => setCc(e.target.value)} />
        </Field>

        <Field label="Bcc:">
          <input className="w-full rounded-xl border px-3 py-2" value={bcc} onChange={(e) => setBcc(e.target.value)} />
        </Field>

        <label className="flex items-center gap-2 text-[#0E3561]">
          <input type="checkbox" checked={copy} onChange={(e) => setCopy(e.target.checked)} />
          Email me a copy
        </label>

        <Field label="Subject:">
          <input className="w-full rounded-xl border px-3 py-2" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </Field>

        <div>
          <div className="text-sm font-semibold text-[#0E3561] mb-1">Message</div>
          <textarea
            className="w-full rounded-xl border px-3 py-2 min-h-[160px]"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={() => nav(-1)}
          className="px-5 py-3 rounded-xl bg-gray-200 text-[#0E3561] font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={send}
          className="px-6 py-3 rounded-xl bg-[#D33] text-white font-semibold"
        >
          ✈️ Send
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm font-semibold text-[#0E3561] mb-1">{label}</div>
      {children}
    </div>
  );
}
