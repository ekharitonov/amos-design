import { useState, useCallback } from "react";
import NetGraph from "../NetGraph";
import { EdgeData, bridgeDetails } from "../DashboardData";

export default function PageBridges() {
  const [selectedEdgeKey, setSelectedEdgeKey] = useState<string | null>("a1-ms");

  const handleSelectEdge = useCallback((_edge: EdgeData, key: string) => {
    setSelectedEdgeKey(prev => prev === key ? null : key);
  }, []);

  const detail = selectedEdgeKey ? bridgeDetails[selectedEdgeKey] : null;

  const tensionColor = (level?: string) => {
    switch (level) {
      case "low": return "text-amos-green bg-amos-green/15 border-amos-green/30";
      case "high": return "text-amos-red bg-amos-red/15 border-amos-red/30";
      default: return "text-primary bg-primary/10 border-accent-dim";
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4 sm:mb-6 flex-wrap gap-3">
        <h2 className="font-display text-lg sm:text-[22px] font-bold">Изнанка: Слой III — Мосты</h2>
      </div>

      <div className="bg-surface border border-border rounded-xl sm:rounded-2xl p-3 sm:p-6 lg:p-8">
        <h3 className="font-display text-base sm:text-lg mb-4 sm:mb-5">Карта Связей и Мостов</h3>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 sm:gap-6 items-start">
            {/* Graph */}
            <div className="min-h-[280px] sm:min-h-[400px]">
              <NetGraph
                onSelectEdge={handleSelectEdge}
                selectedEdgeKey={selectedEdgeKey}
              />
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-2 text-center">
                Кликните на связь, чтобы увидеть детали моста
              </p>
            </div>

            {/* Bridge Detail Panel */}
            <div className={`transition-all duration-300 ${detail ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2"}`}>
              {detail ? (
                <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border p-4 sm:p-6 lg:sticky lg:top-20">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-5 gap-2 sm:gap-3">
                    <div>
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-mono-brand tracking-wider uppercase block mb-1">Мост</span>
                      <span className="text-[15px] sm:text-[17px] font-bold">
                        {detail.personA} <span className="text-primary">↔</span> {detail.personB}
                      </span>
                    </div>
                    <span className={`text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md font-semibold border whitespace-nowrap ${tensionColor(detail.tensionLevel)}`}>
                      Напряжение: {detail.tension}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-5">
                    {detail.gives.map(s => (
                      <div key={s.who}>
                        <div className="text-xs sm:text-[13px] font-semibold text-primary mb-2 sm:mb-3">{s.who}</div>
                        {s.items.map(it => (
                          <div key={it} className="text-[11px] sm:text-[13px] text-text-dim py-1.5 sm:py-2 border-b border-border/60 flex items-start gap-1.5 sm:gap-2 leading-snug">
                            <span className="text-primary text-[8px] sm:text-[10px] mt-1 shrink-0">●</span>
                            {it}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 sm:mt-5 p-2.5 sm:p-3 bg-background/50 rounded-lg border border-border/50">
                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                      Этот мост показывает взаимодополняющие роли в команде. 
                      Каждый участник компенсирует слабые стороны другого.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-card/50 rounded-xl border border-border/50 p-6 sm:p-8 text-center">
                  <div className="text-2xl mb-3 opacity-40">⟷</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Выберите связь на графе,<br />чтобы увидеть анализ моста
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
