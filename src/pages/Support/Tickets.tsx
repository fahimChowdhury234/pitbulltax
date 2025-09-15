import { useNavigate } from "react-router-dom";
import { useMemo, useState, ChangeEvent } from "react";
import LabelValueRow from "../../components/LabelValueRow";
import { ArrowLeft, Check, Chevron, Paperclip, Play } from "../../icons/Icons";

/** Demo ticket shape */
type TicketStatus = "Open" | "Replied" | "Resolved";

interface Ticket {
  id: string;
  submittedAt: string; // display string for now
  status: TicketStatus;
  subject: string;
  message: string;
  lastUpdate?: {
    at: string;
    from: string;
    body: string;
  };
}

const DEMO_TICKETS: Ticket[] = [
  {
    id: "25080101",
    submittedAt: "7/31/2025 10:45 a.m.",
    status: "Replied",
    subject: "Issue with Client Portal",
    message:
      "I'm having trouble uploading files to the client's document folder. It gives me an error message.",
    lastUpdate: {
      at: "7/31/2025 11:00 a.m.",
      from: "PitBullTax Support",
      body:
        "Please make sure the file is under 10MB and in zip, pdf, xls, xlsx, doc, docx, csv, jpg, jpeg, png, bmp, gif, txt, rar format.",
    },
  },
  { id: "24030601", submittedAt: "6/10/2025 08:32 a.m.", status: "Open", subject: "Billing question", message: "Need clarification on invoice #8123." },
  { id: "23070203", submittedAt: "4/15/2025 13:22 a.m.", status: "Open", subject: "Feature request", message: "Please add dark mode to the portal." },
  { id: "22041408", submittedAt: "2/14/2025 09:17 a.m.", status: "Resolved", subject: "Password reset", message: "Could not reset password." },
  { id: "21270903", submittedAt: "10/22/2024 07:57 a.m.", status: "Open", subject: "Onboarding", message: "Where can I find the setup guide?" },
];

export default function Tickets() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<string | null>(DEMO_TICKETS[0].id);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const tickets = useMemo(() => DEMO_TICKETS, []);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  function onReplyChange(id: string, val: string) {
    setReplies((r) => ({ ...r, [id]: val }));
  }

  function onAttach(id: string, e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFiles((prev) => ({ ...prev, [id]: f }));
  }

  function onSend(id: string) {
    const payload = {
      ticketId: id,
      reply: replies[id] ?? "",
      file: files[id] ?? null,
    };
    console.log("SEND REPLY", payload);
    // TODO: call API
    setReplies((r) => ({ ...r, [id]: "" }));
    setFiles((prev) => ({ ...prev, [id]: null }));
  }

  function markResolved(id: string) {
    console.log("MARK RESOLVED", id);
    // TODO: call API
  }

  return (
    <div className="pb-28">
      {/* Title */}
      <header className="pt-2 pb-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-extrabold text-white">Ticket List</h1>
      </header>

      {/* List */}
      <div className="space-y-3">
        {tickets.map((t) => {
          const expanded = openId === t.id;
          return (
            <div key={t.id} className="rounded-2xl bg-white shadow-sm overflow-hidden">
              {/* Row header */}
              <button
                onClick={() => toggle(t.id)}
                className="w-full flex items-center justify-between px-4 py-3"
              >
                <div className="text-[#0E3561] font-extrabold">
                  Ticket ID: {t.id}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#0E3561]/70 text-sm">{t.submittedAt}</span>
                  <Chevron className={`w-5 h-5 text-[#1F66D1] transition ${expanded ? "rotate-180" : ""}`} />
                </div>
              </button>

              {/* Expanded body */}
              {expanded && (
                <div className="border-t border-black/5">
                  <LabelValueRow label="Ticket ID" value={t.id} />
                  <LabelValueRow label="Submitted" value={t.submittedAt} />
                  <LabelValueRow label="Status" value={t.status} />

                  <Divider />
                  <LabelValueRow label="Subject" value={t.subject} />
                  <Divider />
                  <LabelValueRow label="Message" value={t.message} multiline />

                  {t.lastUpdate && (
                    <>
                      <div className="mx-3 md:mx-4 my-3 rounded-xl bg-[#E9F2FF] p-3 text-[#0E3561]">
                        <div className="font-semibold">
                          Last Update: : {t.lastUpdate.at}
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="font-semibold">{t.lastUpdate.from} reply:</span>
                          <br />
                          {t.lastUpdate.body}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Reply input */}
                  <div className="px-4 pt-2 pb-3">
                    <label className="block text-[#0E3561] font-semibold mb-1">
                      Add a reply:
                    </label>
                    <textarea
                      value={replies[t.id] ?? ""}
                      onChange={(e) => onReplyChange(t.id, e.target.value)}
                      className="w-full rounded-xl border border-[#0E3561]/20 px-4 py-3 text-[#0E3561] focus:outline-none focus:ring-2 focus:ring-[#1F66D1]/60 min-h-[90px]"
                      placeholder="Type your reply…"
                    />
                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm bg-[#E9F2FF] text-[#0E3561] cursor-pointer">
                        <Paperclip className="w-4 h-4" />
                        Attach File
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => onAttach(t.id, e)}
                        />
                      </label>

                      <button
                        onClick={() => onSend(t.id)}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm bg-[#1F66D1] text-white font-semibold shadow active:scale-95"
                      >
                        <Play className="w-4 h-4" />
                        Send
                      </button>

                      <button
                        onClick={() => markResolved(t.id)}
                        className=" inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-green-500 text-white font-semibold shadow active:scale-95"
                      >
                        <Check className="w-5 h-5" />
                        Mark as Resolved
                      </button>
                    </div>

                    {files[t.id] && (
                      <div className="mt-1 text-sm text-[#0E3561]/80">
                        Attached: {files[t.id]?.name}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


function Divider() {
  return <div className="h-px bg-black/5 mx-4" />;
}

