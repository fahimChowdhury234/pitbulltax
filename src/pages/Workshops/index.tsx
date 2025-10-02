import { useMemo } from "react";
import { ALL_WORKSHOPS } from "../../data/data";
import { isUpcoming } from "../../utils/utils";
import type { WorkshopLevel } from "../../types/type";
import LevelSection from "../../components/Workshops/LevelSection";

export default function Workshops() {
  const upcoming = useMemo(
    () =>
      ALL_WORKSHOPS.filter(isUpcoming).sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
      ),
    []
  );

  const byLevel: Record<WorkshopLevel, typeof upcoming> = {
    Beginners: [],
    Intermediate: [],
    Advanced: [],
  };
  for (const w of upcoming) byLevel[w.level].push(w);

  return (
    <div className="pt-6 pb-28">
      <h1 className="text-5xl font-extrabold text-white">Annual Workshops</h1>
      <p className="text-gray-300 mt-1">
        Simultaneous Virtual and On-Site Training
      </p>

      <div className="mt-6 space-y-5">
        <LevelSection label="Beginners Level" items={byLevel.Beginners} />
        <LevelSection label="Intermediate Level" items={byLevel.Intermediate} />
        <LevelSection label="Advanced Level" items={byLevel.Advanced} />
      </div>

      <div className="mt-8">
        <a
          href="https://www.pitbulltax.com/institute/"
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-gradient-to-r from-[#2E77C5] to-[#1F66D1] text-white font-semibold shadow active:scale-95"
        >
          More Info & Registration
        </a>
      </div>
    </div>
  );
}
