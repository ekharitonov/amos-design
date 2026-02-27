import NetGraph from "../NetGraph";

export default function PageBridges() {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-[22px] font-bold mb-6">Изнанка: Слой III — Мосты</h2>
      <div className="bg-surface border border-border rounded-xl p-7">
        <h3 className="font-display text-[17px] mb-5">Карта Связей и Мостов</h3>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-5 items-start">
          <NetGraph />
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <span className="text-[15px] font-semibold">Мост: Алексей П. ↔ Мария С.</span>
              <span className="text-[11px] px-2.5 py-1 rounded-md font-semibold bg-primary/10 text-primary border border-accent-dim">
                Напряжение: Среднее
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { who: "Алексей даёт Марии:", items: ["Стратегическое видение", "Защита от внешнего давления"] },
                { who: "Мария даёт Алексею:", items: ["Детализация задач", "Честная обратная связь"] },
              ].map(s => (
                <div key={s.who}>
                  <div className="text-[13px] font-semibold text-text-dim mb-2.5">{s.who}</div>
                  {s.items.map(it => (
                    <div key={it} className="text-[13px] text-text-dim py-1.5 border-b border-border flex items-center gap-1.5">
                      <span className="text-primary text-[8px]">●</span> {it}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
