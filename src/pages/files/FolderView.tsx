// src/pages/Files/FolderView.tsx
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FILETREE } from "../../data/files";
import FileRow from "../../components/files/FileRow";
import UploadFab from "../../components/files/UploadFab";
import { FolderOpen } from "../../icons/Icons";
type Params = { clientId: string; folderId: string };
export default function FolderView() {
  const navigate = useNavigate();
  const { clientId, folderId } = useParams<Params>();
  const id = Number(clientId);
console.log(clientId,folderId,'clientId');

  const folder = useMemo(() => {
    const tree = FILETREE[id];
    return tree?.rootFolders.find(f => f.id === folderId);
  }, [id, folderId]);

  const [menuFor, setMenuFor] = useState<string | null>(null); // file id

  if (!folder) {
    return (
      <div className="px-4 py-6 text-white">
        <button onClick={() => navigate(-1)} className="underline">Back</button>
        <p className="mt-3">Folder not found.</p>
      </div>
    );
  }

  function markOpened(fileId: string) {
    // demo: just close unread dot locally
    const f = folder?.files.find(x => x.id === fileId);
    if (f) f.unread = false;
  }

  function onUpload() {
    if (folder) {
      alert(`Upload to folder: ${folder.name}`);
    }
  }

  return (
    <div className="px-4 pb-32 space-y-3">
      <header className="pt-2 pb-2">
        <h1 className="text-4xl font-extrabold text-white">Files</h1>
        <button onClick={() => navigate(-1)} className="mt-1 text-white/90">
          ← Back to client
        </button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3">
        <FolderOpen className="w-7 h-7" />
        <div className="text-[18px] font-extrabold text-[#0E3561]">{folder.name}</div>
      </div>

      {folder.files.map(file => (
        <FileRow
          key={file.id}
          name={file.name}
          type={file.type}
          createdAt={file.createdAt}
          unread={file.unread}
          synced={file.synced}
          withMenu
          onOpen={() => {
            markOpened(file.id);
            alert(`Open ${file.name}`);
          }}
          onMenu={() => setMenuFor(file.id)}
        />
      ))}

      {/* Context menu (simple, inline) */}
      {menuFor && (
        <div className="fixed inset-0 z-50" onClick={() => setMenuFor(null)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-extrabold text-[#0E3561]">Actions</h3>
            <MenuButton label="Open" onClick={() => { alert("Open"); setMenuFor(null); }} />
            <MenuButton label="Share" onClick={() => { alert("Share"); setMenuFor(null); }} />
            <MenuButton label="Delete" tone="danger" onClick={() => { alert("Delete"); setMenuFor(null); }} />
            <button className="w-full mt-2 py-2 rounded-xl bg-gray-100" onClick={() => setMenuFor(null)}>Cancel</button>
          </div>
        </div>
      )}

      <UploadFab onClick={onUpload} />
    </div>
  );
}

function MenuButton({ label, onClick, tone }: { label: string; onClick: () => void; tone?: "danger" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border border-black/10 ${
        tone === "danger" ? "text-red-600" : "text-[#0E3561]"
      }`}
    >
      {label}
    </button>
  );
}
