import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCountdown from "../../../hooks/useCountdown";

export default function Connect() {
  const nav = useNavigate();
  const [online, setOnline] = useState(false);
  const { mm, ss, reset } = useCountdown(60 * 60, online); // 60 minutes

  const circleBase =
    "w-56 h-56 rounded-full grid place-items-center text-white font-extrabold shadow-xl";
  const ringBase = "w-72 h-72 rounded-full grid place-items-center mx-auto";

  return (
    <div className="px-4 pb-28 space-y-8">
      <header className="pt-2">
        <h1 className="text-4xl font-extrabold text-white">Request Transcripts</h1>
        <p className="text-white/85 mt-2">Connect to IRS e-services</p>
      </header>

      <div className={`${ringBase} ${online ? "bg-green-200/60" : "bg-red-200/60"}`}>
        <button
          onClick={() => setOnline((v) => !v)}
          className={`${circleBase} ${online ? "bg-green-600" : "bg-red-600"} active:scale-95`}
        >
          {online ? (
            <div className="text-center">
              <div className="text-2xl">Connected</div>
              <div className="text-sm mt-1">Online</div>
              <div className="text-xl mt-1">{mm}:{ss}</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-2xl">Connect</div>
              <div className="text-sm mt-1">Offline</div>
            </div>
          )}
        </button>
      </div>

      {/* footer actions */}
      <div className="fixed left-0 right-0 bottom-20 px-4 flex gap-3">
        <button
          onClick={() => {
            setOnline(false);
            reset();
          }}
          className="flex-1 h-12 rounded-2xl bg-white/90 text-[#0E3561] font-semibold shadow"
        >
          Disconnect
        </button>
        <button
          onClick={() => nav("/transcripts/request/select-client")}
          className="flex-1 h-12 rounded-2xl bg-[#1F66D1] text-white font-semibold shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
}
