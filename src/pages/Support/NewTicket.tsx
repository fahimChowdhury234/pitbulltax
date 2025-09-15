import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import { ArrowLeft, PaperclipIcon } from "../../icons/Icons";

const departments = [
  "Customer Service",
  "Technical Support",
  "Sales",
  "Suggestion & Feedback",
];

export default function NewTicket() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [authorize, setAuthorize] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // handle form submission logic here
    console.log({ department, subject, message, optIn, authorize, file });
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className="pb-28">
      <header className="pt-2 pb-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-extrabold text-white">
          Submit a Ticket
        </h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded-2xl shadow p-5"
      >
        {/* Department */}
        <div>
          <label className="block mb-1 text-[#0E3561] font-semibold">
            Department:
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full rounded-xl border border-[#0E3561]/20 px-4 py-3 text-[#0E3561] focus:outline-none focus:ring-2 focus:ring-[#1F66D1]/60"
            required
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-[#0E3561]/20 px-4 py-3 text-[#0E3561] focus:outline-none focus:ring-2 focus:ring-[#1F66D1]/60"
            required
          />
        </div>

        {/* Message */}
        <div>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl border border-[#0E3561]/20 px-4 py-3 text-[#0E3561] focus:outline-none focus:ring-2 focus:ring-[#1F66D1]/60 min-h-[120px]"
            required
          />
        </div>

        {/* Attach File */}
        <div>
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f1f3f5] text-[#0E3561] cursor-pointer">
            <PaperclipIcon className="w-4 h-4" />
            Attach File
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {file && (
            <div className="mt-1 text-sm text-[#0E3561]/80">
              Attached: {file.name}
            </div>
          )}
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 text-[#0E3561]">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
            />
            I opt-in to receive SMS or emails
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={authorize}
              onChange={(e) => setAuthorize(e.target.checked)}
            />
            I authorize to login to my account
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-xl bg-gray-200 text-[#0E3561] font-semibold shadow active:scale-95"
          >
            ✕ Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-green-500 text-white font-semibold shadow active:scale-95"
          >
            ✓ Submit
          </button>
        </div>
      </form>
    </div>
  );
}


