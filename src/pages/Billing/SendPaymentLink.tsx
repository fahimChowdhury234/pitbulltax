import { INVOICES } from "../../data/billing";

import { useNavigate } from "react-router-dom";

function BillIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M7 3h10a2 2 0 0 1 2 2v12l-3-1-3 1-3-1-3 1V5a2 2 0 0 1 2-2Z" />
      <path d="M9 8h6M9 12h6" />
      <path d="M12 16v-8" opacity=".12" />
    </svg>
  );
}

function LinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22,2 15,22 11,13 2,9 22,2" />
    </svg>
  );
}

function StatusDot({ paid }: { paid: boolean }) {
  return (
    <div
      className={`w-2 h-2 rounded-full ${
        paid ? "bg-green-500" : "bg-amber-500"
      }`}
    />
  );
}

export default function SendPaymentLinkList() {
  const navigate = useNavigate();

  return (
    <div className="px-4 pb-28">
      {/* Header */}
      <header className="pt-3 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1F66D1] to-[#0E3561] flex items-center justify-center shadow-lg">
            <LinkIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-white">
              Send Payment Link
            </h1>
            <p className="text-white/90 text-lg">
              Select an invoice to send payment request
            </p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <FileIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Total Invoices</p>
              <p className="text-white font-bold text-xl">{INVOICES.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Unpaid</p>
              <p className="text-white font-bold text-xl">
                {INVOICES.filter((inv) => !inv.paid).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="space-y-4">
        {INVOICES.map((inv) => (
          <div
            key={inv.id}
            className="bg-white rounded-2xl shadow-lg px-6 py-4 flex items-center justify-between hover:shadow-xl transition-all duration-200 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1F66D1] to-[#0E3561] flex items-center justify-center">
                <BillIcon />
              </div>
              <div>
                <div className="text-xl font-bold text-[#0E3561]">
                  {inv.title}
                </div>
                <div className="text-[#0E3561] font-medium">{inv.client}</div>
                <div className="flex items-center gap-2 mt-1">
                  <StatusDot paid={inv.paid} />
                  <span className="text-sm text-gray-500">
                    {inv.paid ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/billing/send-link/${inv.id}`)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1F66D1] to-[#0E3561] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <SendIcon className="w-4 h-4" />
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
