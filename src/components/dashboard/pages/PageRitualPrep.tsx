import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import AnimatedGauge from "../AnimatedGauge";

const miniRadarData = [
  { axis: "Совесть", v: 5.2, max: 10 },
  { axis: "Надёжность", v: 6.8, max: 10 },
  { axis: "Организованность", v: 5.0, max: 10 },
  { axis: "Верность слову", v: 6.0, max: 10 },
  { axis: "Амбиции", v: 8.5, max: 10 },
  { axis: "Результат", v: 9.1, max: 10 },
];

const keyGaps = [
  { icon: "📈", source: "Jira", text: "Заявляет о выгорании, но берёт +30% задач", severity: "high" as const },
  { icon: "💬", source: "Slack", text: "Игнорирует сообщения от 'Продукт'", severity: "medium" as const },
  { icon: "🕐", source: "Calendar", text: "Пропустила 3 из 5 синков за месяц", severity: "low" as const },
];

const blindSpots = [
  { title: "Скрытый конфликт", text: "Мария может скрывать конфликт с Лидом из-за страха критики", risk: "high" as const },
  { title: "Перегрузка как маска", text: "Жалобы на перегрузку могут быть способом избежать ответственности за качество", risk: "medium" as const },
];

const scalpelQuestions = [
  "Мария, ты упомянула перегрузку, но данные показывают рост задач. Что тебя мотивирует брать их?",
  "Как ты оцениваешь коммуникацию с \"Продуктом\" в последнее время?",
  "Что бы ты изменила в процессе, если бы могла изменить одну вещь?",
];

const severityColor = {
  high: "border-destructive/40 bg-destructive/5",
  medium: "border-primary/30 bg-primary/5",
  low: "border-border bg-card",
};

const severityDot = {
  high: "bg-destructive",
  medium: "bg-primary",
  low: "bg-muted-foreground",
};

const riskBadge = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-primary/15 text-primary border-primary/30",
};

export default function PageRitualPrep() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [scenario, setScenario] = useState<string | null>(null);
  const [expandedBlind, setExpandedBlind] = useState<number | null>(0);

  const copyQuestion = (q: string, idx: number) => {
    navigator.clipboard.writeText(q);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setScenario(
        "1. Начните с позитива: отметьте рост задач как проявление амбиций.\n" +
        "2. Мягко поднимите тему пропущенных синков — спросите, что мешает.\n" +
        "3. Задайте скальпель-вопрос #1 — наблюдайте за реакцией.\n" +
        "4. Перейдите к коммуникации с Продуктом — используйте конкретные примеры.\n" +
        "5. Закончите вопросом о том, какая поддержка ей нужна."
      );
      setGenerating(false);
    }, 2200);
  };

  return (
    <div className="animate-fade-in">
      {/* Header with status badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-7 gap-2">
        <h2 className="font-display text-xl sm:text-[26px] font-bold">
          Ritual Prep: <span className="text-text-dim font-normal">Встреча с Марией С.</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <span className="text-xs text-text-dim font-mono-brand">Данные обновлены 2 мин. назад</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* LEFT: Employee Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface border border-border rounded-xl p-4 sm:p-6"
        >
          <h3 className="font-display text-[15px] sm:text-[17px] font-semibold mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-primary inline-block" />
            Данные сотрудника (Сводка)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-6">
            {/* Mini Radar */}
            <motion.div
              className="flex justify-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ResponsiveContainer width="100%" height={210} minWidth={180}>
                <RadarChart data={miniRadarData} cx="50%" cy="50%" outerRadius="72%">
                  <PolarGrid stroke="hsl(255 12% 21%)" strokeDasharray="2 4" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: "hsl(252 10% 62%)", fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar name="Макс" dataKey="max" stroke="hsl(43 56% 54%)" fill="hsl(43 56% 54%)"
                    fillOpacity={0.04} strokeWidth={1} strokeDasharray="4 4" />
                  <Radar name="Профиль" dataKey="v" stroke="hsl(43 56% 54%)" fill="hsl(43 56% 54%)"
                    fillOpacity={0.2} strokeWidth={2}
                    dot={{ r: 3, fill: "hsl(43 56% 54%)", strokeWidth: 0 }} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Mini Gauge */}
            <div className="flex justify-center">
              <AnimatedGauge score={6.5} size={190} />
            </div>
          </div>

          {/* Key Gaps */}
          <h4 className="font-display text-[14px] sm:text-[15px] font-semibold mb-3 flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-destructive inline-block" />
            Ключевые разрывы
          </h4>
          <div className="flex flex-col gap-2.5">
            {keyGaps.map((gap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.12 }}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors hover:bg-card/60 cursor-default ${severityColor[gap.severity]}`}
              >
                <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center text-base border border-border shrink-0 relative">
                  {gap.icon}
                  <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${severityDot[gap.severity]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">{gap.text}</p>
                  <span className="text-[11px] text-muted-foreground font-mono-brand mt-0.5 inline-block">
                    Источник: {gap.source}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: AI Coaching */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-surface border border-primary/20 rounded-xl p-4 sm:p-6 flex flex-col relative overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <h3 className="font-display text-[15px] sm:text-[17px] font-semibold mb-5 flex items-center gap-2 relative z-10">
            <span className="w-1.5 h-5 rounded-full bg-primary inline-block" />
            AI-Коучинг и Сценарий
            <span className="ml-auto text-[10px] font-mono-brand text-muted-foreground bg-card px-2 py-0.5 rounded-full border border-border">
              ✦ AI
            </span>
          </h3>

          {/* Blind spots - expandable */}
          <div className="flex flex-col gap-2 mb-5 relative z-10">
            {blindSpots.map((spot, i) => (
              <motion.div
                key={i}
                layout
                onClick={() => setExpandedBlind(expandedBlind === i ? null : i)}
                className={`border rounded-lg p-3.5 cursor-pointer transition-colors hover:bg-card/80 ${
                  expandedBlind === i ? "bg-card border-primary/25" : "bg-card/50 border-border"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono-brand ${riskBadge[spot.risk]}`}>
                    {spot.risk === "high" ? "Высокий риск" : "Средний риск"}
                  </span>
                  <h4 className="font-display text-[13px] sm:text-[14px] font-bold flex-1">{spot.title}</h4>
                  <motion.span
                    animate={{ rotate: expandedBlind === i ? 180 : 0 }}
                    className="text-muted-foreground text-xs"
                  >
                    ▼
                  </motion.span>
                </div>
                <AnimatePresence>
                  {expandedBlind === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm text-text-dim leading-relaxed mt-2 overflow-hidden"
                    >
                      {spot.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Scalpel Questions */}
          <h4 className="font-display text-[14px] sm:text-[15px] font-semibold mb-3 relative z-10">
            Скальпель-вопросы <span className="text-muted-foreground font-normal">(AI-generated)</span>
          </h4>
          <div className="flex flex-col gap-2 mb-5 flex-1 relative z-10">
            {scalpelQuestions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                onClick={() => copyQuestion(q, i)}
                className="group flex gap-3 p-3 rounded-lg border border-border bg-card/50 hover:bg-card hover:border-primary/20 cursor-pointer transition-all"
              >
                <span className="text-primary font-mono-brand text-sm font-bold shrink-0 mt-0.5">{i + 1}.</span>
                <p className="text-sm text-text-dim leading-relaxed font-mono-brand flex-1">{q}</p>
                <span className={`text-[10px] font-mono-brand shrink-0 mt-0.5 transition-all ${
                  copiedIdx === i
                    ? "text-green opacity-100"
                    : "text-muted-foreground opacity-0 group-hover:opacity-100"
                }`}>
                  {copiedIdx === i ? "✓ скопировано" : "📋 копировать"}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Generated Scenario */}
          <AnimatePresence>
            {scenario && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-4 relative z-10 overflow-hidden"
              >
                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <h4 className="font-display text-[13px] font-bold text-primary mb-2 flex items-center gap-2">
                    ✦ Сценарий разговора
                  </h4>
                  <pre className="text-sm text-text-dim leading-relaxed whitespace-pre-wrap font-mono-brand">
                    {scenario}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={generating}
            className="relative z-10 w-full py-3.5 rounded-lg font-display font-bold text-sm sm:text-base text-primary-foreground bg-gradient-to-r from-primary to-accent-dim hover:brightness-110 transition-all shadow-[0_0_30px_rgba(201,168,76,0.2)] border border-primary/40 disabled:opacity-60 disabled:cursor-wait"
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="inline-block"
                >
                  ✦
                </motion.span>
                Генерация...
              </span>
            ) : scenario ? (
              "Перегенерировать сценарий"
            ) : (
              "Сгенерировать сценарий разговора"
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
