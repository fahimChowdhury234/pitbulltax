import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { INVOICES } from "../../data/billing";

function BillBadge({
  title,
  subtitle1,
  subtitle2,
}: {
  title: string;
  subtitle1: string;
  subtitle2: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md px-4 py-3 flex items-center gap-3">
      <span className="w-10 h-10 grid place-items-center rounded-xl bg-[#1F66D1]/10 text-[#1F66D1]">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M7 3h10a2 2 0 0 1 2 2v12l-3-1-3 1-3-1-3 1V5a2 2 0 0 1 2-2Z" />
          <path d="M9 8h6M9 12h6" />
        </svg>
      </span>
      <div>
        <div className="text-2xl font-extrabold text-[#0E3561]">{title}</div>
        <div className="text-[#0E3561]">{subtitle1}</div>
        <div className="text-gray-500">{subtitle2}</div>
      </div>
    </div>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
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

function EmailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M4 6h16v12H4z" />
      <path d="m4 6 8 6 8-6" />
    </svg>
  );
}

function SmsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M21 12c0 3.866-3.582 7-8 7a9.7 9.7 0 0 1-3.5-.63L3 20l1.6-3.6A6.9 6.9 0 0 1 3 12c0-3.866 3.582-7 8-7s8 3.134 8 7Z" />
    </svg>
  );
}

export default function SendPaymentLinkCompose() {
  const navigate = useNavigate();
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const invoice = useMemo(
    () => INVOICES.find((i) => i.id === Number(invoiceId)),
    [invoiceId]
  );

  const [amount, setAmount] = useState<string>("");
  const [method, setMethod] = useState<"email" | "sms">("email");
  const [message, setMessage] = useState(
    `Dear @First Name@,
You have a pending payment for our services. Please
click on the link below to complete the payment:
@invoice_link@`
  );

  if (!invoice) {
    return (
      <div className="px-4 py-10">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center">
            <AlertIcon className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-[#0E3561] text-lg font-semibold mb-4">
            Invoice not found
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-[#1F66D1] to-[#0E3561] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const balance = invoice.balanceDue / 100;

  function onSend() {
    // demo only
    if (invoice) {
      alert(
        `Sending ${method.toUpperCase()} link for ${invoice.title}\nAmount: $${
          amount || "0.00"
        }`
      );
    }
    navigate("/billing");
  }

  return (
    <div className="px-4 pb-28 space-y-6">
      {/* Header */}
      <header className="pt-3">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1F66D1] to-[#0E3561] flex items-center justify-center shadow-lg">
            <SendIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-white">
              Send Payment Link
            </h1>
            <p className="text-white/90 text-lg">
              Compose your payment request
            </p>
          </div>
        </div>
      </header>

      {/* Invoice Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <BillBadge
          title={invoice.title}
          subtitle1={invoice.client}
          subtitle2={`Paid: ${invoice.paid ? "Yes" : "No"}`}
        />
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-[#0E3561]">
              Balance Due:
            </span>
            <span className="text-2xl font-bold text-[#0E3561]">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 space-y-6">
        {/* Amount Input */}
        <div>
          <label className="block text-lg font-semibold text-[#0E3561] mb-3">
            Payment Amount
          </label>
          <div className="flex items-center gap-3">
            <span className="px-4 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold text-lg">
              $
            </span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              inputMode="decimal"
              className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold focus:border-[#1F66D1] focus:outline-none transition-colors"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Leave empty to request full balance
          </p>
        </div>

        {/* Delivery Method */}
        <div>
          <label className="block text-lg font-semibold text-[#0E3561] mb-3">
            Delivery Method
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                method === "email"
                  ? "border-[#1F66D1] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                checked={method === "email"}
                onChange={() => setMethod("email")}
                className="w-5 h-5 text-[#1F66D1]"
              />
              <EmailIcon className="w-6 h-6 text-[#0E3561]" />
              <span className="font-semibold text-[#0E3561]">Email</span>
            </label>

            <label
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                method === "sms"
                  ? "border-[#1F66D1] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                checked={method === "sms"}
                onChange={() => setMethod("sms")}
                className="w-5 h-5 text-[#1F66D1]"
              />
              <SmsIcon className="w-6 h-6 text-[#0E3561]" />
              <span className="font-semibold text-[#0E3561]">SMS</span>
            </label>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-lg font-semibold text-[#0E3561] mb-3">
            Message
          </label>
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#1F66D1] to-[#0E3561] text-white px-4 py-3 font-semibold">
              Message Content
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full p-4 outline-none resize-none"
              placeholder="Enter your message here..."
            />
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-2">Signature:</p>
            <div className="grid grid-cols-2 gap-3">
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                value="Adrian Orozco"
                readOnly
              />
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                value="Orozco & Associates"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Send Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={onSend}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D42F2F] to-[#B91C1C] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <SendIcon className="w-5 h-5" />
            Send Payment Link
          </button>
        </div>
      </div>
    </div>
  );
}
