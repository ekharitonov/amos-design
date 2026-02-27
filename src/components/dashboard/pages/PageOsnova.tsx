import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { radarData } from "../DashboardData";

export default function PageOsnova() {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-lg sm:text-[22px] font-bold mb-4 sm:mb-6">Изнанка: Слой II — Основа</h2>
      <div className="bg-surface border border-border rounded-xl p-4 sm:p-7">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-2">
          <h3 className="font-display text-[15px] sm:text-[17px]">
            Профиль Основы: <span className="text-text-dim font-normal">Мария Сидорова (Lead Developer)</span>
          </h3>
          <div className="font-display text-sm sm:text-base text-text-dim shrink-0">
            Foundation Score: <span className="text-primary font-bold text-lg sm:text-xl">7.4</span>
            <span className="text-muted-foreground"> / 10</span>
          </div>
        </div>

        <div className="flex justify-center overflow-hidden">
          <ResponsiveContainer width="100%" height={300} minWidth={300}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="74%">
              <PolarGrid stroke="hsl(255 12% 21%)" strokeDasharray="2 4" />
              <PolarAngleAxis dataKey="axis" tick={{ fill: "hsl(252 10% 62%)", fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
              <Radar name="Макс" dataKey="max" stroke="hsl(43 56% 54%)" fill="hsl(43 56% 54%)"
                fillOpacity={0.06} strokeWidth={1} strokeDasharray="4 4" />
              <Radar name="Профиль" dataKey="v" stroke="hsl(213 47% 57%)" fill="hsl(213 47% 57%)"
                fillOpacity={0.18} strokeWidth={2.5}
                dot={{ r: 4, fill: "hsl(213 47% 57%)", strokeWidth: 0 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-1.5 sm:gap-2.5 flex-wrap my-2 mb-5">
          {radarData.map(d => (
            <span key={d.axis} className="px-2 sm:px-3 py-1 bg-card rounded-md border border-border text-[10px] sm:text-xs text-text-dim font-mono-brand">
              {d.axis}: <span className="text-primary font-bold">{d.v}</span>
            </span>
          ))}
        </div>

        <div className="p-3 sm:p-4 bg-card rounded-xl border border-border text-xs sm:text-sm text-text-dim leading-relaxed">
          Профиль указывает на высокую ориентацию на результат, но с рисками в области этики и выполнения обещаний.
        </div>
      </div>
    </div>
  );
}
