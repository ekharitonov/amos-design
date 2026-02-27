import AnimatedGauge from "../AnimatedGauge";
import { declared, realData } from "../DashboardData";

export default function PageMasks() {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-[22px] font-bold mb-6">
        Анализ Масок: <span className="text-text-dim font-normal">Алексей Петров (Product Owner)</span>
      </h2>
      <div className="bg-surface border border-border rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-6 items-center">
          {/* Left: Declared */}
          <div>
            <h4 className="text-[15px] font-semibold text-text-dim mb-5">
              Декларируемое <span className="italic text-muted-foreground">(Слова)</span>
            </h4>
            <div className="flex flex-col gap-3">
              {declared.map(v => (
                <div key={v} className="px-5 py-2.5 rounded-full border-[1.5px] border-primary text-primary text-sm font-medium bg-primary/10 w-fit">
                  {v}
                </div>
              ))}
            </div>
            <div className="mt-6 p-3.5 bg-card rounded-lg border border-border text-[13px] text-muted-foreground italic leading-relaxed">
              "Я всегда за прозрачность процессов."
            </div>
          </div>

          {/* Center: Gauge */}
          <div className="flex justify-center">
            <AnimatedGauge score={8.2} />
          </div>

          {/* Right: Real behavior */}
          <div>
            <h4 className="text-[15px] font-semibold text-text-dim mb-5 text-right">
              Реальное поведение <span className="italic text-muted-foreground">(Данные)</span>
            </h4>
            <div className="flex flex-col gap-5">
              {realData.map((b, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-lg border border-border shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <div className="text-[26px] font-bold text-primary leading-none font-display">{b.val}</div>
                    <div className="text-xs text-text-dim leading-snug mt-1">{b.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
