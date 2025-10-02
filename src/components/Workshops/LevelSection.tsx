import WorkshopCard from "./WorkshopCard";
import type { Workshop } from "../../types/type";

type Props = { label: string; items: Workshop[] };

export default function LevelSection({ label, items }: Props) {
  if (!items.length) return null;
  return (
    <section className="space-y-4">
      {items.map((w) => (
        <WorkshopCard key={w.id} label={label} workshop={w} />
      ))}
    </section>
  );
}
