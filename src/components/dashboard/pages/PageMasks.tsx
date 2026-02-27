import AnimatedGauge from "../AnimatedGauge";
import { declared, realData } from "../DashboardData";

export default function PageMasks() {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-lg sm:text-[22px] font-bold mb-4 sm:mb-6">
        Анализ Масок: <span className="text-text-dim font-normal">Алексей Петров (Product Owner)</span>
      </h2>
      <div className="bg-surface border border-border rounded-xl p-4 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-6 items-center">
          {/* Left: Declared */}
          <div>
            <h4 className="text-[14px] sm:text-[15px] font-semibold text-text-dim mb-4 sm:mb-5">
              Декларируемое <span className="italic text-muted-foreground">(Слова)</span>
            </h4>
            <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 flex-wrap">
              {declared.map(v => (
                <div key={v} className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-[1.5px] border-primary text-primary text-xs sm:text-sm font-medium bg-primary/10 w-fit">
                  {v}
                </div>
              ))}
            </div>
            <div className="mt-4 sm:mt-6 p-3 sm:p-3.5 bg-card rounded-lg border border-border text-xs sm:text-[13px] text-muted-foreground italic leading-relaxed">
              "Я всегда за прозрачность процессов."
            </div>
          </div>

          {/* Center: Gauge */}
          <div className="flex justify-center order-first lg:order-none">
            <AnimatedGauge score={8.2} />
          </div>

          {/* Right: Real behavior */}
          <div>
            <h4 className="text-[14px] sm:text-[15px] font-semibold text-text-dim mb-4 sm:mb-5 lg:text-right">
              Реальное поведение <span className="italic text-muted-foreground">(Данные)</span>
            </h4>
            <div className="flex flex-col gap-4 sm:gap-5">
              {realData.map((b, i) => (
                <div key={i} className="flex gap-3 sm:gap-3.5 items-start">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-card flex items-center justify-center text-base sm:text-lg border border-border shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <div className="text-xl sm:text-[26px] font-bold text-primary leading-none font-display">{b.val}</div>
                    <div className="text-[11px] sm:text-xs text-text-dim leading-snug mt-1">{b.label}</div>
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
