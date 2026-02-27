import { useState } from "react";
import { team } from "../DashboardData";

export default function PageTeam() {
  const [hovRow, setHovRow] = useState<number | null>(null);
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-lg sm:text-[22px] font-bold mb-4 sm:mb-6">Команда</h2>
      
      {/* Desktop table */}
      <div className="hidden sm:block bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-border">
              {["Участник", "Роль", "Mask Score", "Foundation", "Мосты"].map(h => (
                <th key={h} className="py-3.5 px-5 text-left font-medium text-[10px] tracking-[0.12em] uppercase text-muted-foreground font-mono-brand">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {team.map((p, i) => (
              <tr key={i}
                className={`transition-colors cursor-pointer ${i < team.length - 1 ? "border-b border-border" : ""}`}
                style={{ background: hovRow === i ? "rgba(201,168,76,0.03)" : "transparent" }}
                onMouseEnter={() => setHovRow(i)} onMouseLeave={() => setHovRow(null)}>
                <td className="py-3.5 px-5 text-foreground font-medium">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center text-[11px] font-bold text-primary border border-border">
                      {p.name.split(" ").map(w => w[0]).join("")}
                    </div>
                    {p.name}
                  </div>
                </td>
                <td className="py-3.5 px-5 text-text-dim">{p.role}</td>
                <td className="py-3.5 px-5">
                  <span className={`font-bold font-mono-brand px-2 py-0.5 rounded ${
                    p.mask > 6 ? "text-amos-red bg-amos-red/15" : p.mask > 4 ? "text-primary bg-primary/10" : "text-amos-green bg-amos-green/15"
                  }`}>{p.mask}</span>
                </td>
                <td className="py-3.5 px-5 text-amos-blue font-semibold font-mono-brand">{p.found}</td>
                <td className="py-3.5 px-5 text-primary font-semibold font-mono-brand">{p.br}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden flex flex-col gap-3">
        {team.map((p, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-surface-2 flex items-center justify-center text-xs font-bold text-primary border border-border shrink-0">
                {p.name.split(" ").map(w => w[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{p.name}</div>
                <div className="text-[11px] text-text-dim">{p.role}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-card rounded-lg p-2 border border-border/50">
                <div className="text-[10px] text-muted-foreground uppercase font-mono-brand mb-1">Mask</div>
                <span className={`text-sm font-bold font-mono-brand ${
                  p.mask > 6 ? "text-amos-red" : p.mask > 4 ? "text-primary" : "text-amos-green"
                }`}>{p.mask}</span>
              </div>
              <div className="bg-card rounded-lg p-2 border border-border/50">
                <div className="text-[10px] text-muted-foreground uppercase font-mono-brand mb-1">Found</div>
                <span className="text-sm font-bold font-mono-brand text-amos-blue">{p.found}</span>
              </div>
              <div className="bg-card rounded-lg p-2 border border-border/50">
                <div className="text-[10px] text-muted-foreground uppercase font-mono-brand mb-1">Мосты</div>
                <span className="text-sm font-bold font-mono-brand text-primary">{p.br}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
