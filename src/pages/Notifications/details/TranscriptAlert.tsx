// pages/notifications/TranscriptAlert.tsx

import { useNavigate, useParams } from "react-router-dom";
import DetailShell from "./DetailShell";
import { NOTIFICATIONS } from "../../../data/notifications";

export default function TranscriptAlert() {
  const { id } = useParams();
  const n = NOTIFICATIONS.find((x) => x.id === id)!;

  return (
    <DetailShell n={n}>
      <div className="bg-white rounded-xl p-4 shadow text-sm text-black">
        2024 Wage &amp; Income Transcript for JUAN AMARO has some records.
        Please <span className="text-blue-500 underline">review</span>.
      </div>
    </DetailShell>
  );
}
