import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from "recharts";
import { pulseData, insightsData } from "../DashboardData";

export default function PageMain() {
  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-4">
        {/* Team Pulse */}
        <div className="bg-surface border border-border rounded-xl p-5 pb-3">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold">Team Pulse</span>
              <span className="text-sm text-muted-foreground cursor-help">ⓘ</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={275}>
            <AreaChart data={pulseData}>
              <defs>
                <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(43 56% 54%)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(43 56% 54%)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(213 47% 57%)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(213 47% 57%)" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,41,57,0.7)" />
              <XAxis dataKey="m" stroke="hsl(252 10% 46%)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(252 10% 46%)" fontSize={11} domain={[0, 100]} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(255 20% 8%)", border: "1px solid hsl(255 12% 21%)", borderRadius: 10, fontSize: 12 }}
                labelStyle={{ color: "hsl(252 10% 62%)" }} itemStyle={{ color: "hsl(253 30% 92%)" }}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: "hsl(252 10% 62%)", paddingTop: 8 }} iconType="plainline" />
              <Area type="monotone" dataKey="h" name="Культурное здоровье"
                stroke="hsl(43 56% 54%)" strokeWidth={2.5} fill="url(#goldFill)" dot={false}
                activeDot={{ r: 5, fill: "hsl(43 56% 54%)", strokeWidth: 0 }} />
              <Area type="monotone" dataKey="c" name="Связанность"
                stroke="hsl(213 47% 57%)" strokeWidth={1.5} fill="url(#blueFill)" dot={false}
                activeDot={{ r: 4, fill: "hsl(213 47% 57%)", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-display text-[17px] font-bold mb-4">Последние инсайты</h3>
          {insightsData.map((ins, i) => (
            <div key={i} className={`py-3 text-[13px] text-text-dim leading-relaxed flex gap-2.5 items-start ${i < insightsData.length - 1 ? "border-b border-border" : ""}`}>
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{
                background: ins.type === "alert" ? "hsl(0 47% 56%)" : ins.type === "warn" ? "hsl(43 56% 54%)" : "hsl(150 36% 46%)",
                boxShadow: `0 0 6px ${ins.type === "alert" ? "hsl(0 47% 56%)" : ins.type === "warn" ? "hsl(43 56% 54%)" : "hsl(150 36% 46%)"}`,
              }} />
              {ins.text}
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {[
          { l: "Уровень масок:", v: "Высокий (68%)", c: "text-amos-red", dot: "bg-amos-red" },
          { l: "Активные мосты:", v: "12", c: "text-amos-green", dot: "bg-amos-green" },
          { l: "Зоны молчания:", v: "Финансы ↔ Продукт", c: "text-text-dim", dot: "" },
        ].map((m, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-5 hover:border-border-light transition-colors">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-dim">{m.l}</span>
              {m.dot && <span className={`w-3 h-3 rounded-full ${m.dot}`} style={{ boxShadow: "0 0 10px currentColor" }} />}
            </div>
            <div className={`text-[22px] font-bold font-mono-brand tracking-tight ${m.c}`}>{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
