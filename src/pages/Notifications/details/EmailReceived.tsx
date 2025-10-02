// pages/notifications/EmailReceived.tsx

import { useParams } from "react-router-dom";
import NotificationHeader from "../../../components/notifications/NotificationHeader";
import { NOTIFICATIONS } from "../../../data/notifications";
import DetailShell from "./DetailShell";

export default function EmailReceived() {
    const { id } = useParams();
  const n = NOTIFICATIONS.find((x) => x.id === id)!;
  return (
     <DetailShell n={n}>
      
      <div className="bg-white text-black rounded-xl p-4 shadow text-sm space-y-2">
        <div><strong>Date:</strong> 05/09/2024</div>
        <div><strong>From:</strong> test@mail.com</div>
        <div><strong>To:</strong> rebeca@pitbulltax.com</div>
        <div><strong>CC:</strong> </div>
        <div><strong>Subject:</strong> </div>
        <div><strong>Body:</strong></div>
        <p className="p-3 bg-gray-50 rounded">
          Hello Ana,<br />
          Hope you are well.<br />
          Please send me asap the form 8821 signed up.<br />
          Thank you<br />
          John Doe
        </p>
      </div>
    </DetailShell>
  );
}
