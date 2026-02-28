import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Integration sources ─── */
interface Integration {
  name: string;
  icon: string;
  status: "ok" | "processing" | "error";
  statusText: string;
  color: string;
  glowColor: string;
}

const integrations: Integration[] = [
  { name: "Slack", icon: "💬", status: "ok", statusText: "Подключено: 15 мин назад (OK)", color: "#4A9FE5", glowColor: "rgba(74,159,229,0.6)" },
  { name: "Jira", icon: "📋", status: "ok", statusText: "Подключено: 10 мин назад (OK)", color: "#4A9FE5", glowColor: "rgba(74,159,229,0.6)" },
  { name: "Zoom", icon: "🎥", status: "processing", statusText: "Синхронизация... (Processing)", color: "#C9A84C", glowColor: "rgba(201,168,76,0.5)" },
  { name: "Corporate Email", icon: "✉️", status: "error", statusText: "Ошибка доступа (Red Error)", color: "#D45555", glowColor: "rgba(212,85,85,0.4)" },
];

const statusDot = { ok: "#4CAF50", processing: "#C9A84C", error: "#D45555" };

/* ─── Activity log ─── */
const logEntries = [
  { time: "10:45:23", tag: "INFO", color: "#4CAF50", text: "Slack integration: New messages fetched (358)." },
  { time: "10:42:10", tag: "WARN", color: "#C9A84C", text: "Jira integration: API rate limit approaching." },
  { time: "10:40:01", tag: "ERROR", color: "#D45555", text: "Corporate Email integration: Connection timeout. Retrying..." },
];

/* ─── Animated counter ─── */
function Counter({ target, label }: { target: number; label: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const dur = 2000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return (
    <div className="flex justify-between items-baseline gap-3">
      <span className="text-[11px] sm:text-xs text-text-dim font-mono-brand whitespace-nowrap">{label}:</span>
      <span className="text-base sm:text-xl font-bold text-primary font-mono-brand tabular-nums">
        {val.toLocaleString()}
      </span>
    </div>
  );
}

/* ─── Terminal log ─── */
function TerminalLog() {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="bg-[hsl(260_20%_4%/0.92)] backdrop-blur-md border border-border rounded-lg overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-3 py-1.5 bg-card/80 border-b border-border">
        <span className="text-[10px] sm:text-xs font-mono-brand font-semibold text-text-dim">Лог активности (Терминал)</span>
        <div className="flex gap-1.5">
          <button onClick={() => setMinimized(!minimized)}
            className="w-2.5 h-2.5 rounded-full bg-primary/60 hover:bg-primary transition-colors" title="Свернуть" />
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
      <AnimatePresence>
        {!minimized && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="p-3 space-y-1">
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
  );
}

/* ─── Main page ─── */
export default function PageDataFlow() {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h2 className="font-display text-xl sm:text-[26px] font-bold">
          Data Flow & Integrations: <span className="text-text-dim font-normal">Центр управления данными</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green" />
          </span>
          <span className="text-xs text-text-dim font-mono-brand">Система активна</span>
        </div>
      </div>

      {/* Main visualization area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-surface border border-border rounded-xl overflow-hidden mb-4"
        style={{ minHeight: 480 }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, hsl(213 47% 57%) 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />

        {/* SVG flow */}
        <svg viewBox="0 0 800 480" className="w-full h-full relative z-10" preserveAspectRatio="xMidYMid meet"
          style={{ minHeight: 480 }}>
          <defs>
            <filter id="pipeGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="coreGlow">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="pipeGrad0" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4A9FE5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6BC5E8" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="pipeGrad1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4A9FE5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6BC5E8" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="pipeGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#E2C86A" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="pipeGrad3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D45555" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D45555" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Flow pipes */}
          {integrations.map((integ, i) => {
            const sy = 80 + i * 105;
            const path = `M 175 ${sy} C 320 ${sy}, 380 240, 470 240`;
            return (
              <g key={integ.name}>
                {/* Thick background pipe */}
                <path d={path} fill="none" stroke="hsl(255 12% 14%)" strokeWidth="14" strokeLinecap="round" />
                {/* Inner glow pipe */}
                <path d={path} fill="none" stroke={`url(#pipeGrad${i})`} strokeWidth="8" strokeLinecap="round"
                  filter="url(#pipeGlow)" opacity={integ.status === "error" ? 0.35 : 0.85} />
                {/* Bright center */}
                <path d={path} fill="none" stroke={integ.color} strokeWidth="2" strokeLinecap="round"
                  opacity={integ.status === "error" ? 0.2 : 0.5} />

                {/* Animated particles */}
                {integ.status !== "error" && (
                  <>
                    <circle r="5" fill={integ.color} opacity="0.9" filter="url(#pipeGlow)">
                      <animateMotion dur={integ.status === "processing" ? "5s" : "3s"} repeatCount="indefinite" begin={`${i * 0.6}s`}>
                        <mpath href={`#pipe${i}`} />
                      </animateMotion>
                    </circle>
                    <circle r="3" fill="white" opacity="0.6">
                      <animateMotion dur={integ.status === "processing" ? "5s" : "3s"} repeatCount="indefinite" begin={`${i * 0.6 + 1.2}s`}>
                        <mpath href={`#pipe${i}`} />
                      </animateMotion>
                    </circle>
                  </>
                )}
                <path id={`pipe${i}`} d={path} fill="none" stroke="none" />
              </g>
            );
          })}

          {/* Integration source cards */}
          {integrations.map((integ, i) => {
            const y = 80 + i * 105;
            return (
              <g key={`card-${integ.name}`}>
                <rect x="30" y={y - 50} width="130" height="85" rx="12"
                  fill="hsl(255 20% 8%)" stroke="hsl(255 12% 21%)" strokeWidth="1.5" />
                {/* Icon circle */}
                <rect x="65" y={y - 42} width="60" height="40" rx="8"
                  fill="hsl(213 47% 57% / 0.1)" stroke="hsl(213 47% 57% / 0.2)" strokeWidth="1" />
                <text x="95" y={y - 14} textAnchor="middle" fontSize="22">{integ.icon}</text>
                {/* Name */}
                <text x="95" y={y + 18} textAnchor="middle"
                  fill="hsl(253 30% 92%)" fontSize="12" fontWeight="700">
                  {integ.name}
                </text>
                {/* Status dot & text */}
                <circle cx="46" cy={y + 30} r="4" fill={statusDot[integ.status]} />
                <text x="56" y={y + 34} fill={statusDot[integ.status]} fontSize="8.5" fontFamily="monospace">
                  {integ.statusText}
                </text>
              </g>
            );
          })}

          {/* Core AMOS engine */}
          <g>
            {/* Outer pulsing ring */}
            <circle cx="530" cy="240" r="80" fill="none" stroke="#4A9FE5" strokeWidth="1"
              strokeDasharray="6 4" opacity="0.3" filter="url(#coreGlow)">
              <animateTransform attributeName="transform" type="rotate"
                from="0 530 240" to="360 530 240" dur="25s" repeatCount="indefinite" />
            </circle>
            <circle cx="530" cy="240" r="68" fill="none" stroke="#4A9FE5" strokeWidth="1.5"
              strokeDasharray="3 6" opacity="0.2">
              <animateTransform attributeName="transform" type="rotate"
                from="360 530 240" to="0 530 240" dur="18s" repeatCount="indefinite" />
            </circle>
            {/* Main circle */}
            <circle cx="530" cy="240" r="55" fill="hsl(255 20% 8%)" stroke="#4A9FE5"
              strokeWidth="2" filter="url(#pipeGlow)" />
            {/* Inner pulse */}
            <circle cx="530" cy="240" r="45" fill="#4A9FE5" opacity="0.05">
              <animate attributeName="r" values="42;50;42" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.05;0.12;0.05" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Brain */}
            <text x="530" y="248" textAnchor="middle" fontSize="38">🧠</text>
            {/* Labels */}
            <text x="530" y="310" textAnchor="middle" fill="hsl(253 30% 92%)" fontSize="14" fontWeight="700">
              Ядро АМОС
            </text>
            <text x="530" y="328" textAnchor="middle" fill="hsl(252 10% 52%)" fontSize="11">
              (AI Engine)
            </text>
          </g>
        </svg>

        {/* Stats overlay - top right */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 right-4 bg-card/80 backdrop-blur-md border border-border rounded-xl p-3 sm:p-4 w-[260px] sm:w-[300px] z-20"
        >
          <Counter target={14502} label="Сообщений проанализировано сегодня" />
          <div className="border-t border-border my-2" />
          <Counter target={32} label="Выявлено новых паттернов" />
          <div className="border-t border-border my-2" />
          <Counter target={148} label="Активных сессий" />
        </motion.div>

        {/* Terminal overlay - bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 right-4 w-[340px] sm:w-[480px] z-20"
        >
          <TerminalLog />
        </motion.div>
      </motion.div>
    </div>
  );
}
