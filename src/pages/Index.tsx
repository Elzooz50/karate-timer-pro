import { useState, useCallback, useMemo } from "react";
import PlayerCard from "@/components/PlayerCard";
import Timer from "@/components/Timer";
import { RotateCcw, Trophy } from "lucide-react";

const Index = () => {
  const [akaScore, setAkaScore] = useState(0);
  const [aoScore, setAoScore] = useState(0);
  const [akaWarnings, setAkaWarnings] = useState(0);
  const [aoWarnings, setAoWarnings] = useState(0);
  const [sensho, setSensho] = useState<"aka" | "ao" | null>(null);
  const [timerDuration, setTimerDuration] = useState(120); // 2 minutes default

  // Check if match ended due to 8-point difference
  const matchResult = useMemo(() => {
    const diff = Math.abs(akaScore - aoScore);
    if (diff >= 8) {
      return akaScore > aoScore ? "aka" : "ao";
    }
    return null;
  }, [akaScore, aoScore]);

  const handleAkaAddPoints = useCallback((points: number) => {
    setAkaScore((prev) => prev + points);
  }, []);

  const handleAoAddPoints = useCallback((points: number) => {
    setAoScore((prev) => prev + points);
  }, []);

  const handleAkaAddWarning = useCallback(() => {
    setAkaWarnings((prev) => Math.min(prev + 1, 5));
  }, []);

  const handleAoAddWarning = useCallback(() => {
    setAoWarnings((prev) => Math.min(prev + 1, 5));
  }, []);

  const handleAkaRemoveWarning = useCallback(() => {
    setAkaWarnings((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleAoRemoveWarning = useCallback(() => {
    setAoWarnings((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleToggleAkaSensho = useCallback(() => {
    setSensho((prev) => (prev === "aka" ? null : "aka"));
  }, []);

  const handleToggleAoSensho = useCallback(() => {
    setSensho((prev) => (prev === "ao" ? null : "ao"));
  }, []);

  const resetMatch = useCallback(() => {
    setAkaScore(0);
    setAoScore(0);
    setAkaWarnings(0);
    setAoWarnings(0);
    setSensho(null);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Match End Overlay */}
      {matchResult && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
          <div className="text-center space-y-6">
            <Trophy className={`w-24 h-24 mx-auto ${matchResult === "aka" ? "text-aka" : "text-ao"} animate-pulse`} />
            <h2 className="font-display text-4xl md:text-6xl font-black text-white">
              MATCH ENDED
            </h2>
            <p className={`font-display text-3xl md:text-5xl font-bold ${matchResult === "aka" ? "text-aka" : "text-ao"}`}>
              {matchResult === "aka" ? "AKA" : "AO"} WINS!
            </p>
            <p className="text-white/60 text-xl">
              {akaScore} - {aoScore} (8+ point difference)
            </p>
            <button
              onClick={resetMatch}
              className="mt-8 flex items-center gap-2 px-8 py-4 rounded-xl bg-sensho hover:bg-sensho/80 transition-colors text-black font-bold text-lg mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              New Match
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="py-4 md:py-6 px-4 flex items-center justify-between border-b border-border">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wider">
          KARATE SCOREBOARD
        </h1>
        <button
          onClick={resetMatch}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-accent transition-colors text-foreground font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden md:inline">Reset Match</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-12 p-4 md:p-8">
        {/* Timer Section */}
        <section className="w-full max-w-md">
          <Timer duration={timerDuration} onDurationChange={setTimerDuration} />
        </section>

        {/* Players Section - AO on left, AKA on right */}
        <section className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-16">
          <PlayerCard
            name="AO"
            type="ao"
            score={aoScore}
            warnings={aoWarnings}
            hasSensho={sensho === "ao"}
            onAddPoints={handleAoAddPoints}
            onAddWarning={handleAoAddWarning}
            onRemoveWarning={handleAoRemoveWarning}
            onToggleSensho={handleToggleAoSensho}
          />

          {/* VS Divider */}
          <div className="hidden lg:flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-gradient-to-b from-ao via-muted to-aka" />
            <span className="font-display text-2xl font-bold text-muted-foreground">
              VS
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-aka via-muted to-ao" />
          </div>

          <div className="lg:hidden font-display text-xl font-bold text-muted-foreground">
            VS
          </div>

          <PlayerCard
            name="AKA"
            type="aka"
            score={akaScore}
            warnings={akaWarnings}
            hasSensho={sensho === "aka"}
            onAddPoints={handleAkaAddPoints}
            onAddWarning={handleAkaAddWarning}
            onRemoveWarning={handleAkaRemoveWarning}
            onToggleSensho={handleToggleAkaSensho}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-muted-foreground text-sm">
        <p>Tap point buttons to score • Use +/− to manage warnings</p>
      </footer>
    </div>
  );
};

export default Index;
