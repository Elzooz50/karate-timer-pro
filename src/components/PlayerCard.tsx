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
  if (level === 4) return "HANSOKU";
  return "HANSOKU CHUI";
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
      className={`${isAka ? "aka-card" : "ao-card"} rounded-2xl p-6 md:p-8 flex flex-col items-center gap-4 md:gap-6 min-w-[280px] md:min-w-[320px]`}
    >
      {/* Player Name & Sensho */}
      <div className="flex items-center gap-3">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wider">
          {name}
        </h2>
        <button
          onClick={onToggleSensho}
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
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
        className={`font-display text-7xl md:text-9xl font-black text-white ${
          isScoreAnimating ? "animate-score-pop" : ""
        }`}
      >
        {score}
      </div>

      {/* Point Buttons */}
      <div className="flex gap-3 md:gap-4">
        {[1, 2, 3].map((points) => (
          <button
            key={points}
            onClick={() => onAddPoints(points)}
            className={`${
              isAka ? "point-btn-aka" : "point-btn-ao"
            } w-14 h-14 md:w-16 md:h-16 rounded-xl text-xl md:text-2xl text-white`}
          >
            +{points}
          </button>
        ))}
      </div>

      {/* Warnings Section */}
      <div className="w-full mt-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/80 font-medium text-sm uppercase tracking-wide">
            Warnings
          </span>
          <div className="flex gap-2">
            <button
              onClick={onRemoveWarning}
              disabled={warnings === 0}
              className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              −
            </button>
            <button
              onClick={onAddWarning}
              disabled={warnings >= 5}
              className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        {/* Warning Indicators */}
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((level) => {
            const isActive = warnings >= level;
            let bgColor = "bg-white/20";
            let activeColor = "";

            if (level <= 3) {
              activeColor = "bg-warning-yellow text-black";
            } else if (level === 4) {
              activeColor = "bg-warning-orange text-white";
            } else {
              activeColor = "bg-warning-red text-white";
            }

            return (
              <div
                key={level}
                className={`warning-indicator w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-display font-bold text-xs md:text-sm ${
                  isActive ? `${activeColor} warning-active` : bgColor
                }`}
              >
                {level <= 3 ? `C${level}` : level === 4 ? "H" : "HC"}
              </div>
            );
          })}
        </div>

        {/* Current Warning Label */}
        {warnings > 0 && (
          <div className="mt-3 text-center">
            <span
              className={`font-display font-bold text-sm md:text-base px-4 py-1 rounded-full ${
                warnings <= 3
                  ? "bg-warning-yellow text-black"
                  : warnings === 4
                  ? "bg-warning-orange text-white"
                  : "bg-warning-red text-white"
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
