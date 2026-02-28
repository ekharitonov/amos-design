import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import AnimatedGauge from "../AnimatedGauge";

const miniRadarData = [
  { axis: "Основы", v: 6.0, max: 10 },
  { axis: "Результат", v: 8.5, max: 10 },
  { axis: "Основы", v: 5.5, max: 10 },
  { axis: "Подавила", v: 4.2, max: 10 },
  { axis: "Основы", v: 7.0, max: 10 },
  { axis: "Результат", v: 7.8, max: 10 },
];

const keyGaps = [
  { icon: "📈", source: "Jira", text: 'Заявляет о выгорании, но берёт +30% задач' },
  { icon: "💬", source: "Slack", text: "Игнорирует сообщения от 'Продукт'" },
];

const blindSpot = {
  title: "Слепые зоны",
  text: "Мария может скрывать конфликт с Лидом из-за страха критики",
};

const scalpelQuestions = [
  "Мария, ты упомянула перегрузку, но данные показывают рост задач. Что тебя мотивирует брать их?",
  "Как ты оцениваешь коммуникацию с \"Продуктом\" в последнее время?",
];

export default function PageRitualPrep() {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-xl sm:text-[26px] font-bold mb-5 sm:mb-7">
        Ritual Prep: <span className="text-text-dim font-normal">Встреча с Марией С.</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* LEFT: Employee Summary */}
        <div className="bg-surface border border-border rounded-xl p-4 sm:p-6">
          <h3 className="font-display text-[15px] sm:text-[17px] font-semibold mb-5">
            Данные сотрудника (Сводка)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-6">
            {/* Mini Radar */}
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={200} minWidth={180}>
                <RadarChart data={miniRadarData} cx="50%" cy="50%" outerRadius="72%">
                  <PolarGrid stroke="hsl(255 12% 21%)" strokeDasharray="2 4" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: "hsl(252 10% 62%)", fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar name="Профиль" dataKey="v" stroke="hsl(43 56% 54%)" fill="hsl(43 56% 54%)"
                    fillOpacity={0.18} strokeWidth={2}
                    dot={{ r: 3, fill: "hsl(43 56% 54%)", strokeWidth: 0 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Mini Gauge */}
            <div className="flex justify-center">
              <AnimatedGauge score={6.5} size={200} />
            </div>
          </div>

          {/* Key Gaps */}
          <h4 className="font-display text-[14px] sm:text-[15px] font-semibold mb-3">
            Ключевые разрывы
          </h4>
          <div className="flex flex-col gap-3">
            {keyGaps.map((gap, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center text-base border border-border shrink-0">
                  {gap.icon}
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {gap.text}{" "}
                  <span className="text-muted-foreground">({gap.source})</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: AI Coaching */}
        <div className="bg-surface border border-primary/30 rounded-xl p-4 sm:p-6 flex flex-col">
          <h3 className="font-display text-[15px] sm:text-[17px] font-semibold mb-5">
            AI-Коучинг и Сценарий
          </h3>

          {/* Blind spot */}
          <div className="bg-card border border-border rounded-lg p-4 mb-5">
            <h4 className="font-display text-[14px] font-bold mb-1.5">{blindSpot.title}</h4>
            <p className="text-sm text-text-dim leading-relaxed">{blindSpot.text}</p>
          </div>

          {/* Scalpel Questions */}
          <h4 className="font-display text-[14px] sm:text-[15px] font-semibold mb-3">
            Скальпель-вопросы <span className="text-muted-foreground font-normal">(AI-generated)</span>
          </h4>
          <ol className="list-decimal list-inside flex flex-col gap-3 mb-6 flex-1">
            {scalpelQuestions.map((q, i) => (
              <li key={i} className="text-sm text-text-dim leading-relaxed font-mono-brand">
                {q}
              </li>
            ))}
          </ol>

          {/* CTA Button */}
          <button className="w-full py-3.5 rounded-lg font-display font-bold text-sm sm:text-base text-primary-foreground bg-gradient-to-r from-primary to-[hsl(43_45%_42%)] hover:brightness-110 transition-all shadow-[0_0_24px_rgba(201,168,76,0.25)] border border-primary/40">
            Сгенерировать сценарий разговора
          </button>
        </div>
      </div>
    </div>
  );
}
