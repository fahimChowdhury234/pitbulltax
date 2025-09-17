import { useParams, useNavigate } from "react-router-dom";
import { CLIENTS } from "../../data/clients";
import { useState } from "react";

const SECTIONS = [
  "All pages","Taxpayer","Spouse","Dependents","IRS Liability","Circumstances","Marital Status",
  "Employment","Investments","Other Information","Credit Cards","Life Insurance","Real Estate",
  "Vehicles","Personal Assets","Monthly Income","Monthly Expenses","Business(es)","Disclosure",
  "Communications Opt-in"
];

export default function QuestionnaireCompose() {
  const { clientId } = useParams();
  const nav = useNavigate();
  const client = CLIENTS.find((c) => String(c.id) === String(clientId));

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [copy, setCopy] = useState(false);
  const [lang, setLang] = useState<"en" | "es">("en");
  const [picked, setPicked] = useState<string[]>(["All pages"]);

  function toggle(p: string) {
    setPicked((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  function send() {
    alert(`Questionnaire sent to ${to || client?.name} (${lang}) with ${picked.length} sections.`);
    nav(-1);
  }

  return (
    <div className="px-4 py-6 pb-28">
      <button onClick={() => nav(-1)} className="text-white mb-2">&larr; Back</button>
      <h1 className="text-4xl font-extrabold text-white">Client Questionnaire</h1>
      <p className="text-gray-300 mt-1">Prepare the Email</p>

      <div className="mt-4 bg-white rounded-2xl shadow p-4 space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b">
          <span className="w-10 h-10 rounded-full bg-[#1F66D1] text-white grid place-items-center">👤</span>
          <div>
            <div className="font-extrabold text-[#0E3561]">{client?.name}</div>
            <div className="text-sm text-gray-500">adrian@pitbulltax.com</div>
          </div>
        </div>

        <Field label="To:">
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="email@client.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </Field>

        <label className="flex items-center gap-2 text-[#0E3561]">
          <input type="checkbox" checked={copy} onChange={(e) => setCopy(e.target.checked)} />
          Email me a copy
        </label>

        <Field label="Subject:">
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Client Questionnaire"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Field>

        <div className="pt-2">
          <div className="text-sm font-semibold text-[#0E3561]">Show sections in:</div>
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                lang === "en" ? "bg-[#1F66D1] text-white" : "bg-gray-200 text-[#0E3561]"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("es")}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                lang === "es" ? "bg-[#1F66D1] text-white" : "bg-gray-200 text-[#0E3561]"
              }`}
            >
              Spanish
            </button>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-[#0E3561] mb-2">Select pages:</div>
          <div className="grid grid-cols-2 gap-2">
            {SECTIONS.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 rounded-lg border px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={picked.includes(s)}
                  onChange={() => toggle(s)}
                />
                <span className="text-sm text-[#0E3561]">{s}</span>
              </label>
            ))}
          </div>
        </div>

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
