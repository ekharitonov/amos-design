import { useState } from "react";

export default function PageSettings() {
  const [toggles, setToggles] = useState({ notif: true, meta: true });

  const settings = [
    { l: "Источник данных", v: "Telegram + Slack", type: "text" as const },
    { l: "Период анализа", v: "Последние 90 дней", type: "text" as const },
    { l: "Частота обновления", v: "Ежедневно", type: "text" as const },
    { l: "Только метаданные", k: "meta" as const, type: "toggle" as const },
    { l: "Уведомления", k: "notif" as const, type: "toggle" as const },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-[22px] font-bold mb-6">Настройки</h2>
      <div className="bg-surface border border-border rounded-xl p-6">
        {settings.map((s, i) => (
          <div key={s.l} className={`flex justify-between items-center py-4 ${i < settings.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-sm font-medium">{s.l}</span>
            {s.type === "text" ? (
              <span className="text-sm text-text-dim">{s.v}</span>
            ) : (
              <div
                onClick={() => setToggles(p => ({ ...p, [s.k!]: !p[s.k!] }))}
                className={`w-11 h-6 rounded-full cursor-pointer relative transition-all duration-200 border ${
                  toggles[s.k!] ? "bg-primary border-accent-dim" : "bg-surface-2 border-border"
                }`}
              >
                <div className={`w-[18px] h-[18px] rounded-full bg-foreground absolute top-[2px] transition-[left] duration-200 shadow ${
                  toggles[s.k!] ? "left-[22px]" : "left-[2px]"
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
