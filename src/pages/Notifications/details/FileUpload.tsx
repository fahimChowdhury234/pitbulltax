// pages/notifications/FileUpload.tsx

import { useParams } from "react-router-dom";

import { NOTIFICATIONS } from "../../../data/notifications";
import DetailShell from "./DetailShell";

export default function FileUpload() {
  const { id } = useParams();
  const n = NOTIFICATIONS.find((x) => x.id === id)!;
  return (
    <DetailShell n={n}>
      <div className="bg-white text-black rounded-xl p-4 shadow text-sm space-y-1">
        <div>
          <strong>Upload date:</strong> 19/06/24
        </div>
        <div>
          <strong>File Name:</strong> f8821
        </div>
        <div>
          <strong>Size:</strong> 40.9 KB
        </div>
        <div>
          <strong>Location:</strong> My documents/Shared by Client/PERSONAL
          DOCUMENTS
        </div>
        <div>
          <strong>Type:</strong> PDF
        </div>
        <div>
          <strong>Synchronized:</strong> Yes
        </div>
      </div>
    </DetailShell>
  );
}
