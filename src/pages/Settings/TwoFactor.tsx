import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, QrIcon } from "../../icons/Icons";

/**
 * 2-Factor Authentication (App OTP) screen.
 * On web we can’t open the device camera reliably without extra libs,
 * so the “Scan QR Code” button shows a friendly placeholder.
 * You can replace handleScan with your real scanner flow later.
 */
export default function TwoFactor() {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);

  function handleScan() {
    // TODO: integrate a QR scanner (e.g. @yudiel/react-qr-scanner or zxing)
    setToast(
      "Scanner placeholder: integrate camera scanner here (e.g. ZXing)."
    );
    setTimeout(() => setToast(null), 2500);
  }

  return (
    <div className=" pb-32">
      {/* Title */}

      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <header className="pt-2 pb-3">
        <h1 className="text-2xl font-extrabold text-white">
          2-Factor Authentication
        </h1>
      </header>

      {/* Instruction card */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <p className="rounded-xl bg-black/[0.04] text-[#0E3561] p-3 leading-relaxed font-semibold">
          Please scan QR Code under PitBullTax Application &gt; Settings Page
          &gt; Security Settings &gt; Enable Mobile App Authentication
        </p>

        <div className="mt-6">
          <button
            onClick={handleScan}
            className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-[#1F66D1] text-white font-extrabold text-lg px-5 py-4 active:scale-95 shadow"
          >
            <QrIcon className="w-6 h-6 text-white" />
            Scan QR Code
          </button>

          {/* Optional hint for desktop web */}
          <p className="mt-3 text-center text-[#0E3561]/70 text-sm">
            On desktop, you may need to use the mobile app to scan.
          </p>
        </div>
      </div>

      {/* Lightweight toast */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-28 z-50">
          <div className="rounded-full bg-black/80 text-white px-4 py-2 text-sm">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
