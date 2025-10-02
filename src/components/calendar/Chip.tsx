type ChipProps = {
  label: string;
  sub?: string;
  colorClass: string;  // e.g. bg-green-600
  icon?: React.ReactNode;
  editable?: boolean;
};

export function Chip({ label, sub, colorClass, icon, editable }: ChipProps) {
  return (
    <div className={`${colorClass} text-white rounded-xl px-2 lg:px-4 py-2 flex items-center gap-2 shadow-sm`}>
      <div className="shrink-0">{icon}</div>
      <div className="flex-1">
        <div className="font-semibold">{label}</div>
        {sub && <div className="opacity-90 text-sm">{sub}</div>}
      </div>
      {editable && (
        <span className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={20}>
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
</svg>

        </span>
      )}
    </div>
  );
}
