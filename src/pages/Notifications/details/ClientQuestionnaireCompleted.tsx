// pages/notifications/ClientQuestionnaireCompleted.tsx

import { useParams } from "react-router-dom";
import DetailShell from "./DetailShell";
import { NOTIFICATIONS } from "../../../data/notifications";

export default function ClientQuestionnaireCompleted() {
  const { id } = useParams();
  const n = NOTIFICATIONS.find((x) => x.id === id)!;
  return (
    <DetailShell n={n}>
      {/* below you render the questionnaire HTML/iframe or text */}
      <div className="bg-white text-black rounded-xl p-4 shadow text-sm">
        {/* embed questionnaire or show text */}
        <p>… questionnaire content …</p>
        <button className="mt-4 px-4 py-2 bg-[#1F66D1] text-white rounded-xl">
          Next
        </button>
      </div>
    </DetailShell>
  );
}
