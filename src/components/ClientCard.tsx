// src/components/ClientCard.tsx
import { SVGProps } from "react";

interface ClientCardProps {
  name: string;
  role: "Client" | "Prospect";
  color?: "blue" | "red";
  onSummary: () => void;
}

export default function ClientCard({
  name,
  role,
  color = "blue",
  onSummary,
}: ClientCardProps) {
  const avatarColor = color === "red" ? "bg-red-500" : "bg-[#1F66D1]";

  return (
    <div className="bg-white/95 rounded-2xl shadow-md px-4 py-3 flex items-center justify-between">
      {/* left side */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full ${avatarColor} grid place-items-center text-white`}
        >
          <UserIcon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[17px] font-semibold text-black/90 leading-tight">
            {name}
          </div>
          <div className="text-[13px] text-black/60">{role}</div>
        </div>
      </div>

      {/* right side */}
      <button
        onClick={onSummary}
        className="px-4 py-2 rounded-full bg-gradient-to-b from-[#2E77C5] to-[#1F66D1] text-white text-sm font-semibold shadow active:scale-95"
      >
        Summary
      </button>
    </div>
  );
}

function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="9" r="4" />
      <path d="M4 21c1.6-4 13.4-4 16 0" />
    </svg>
  );
}
