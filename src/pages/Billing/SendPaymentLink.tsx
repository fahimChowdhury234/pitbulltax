import { useState } from "react";

export default function SendPaymentLink() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="px-4 pb-28 space-y-4">
      <header className="pt-2">
        <h1 className="text-4xl font-extrabold text-white">Send Payment Link</h1>
        <p className="text-white/90 mt-1">Send a secure payment link to your client.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-md p-4 space-y-3">
        <label className="block">
          <span className="text-[#0E3561] font-semibold">Client Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl bg-white/90 border border-black/10 px-3 py-2"
            placeholder="client@email.com"
          />
        </label>
        <label className="block">
          <span className="text-[#0E3561] font-semibold">Amount</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full rounded-xl bg-white/90 border border-black/10 px-3 py-2"
            placeholder="0.00"
          />
        </label>

        <div className="pt-2 flex gap-3">
          <button className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 font-semibold">Cancel</button>
          <button
            className="flex-1 py-3 rounded-2xl bg-[#1F66D1] text-white font-bold"
            onClick={() => alert(`Send $${amount || "0"} link to ${email || "—"}`)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
