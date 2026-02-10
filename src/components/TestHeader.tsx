import { GraduationCap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

interface TestHeaderProps {
  startTime: number;
  totalDuration: number;
  onAutoSubmit: () => void;
  onManualSubmit: () => void;
}

const TestHeader = ({
  startTime,
  totalDuration,
  onAutoSubmit,
  onManualSubmit,
}: TestHeaderProps) => {
  const [timeLeft, setTimeLeft] = useState(totalDuration);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startTime) return;

    intervalRef.current = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, totalDuration - elapsed);

      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(intervalRef.current!);
        onAutoSubmit();
      }
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTime, totalDuration]); // 🔥 no onAutoSubmit dependency

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const color =
    timeLeft > 1800
      ? "text-green-600"
      : timeLeft > 600
      ? "text-yellow-600"
      : "text-red-600";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">CET Mock Test</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
            <Clock className="h-5 w-5" />
            <span className={`font-mono text-lg ${color}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <Button variant="destructive" onClick={onManualSubmit}>
            Submit Test
          </Button>
        </div>
      </div>
    </header>
  );
};
export default TestHeader;