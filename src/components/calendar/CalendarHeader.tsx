type Props = {
  title?: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
};

export default function CalendarHeader({ title = "Calendar", subtitle, children }: Props) {
  return (
    <div className="px-4 pt-3">
      <h1 className="text-3xl font-extrabold text-[#0E3561]">{title}</h1>
      {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
      {children}
    </div>
  );
}
