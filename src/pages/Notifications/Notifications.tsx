import { useMemo, useState } from "react";
import { NOTIFICATIONS } from "../../data/notifications";
import NotificationCard from "../../components/notifications/NotificationCard";
import Pagination from "../../components/Pagination";

const PAGE_SIZE = 5;

export default function Notifications() {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(NOTIFICATIONS.length / PAGE_SIZE));
  const slice = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return NOTIFICATIONS.slice(start, start + PAGE_SIZE);
  }, [page]);

  return (
    <div className="pb-28 space-y-4">
      <header className="pt-2">
        <h1 className="text-4xl font-extrabold text-white">Notifications</h1>
      </header>

      <button
        onClick={() => alert("All notifications cleared (hook to API).")}
        className="px-5 py-2 rounded-full bg-white text-[#0E3561] font-bold shadow"
      >
        Clear all
      </button>

      <section className="space-y-4">
        {slice.map((n) => (
          <NotificationCard key={n.id} n={n} />
        ))}
      </section>

      <section className="px-2">
        <Pagination page={page} pages={pages} onChange={setPage} />
      </section>
    </div>
  );
}
