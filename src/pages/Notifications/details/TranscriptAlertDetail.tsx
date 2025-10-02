import { useParams } from "react-router-dom";
import { NOTIFICATIONS } from "../../../data/notifications";
import DetailShell from "./DetailShell";

export default function TranscriptAlertDetail() {
  const { id } = useParams();
  const n = NOTIFICATIONS.find(x => x.id === id)!;

  return (
    <DetailShell n={n}>
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-[#1F66D1] text-white">
            <tr>
              <th className="text-left px-3 py-2">Alert Date</th>
              <th className="text-left px-3 py-2">Priority</th>
              <th className="text-left px-3 py-2">Name</th>
            </tr>
          </thead>
          <tbody className="text-[#0E3561]">
            <tr className="border-t"><td className="px-3 py-2">11/12/2023</td><td className="px-3 py-2">Standard</td><td className="px-3 py-2">Lebron James</td></tr>
            <tr className="border-t"><td className="px-3 py-2">11/12/2023</td><td className="px-3 py-2">High</td><td className="px-3 py-2">Lebron James</td></tr>
          </tbody>
        </table>
      </div>
    </DetailShell>
  );
}
