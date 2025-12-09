import { useState, useCallback } from "react";
import PlayerCard from "@/components/PlayerCard";
import Timer from "@/components/Timer";
import { RotateCcw } from "lucide-react";

const Index = () => {
  const [akaScore, setAkaScore] = useState(0);
  const [aoScore, setAoScore] = useState(0);
  const [akaWarnings, setAkaWarnings] = useState(0);
  const [aoWarnings, setAoWarnings] = useState(0);
  const [timerDuration, setTimerDuration] = useState(120); // 2 minutes default

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

  const resetMatch = useCallback(() => {
    setAkaScore(0);
    setAoScore(0);
    setAkaWarnings(0);
    setAoWarnings(0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

        {/* Players Section */}
        <section className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-16">
          <PlayerCard
            name="AKA"
            type="aka"
            score={akaScore}
            warnings={akaWarnings}
            onAddPoints={handleAkaAddPoints}
            onAddWarning={handleAkaAddWarning}
            onRemoveWarning={handleAkaRemoveWarning}
          />

          {/* VS Divider */}
          <div className="hidden lg:flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-gradient-to-b from-aka via-muted to-ao" />
            <span className="font-display text-2xl font-bold text-muted-foreground">
              VS
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-ao via-muted to-aka" />
          </div>

          <div className="lg:hidden font-display text-xl font-bold text-muted-foreground">
            VS
          </div>

          <PlayerCard
            name="AO"
            type="ao"
            score={aoScore}
            warnings={aoWarnings}
            onAddPoints={handleAoAddPoints}
            onAddWarning={handleAoAddWarning}
            onRemoveWarning={handleAoRemoveWarning}
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
