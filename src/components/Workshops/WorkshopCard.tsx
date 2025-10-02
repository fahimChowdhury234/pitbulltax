import { formatRange } from "../../utils/utils";
import type { Workshop } from "../../types/type";

type Props = { label: string; workshop: Workshop };

export default function WorkshopCard({ label, workshop }: Props) {
  return (
    <div className="rounded-2xl bg-white shadow p-4 ring-1 ring-black/5">
      <div className="text-2xl font-extrabold text-[#0E3561]">{label}</div>
      <div className="text-[#0E3561]/70 font-medium">{workshop.title}</div>

      <div className="mt-4 flex items-start gap-3">
        <span className="text-[#1F66D1]">
          <CalendarIcon className="w-6 h-6" />
        </span>

        <div className="flex-1">
          <div className="text-[#0E3561] font-semibold">
            {formatRange(workshop.start, workshop.end)}
          </div>

          <ul className="mt-2 space-y-1 text-[#0E3561]">
            {workshop.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>{b}</span>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>{workshop.price}</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() =>
            window.open("https://www.pitbulltax.com/institute/", "_blank")
          }
          className="self-center px-6 py-2 rounded-2xl bg-[#1F66D1] text-white font-semibold shadow shrink-0"
        >
          Select
        </button>
      </div>
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 2a1 1 0 0 0-1 1v1H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-1-1ZM4 9h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9Z" />
    </svg>
  );
}
