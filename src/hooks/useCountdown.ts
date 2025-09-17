import { useEffect, useRef, useState } from "react";

export default function useCountdown(startSeconds: number, isRunning: boolean) {
  const [seconds, setSeconds] = useState(startSeconds);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
      setSeconds(startSeconds);
      return;
    }
    timerRef.current = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [isRunning, startSeconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return { seconds, mm, ss, reset: () => setSeconds(startSeconds) };
}
