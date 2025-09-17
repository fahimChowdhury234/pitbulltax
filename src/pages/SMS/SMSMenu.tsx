import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "../../icons/Icons";

export default function SMSMenu() {
  const navigate = useNavigate();
  return (
    <div className="py-4 space-y-4">
      <header className="flex justify-between items-center flex-wrap">
        <div>
            <div className="flex items-center gap-2">
                 <button
                      onClick={() => navigate(-1)}
                      className="p-2 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
            <h1 className="text-4xl font-extrabold text-white">SMS</h1>
            </div>
        <p className="text-gray-300">Select what type of SMS you need to send</p>
        </div>
        <div className="p-2 rounded-md bg-white">
            <p className="text-red-700 text-right text-base font-bold">800 SMS Remaining</p>
        </div>
      </header>

      {[
        { label: "Single SMS", path: "/sms/single" },
        { label: "SMS Broadcast", path: "/sms/blast" },
        { label: "SMS History", path: "/sms/history", btn: "View" },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between bg-white rounded-2xl shadow p-4"
        >
          <div className="font-semibold text-[#0E3561]">{item.label}</div>
          <button
            onClick={() => navigate(item.path)}
            className="px-4 py-2 bg-[#1F66D1] text-white rounded-full"
          >
            {item.btn || "Send"}
          </button>
        </div>
      ))}
    </div>
  );
}
