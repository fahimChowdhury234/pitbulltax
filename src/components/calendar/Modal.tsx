type ModalProps = { title: React.ReactNode; open: boolean; onClose: () => void; children: React.ReactNode; color?: string; };

export default function Modal({ title, open, onClose, children, color = "bg-blue-500" }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="absolute inset-x-0 bottom-0 max-h-[92vh] rounded-t-2xl bg-white shadow-2xl">
        <div className={`${color} text-white px-4 py-3 rounded-t-2xl font-bold text-lg`}>
          {title}
        </div>
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
