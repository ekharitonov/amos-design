import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Integrations ─── */
const integrations = [
  { name: "Slack", icon: "💬", status: "ok" as const, statusText: "Подключено: 15 мин назад (OK)", y: 70 },
  { name: "Jira", icon: "📋", status: "ok" as const, statusText: "Подключено: 10 мин назад (OK)", y: 210 },
  { name: "Zoom", icon: "🎥", status: "processing" as const, statusText: "Синхронизация... (Processing)", y: 350 },
  { name: "Corporate Email", icon: "✉️", status: "error" as const, statusText: "Ошибка доступа (Red Error)", y: 490 },
];

const statusDotColor = { ok: "#22C55E", processing: "#C9A84C", error: "#EF4444" };
const statusTextColor = { ok: "#22C55E", processing: "#C9A84C", error: "#EF4444" };
const statusEmoji = { ok: "✅", processing: "ℹ️", error: "⚠️" };

/* ─── Log ─── */
const logEntries = [
  { time: "10:45:23", tag: "INFO", color: "#22C55E", text: "Slack integration: New messages fetched (358)." },
  { time: "10:42:10", tag: "WARN", color: "#C9A84C", text: "Jira integration: API rate limit approaching." },
  { time: "10:49:01", tag: "ERROR", color: "#EF4444", text: "Corporate Email integration: Connection timeout. Retrying..." },
];

/* ─── Counter ─── */
function Counter({ target, label }: { target: number; label: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const dur = 2200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return (
    <div className="flex justify-end items-baseline gap-3">
      <span className="text-xs text-text-dim font-mono-brand text-right">{label}:</span>
      <span className="text-xl sm:text-2xl font-bold text-primary font-mono-brand tabular-nums min-w-[70px] text-right">
        {val.toLocaleString()}
      </span>
    </div>
  );
}

export default function PageDataFlow() {
  const [termOpen, setTermOpen] = useState(true);

  const coreX = 580;
  const coreY = 290;

  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-xl sm:text-[26px] font-bold mb-4">
        Data Flow & Integrations: <span className="text-text-dim font-normal">Центр управления данными</span>
      </h2>

      <div className="relative bg-[hsl(220_20%_6%)] border border-border rounded-xl overflow-hidden" style={{ minHeight: 600 }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(213 47% 57%) 1px, transparent 1px), linear-gradient(90deg, hsl(213 47% 57%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        {/* Main SVG */}
        <svg viewBox="0 0 900 600" className="w-full relative z-10" preserveAspectRatio="xMidYMid meet" style={{ minHeight: 600 }}>
          <defs>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="4" result="b1" />
              <feGaussianBlur stdDeviation="10" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="bigGlow">
              <feGaussianBlur stdDeviation="16" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Pipe gradients - blue for ok, gold for processing, red dim for error */}
            <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#E2C86A" />
            </linearGradient>
            <linearGradient id="redGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* ═══ FLOW PIPES ═══ */}
          {integrations.map((integ, i) => {
            const sy = integ.y;
            // Each pipe curves differently to create spread effect
            const controlY = coreY + (i - 1.5) * 15;
            const path = `M 230 ${sy} C 370 ${sy}, 420 ${controlY}, ${coreX - 70} ${coreY}`;
            const pipeColor = integ.status === "ok" ? "url(#blueGrad)" : integ.status === "processing" ? "url(#goldGrad)" : "url(#redGrad)";
            const rawColor = integ.status === "ok" ? "#60A5FA" : integ.status === "processing" ? "#C9A84C" : "#EF4444";

            return (
              <g key={integ.name}>
                {/* Wide background tube */}
                <path d={path} fill="none" stroke="hsl(220 20% 10%)" strokeWidth="18" strokeLinecap="round" />
                {/* Outer glow */}
                <path d={path} fill="none" stroke={rawColor} strokeWidth="14" strokeLinecap="round"
                  opacity={integ.status === "error" ? 0.06 : 0.12} filter="url(#bigGlow)" />
                {/* Mid glow */}
                <path d={path} fill="none" stroke={pipeColor} strokeWidth="8" strokeLinecap="round"
                  opacity={integ.status === "error" ? 0.2 : 0.7} filter="url(#softGlow)" />
                {/* Bright center line */}
                <path d={path} fill="none" stroke={rawColor} strokeWidth="2" strokeLinecap="round"
                  opacity={integ.status === "error" ? 0.15 : 0.4} />

                {/* Animated particles */}
                {integ.status !== "error" && (
                  <>
                    <circle r="6" fill={rawColor} opacity="0.9" filter="url(#softGlow)">
                      <animateMotion dur={integ.status === "processing" ? "5s" : "2.8s"} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                        <mpath href={`#p${i}`} />
                      </animateMotion>
                    </circle>
                    <circle r="3" fill="white" opacity="0.7">
                      <animateMotion dur={integ.status === "processing" ? "5s" : "2.8s"} repeatCount="indefinite" begin={`${i * 0.4 + 1.0}s`}>
                        <mpath href={`#p${i}`} />
                      </animateMotion>
                    </circle>
                    <circle r="4" fill={rawColor} opacity="0.5" filter="url(#softGlow)">
                      <animateMotion dur={integ.status === "processing" ? "5s" : "2.8s"} repeatCount="indefinite" begin={`${i * 0.4 + 1.8}s`}>
                        <mpath href={`#p${i}`} />
                      </animateMotion>
                    </circle>
                  </>
                )}
                <path id={`p${i}`} d={path} fill="none" stroke="none" />
              </g>
            );
          })}

          {/* ═══ INTEGRATION CARDS ═══ */}
          {integrations.map((integ) => {
            const y = integ.y;
            return (
              <g key={`c-${integ.name}`}>
                {/* Card background */}
                <rect x="38" y={y - 55} width="170" height="95" rx="14"
                  fill="hsl(220 20% 7%)" stroke="hsl(220 15% 18%)" strokeWidth="1.5" />
                {/* Icon background square */}
                <rect x="78" y={y - 46} width="90" height="55" rx="10"
                  fill="hsl(213 60% 50% / 0.08)" stroke="hsl(213 60% 50% / 0.15)" strokeWidth="1" />
                {/* Icon */}
                <text x="123" y={y - 8} textAnchor="middle" fontSize="30">{integ.icon}</text>
                {/* Name */}
                <text x="123" y={y + 26} textAnchor="middle"
                  fill="#E8E8F0" fontSize="14" fontWeight="700" fontFamily="'Playfair Display', serif">
                  {integ.name}
                </text>
                {/* Status */}
                <circle cx="50" cy={y + 44} r="5" fill={statusDotColor[integ.status]} />
                <text x="62" y={y + 48} fill={statusTextColor[integ.status]} fontSize="9.5"
                  fontFamily="'JetBrains Mono', monospace">
                  {integ.statusText}
                </text>
              </g>
            );
          })}

          {/* ═══ CORE AMOS ENGINE ═══ */}
          <g>
            {/* Outer rotating dashed ring */}
            <circle cx={coreX} cy={coreY} r="95" fill="none" stroke="#3B82F6" strokeWidth="1"
              strokeDasharray="8 6" opacity="0.25">
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${coreX} ${coreY}`} to={`360 ${coreX} ${coreY}`} dur="30s" repeatCount="indefinite" />
            </circle>
            {/* Second ring - counter rotation */}
            <circle cx={coreX} cy={coreY} r="82" fill="none" stroke="#3B82F6" strokeWidth="0.8"
              strokeDasharray="4 8" opacity="0.15">
              <animateTransform attributeName="transform" type="rotate"
                from={`360 ${coreX} ${coreY}`} to={`0 ${coreX} ${coreY}`} dur="22s" repeatCount="indefinite" />
            </circle>
            {/* Main outer circle */}
            <circle cx={coreX} cy={coreY} r="68" fill="hsl(220 20% 7%)" stroke="#3B82F6"
              strokeWidth="2.5" filter="url(#softGlow)" />
            {/* Inner glow circle */}
            <circle cx={coreX} cy={coreY} r="58" fill="#3B82F6" opacity="0.04">
              <animate attributeName="r" values="55;62;55" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.04;0.1;0.04" dur="3.5s" repeatCount="indefinite" />
            </circle>
            {/* Inner ring */}
            <circle cx={coreX} cy={coreY} r="48" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" />
            {/* Brain */}
            <text x={coreX} y={coreY + 8} textAnchor="middle" fontSize="46">🧠</text>
            {/* Labels */}
            <text x={coreX} y={coreY + 78} textAnchor="middle"
              fill="#E8E8F0" fontSize="16" fontWeight="700" fontFamily="'Playfair Display', serif">
              Ядро АМОС
            </text>
            <text x={coreX} y={coreY + 96} textAnchor="middle"
              fill="#6B6B80" fontSize="12" fontFamily="'Playfair Display', serif">
              (AI Engine)
            </text>
          </g>
        </svg>

        {/* ═══ STATS OVERLAY (top-right) ═══ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-5 right-5 bg-[hsl(220_20%_6%/0.85)] backdrop-blur-lg border border-border rounded-xl p-4 sm:p-5 z-20 min-w-[280px]"
        >
          <Counter target={14502} label="Сообщений проанализировано сегодня" />
          <div className="border-t border-border my-2.5" />
          <Counter target={32} label="Выявлено новых паттернов" />
          <div className="border-t border-border my-2.5" />
          <Counter target={148} label="Активных сессий" />
        </motion.div>

        {/* ═══ TERMINAL OVERLAY (bottom-right) ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-5 right-5 z-20 w-[380px] sm:w-[520px]"
        >
          <div className="bg-[hsl(220_20%_4%/0.92)] backdrop-blur-md border border-border rounded-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-3 py-1.5 bg-[hsl(220_15%_10%)] border-b border-border">
              <span className="text-[11px] font-mono-brand font-semibold text-text-dim">Лог активности (Терминал)</span>
              <div className="flex gap-1.5">
                <button onClick={() => setTermOpen(!termOpen)}
                  className="w-2.5 h-2.5 rounded-full bg-primary/50 hover:bg-primary transition-colors" />
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
              </div>
            </div>
            <AnimatePresence>
              {termOpen && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-3 sm:p-4 space-y-1.5">
                    {logEntries.map((log, i) => (
                      <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.15 }}
                        className="flex gap-2 text-[11px] sm:text-xs font-mono-brand leading-relaxed">
                        <span className="text-muted-foreground shrink-0">{log.time}</span>
                        <span className="font-bold shrink-0" style={{ color: log.color }}>[{log.tag}]</span>
                        <span className="text-text-dim">{log.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
