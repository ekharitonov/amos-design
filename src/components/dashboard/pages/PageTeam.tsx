import { useState } from "react";
import { team } from "../DashboardData";

export default function PageTeam() {
  const [hovRow, setHovRow] = useState<number | null>(null);
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-[22px] font-bold mb-6">Команда</h2>
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
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
    </div>
  );
}
