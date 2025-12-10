import { useState, useEffect } from "react";

interface PlayerCardProps {
  name: string;
  type: "aka" | "ao";
  score: number;
  warnings: number;
  hasSensho: boolean;
  onAddPoints: (points: number) => void;
  onAddWarning: () => void;
  onRemoveWarning: () => void;
  onToggleSensho: () => void;
}

const getWarningLabel = (level: number): string => {
  if (level <= 3) return `CHUI ${level}`;
  if (level === 4) return "HANSOKU CHUI";
  return "HANSOKU";
};

const PlayerCard = ({
  name,
  type,
  score,
  warnings,
  hasSensho,
  onAddPoints,
  onAddWarning,
  onRemoveWarning,
  onToggleSensho,
}: PlayerCardProps) => {
  const [isScoreAnimating, setIsScoreAnimating] = useState(false);
  const isAka = type === "aka";

  useEffect(() => {
    if (score > 0) {
      setIsScoreAnimating(true);
      const timer = setTimeout(() => setIsScoreAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [score]);

  return (
    <div
      className={`${isAka ? "aka-card" : "ao-card"} rounded-xl p-3 md:p-6 flex flex-col items-center gap-2 md:gap-4 w-full max-w-[320px]`}
    >
      {/* Player Name & Sensho */}
      <div className="flex items-center gap-2">
        <h2 className="font-display text-lg md:text-2xl font-bold text-white tracking-wider">
          {name}
        </h2>
        <button
          onClick={onToggleSensho}
          className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
            hasSensho
              ? "bg-sensho text-black shadow-[0_0_12px_hsl(var(--sensho)/0.6)]"
              : "bg-white/20 text-white/60 hover:bg-white/30"
          }`}
        >
          先取
        </button>
      </div>

      {/* Score Display */}
      <div
        className={`font-display text-5xl md:text-8xl font-black text-white ${
          isScoreAnimating ? "animate-score-pop" : ""
        }`}
      >
        {score}
      </div>

      {/* Point Buttons */}
      <div className="flex gap-2 md:gap-3">
        {[1, 2, 3].map((points) => (
          <button
            key={points}
            onClick={() => onAddPoints(points)}
            className={`${
              isAka ? "point-btn-aka" : "point-btn-ao"
            } w-11 h-11 md:w-14 md:h-14 rounded-lg text-lg md:text-xl text-white`}
          >
            +{points}
          </button>
        ))}
      </div>

      {/* Warnings Section */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <span className="text-white/80 font-medium text-[10px] md:text-sm uppercase tracking-wide">
            Warnings
          </span>
          <div className="flex gap-1">
            <button
              onClick={onRemoveWarning}
              disabled={warnings === 0}
              className="w-6 h-6 md:w-8 md:h-8 rounded-md bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              −
            </button>
            <button
              onClick={onAddWarning}
              disabled={warnings >= 5}
              className="w-6 h-6 md:w-8 md:h-8 rounded-md bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        {/* Warning Indicators */}
        <div className="flex gap-1 md:gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((level) => {
            const isActive = warnings >= level;
            let bgColor = "bg-white/20";
            let activeColor = "";

            if (level <= 3) {
              activeColor = "bg-warning-yellow text-black";
            } else if (level === 4) {
              activeColor = "bg-warning-red text-white";
            } else {
              activeColor = "bg-warning-orange text-white";
            }

            return (
              <div
                key={level}
                className={`warning-indicator w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center font-display font-bold text-[10px] md:text-xs ${
                  isActive ? `${activeColor} warning-active` : bgColor
                }`}
              >
                {level <= 3 ? `C${level}` : level === 4 ? "HC" : "H"}
              </div>
            );
          })}
        </div>

        {/* Current Warning Label */}
        {warnings > 0 && (
          <div className="mt-1 md:mt-2 text-center">
            <span
              className={`font-display font-bold text-[10px] md:text-sm px-2 py-0.5 rounded-full ${
                warnings <= 3
                  ? "bg-warning-yellow text-black"
                  : warnings === 4
                  ? "bg-warning-red text-white"
                  : "bg-warning-orange text-white"
              }`}
            >
              {getWarningLabel(warnings)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;