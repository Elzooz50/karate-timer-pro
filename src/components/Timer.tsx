import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerProps {
  duration: number; // in seconds
  onDurationChange: (seconds: number) => void;
}

const Timer = ({ duration, onDurationChange }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const durations = [
    { label: "1:00", seconds: 60 },
    { label: "1:30", seconds: 90 },
    { label: "2:00", seconds: 120 },
    { label: "3:00", seconds: 180 },
  ];

  useEffect(() => {
    setTimeLeft(duration);
    setIsRunning(false);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning((prev) => !prev);
    }
  }, [timeLeft]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(duration);
  }, [duration]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isLowTime = timeLeft <= 10 && timeLeft > 0;
  const isTimeUp = timeLeft === 0;

  return (
    <div className="flex flex-col items-center gap-2 md:gap-4">
      {/* Timer Display */}
      <div
        className={`timer-display text-4xl md:text-6xl font-black tracking-wider ${
          isTimeUp
            ? "text-destructive"
            : isLowTime
            ? "text-warning-orange animate-pulse-glow"
            : "text-timer-gold"
        }`}
      >
        {formatTime(timeLeft)}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={toggleTimer}
          className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
            isRunning
              ? "bg-warning-orange hover:bg-warning-orange/80"
              : "bg-green-500 hover:bg-green-400"
          }`}
        >
          {isRunning ? (
            <Pause className="w-5 h-5 md:w-8 md:h-8 text-white" />
          ) : (
            <Play className="w-5 h-5 md:w-8 md:h-8 text-white ml-0.5" />
          )}
        </button>

        <button
          onClick={resetTimer}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4 md:w-6 md:h-6 text-foreground" />
        </button>
      </div>

      {/* Duration Selector */}
      <div className="flex gap-1 md:gap-2">
        {durations.map((d) => (
          <button
            key={d.seconds}
            onClick={() => onDurationChange(d.seconds)}
            disabled={isRunning}
            className={`px-2 py-1 md:px-4 md:py-2 rounded-md font-display font-bold text-xs md:text-sm transition-all duration-200 ${
              duration === d.seconds
                ? "bg-timer-gold text-black"
                : "bg-secondary text-foreground hover:bg-accent"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Timer;