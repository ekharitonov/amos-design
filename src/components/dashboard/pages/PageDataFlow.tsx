import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Integration sources ─── */
interface Integration {
  name: string;
  icon: string;
  status: "ok" | "processing" | "error";
  statusText: string;
  color: string;
}

const integrations: Integration[] = [
  { name: "Slack", icon: "💬", status: "ok", statusText: "Подключено: 15 мин назад (OK)", color: "hsl(213 47% 57%)" },
  { name: "Jira", icon: "📋", status: "ok", statusText: "Подключено: 10 мин назад (OK)", color: "hsl(213 47% 57%)" },
  { name: "Zoom", icon: "🎥", status: "processing", statusText: "Синхронизация... (Processing)", color: "hsl(43 56% 54%)" },
  { name: "Corporate Email", icon: "✉️", status: "error", statusText: "Ошибка доступа (Red Error)", color: "hsl(0 47% 56%)" },
];

const statusIcon = { ok: "✅", processing: "ℹ️", error: "⚠️" };
const statusColor = { ok: "text-green", processing: "text-primary", error: "text-destructive" };

/* ─── Activity log ─── */
const logEntries = [
  { time: "10:45:23", tag: "INFO", color: "text-green", text: "Slack integration: New messages fetched (358)." },
  { time: "10:42:10", tag: "WARN", color: "text-primary", text: "Jira integration: API rate limit approaching." },
  { time: "10:40:01", tag: "ERROR", color: "text-destructive", text: "Corporate Email integration: Connection timeout. Retrying..." },
  { time: "10:38:55", tag: "INFO", color: "text-green", text: "Zoom integration: Meeting transcripts synced (12 new)." },
  { time: "10:35:02", tag: "INFO", color: "text-green", text: "Pattern engine: 32 new behavioral patterns detected." },
];

/* ─── Animated counter ─── */
function Counter({ target, label }: { target: number; label: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const dur = 1800;
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
    <div className="flex justify-between items-baseline gap-4">
      <span className="text-xs sm:text-sm text-text-dim font-mono-brand">{label}:</span>
      <span className="text-lg sm:text-2xl font-bold text-primary font-mono-brand tabular-nums">
        {val.toLocaleString()}
      </span>
    </div>
  );
}

/* ─── Animated flow line (SVG) ─── */
function FlowLine({ from, to, color, delay = 0, status }: {
  from: { x: number; y: number }; to: { x: number; y: number };
  color: string; delay?: number; status: Integration["status"];
}) {
  const midX = from.x + (to.x - from.x) * 0.55;
  const path = `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;

  return (
    <g>
      {/* Base pipe */}
      <path d={path} fill="none" stroke="hsl(255 12% 21%)" strokeWidth="3" strokeLinecap="round" />
      {/* Glowing pipe */}
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
        opacity={status === "error" ? 0.3 : 0.6}
        filter="url(#glow)" />
      {/* Animated particle */}
      {status !== "error" && (
        <circle r="4" fill={color} filter="url(#glow)">
          <animateMotion dur={status === "processing" ? "4s" : "2.5s"} repeatCount="indefinite" begin={`${delay}s`}>
            <mpath href={`#flow-${from.y}`} />
          </animateMotion>
        </circle>
      )}
      <path id={`flow-${from.y}`} d={path} fill="none" stroke="none" />
    </g>
  );
}

/* ─── Terminal log ─── */
function TerminalLog() {
  const [minimized, setMinimized] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-[hsl(260_18%_6%)] border border-border rounded-lg overflow-hidden"
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-3 py-2 bg-card border-b border-border">
        <span className="text-xs font-mono-brand font-semibold text-text-dim">Лог активности (Терминал)</span>
        <div className="flex gap-1.5">
          <button onClick={() => setMinimized(!minimized)}
            className="w-3 h-3 rounded-full bg-primary/60 hover:bg-primary transition-colors" />
          <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
          <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
        </div>
      </div>

      <AnimatePresence>
        {!minimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 sm:p-4 space-y-1.5 max-h-[180px] overflow-y-auto">
              {logEntries.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex gap-2 text-xs sm:text-sm font-mono-brand leading-relaxed"
                >
                  <span className="text-muted-foreground shrink-0">{log.time}</span>
                  <span className={`font-bold shrink-0 ${log.color}`}>[{log.tag}]</span>
                  <span className="text-text-dim">{log.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main page ─── */
export default function PageDataFlow() {
  const svgRef = useRef<SVGSVGElement>(null);

  // Positions for flow lines
  const coreX = 480, coreY = 200;
  const sourcePositions = [
    { x: 60, y: 80 },
    { x: 60, y: 170 },
    { x: 60, y: 260 },
    { x: 60, y: 350 },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-7 gap-2">
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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 mb-5">
        {/* LEFT: Flow visualization */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-xl p-4 sm:p-6 relative overflow-hidden min-h-[420px]"
        >
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, hsl(43 56% 54%) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />

          {/* SVG flow visualization */}
          <svg ref={svgRef} viewBox="0 0 600 420" className="w-full h-full relative z-10" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowBig">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Flow lines */}
            {integrations.map((integ, i) => (
              <FlowLine
                key={integ.name}
                from={sourcePositions[i]}
                to={{ x: coreX - 50, y: coreY }}
                color={integ.color}
                delay={i * 0.5}
                status={integ.status}
              />
            ))}

            {/* Integration source cards */}
            {integrations.map((integ, i) => {
              const pos = sourcePositions[i];
              return (
                <g key={integ.name}>
                  {/* Card bg */}
                  <rect x={pos.x - 45} y={pos.y - 35} width="90" height="70" rx="10"
                    fill="hsl(255 20% 8%)" stroke="hsl(255 12% 21%)" strokeWidth="1" />
                  {/* Icon */}
                  <text x={pos.x} y={pos.y - 6} textAnchor="middle" fontSize="24">{integ.icon}</text>
                  {/* Name */}
                  <text x={pos.x} y={pos.y + 16} textAnchor="middle"
                    fill="hsl(253 30% 92%)" fontSize="11" fontWeight="600" fontFamily="inherit">
                    {integ.name}
                  </text>
                  {/* Status dot */}
                  <circle cx={pos.x - 30} cy={pos.y + 28} r="4"
                    fill={integ.status === "ok" ? "hsl(150 36% 46%)" : integ.status === "processing" ? "hsl(43 56% 54%)" : "hsl(0 47% 56%)"} />
                </g>
              );
            })}

            {/* Core AMOS engine */}
            <g>
              {/* Outer ring */}
              <circle cx={coreX} cy={coreY} r="65" fill="none" stroke="hsl(213 47% 57%)" strokeWidth="1.5"
                strokeDasharray="4 4" opacity="0.4" filter="url(#glow)">
                <animateTransform attributeName="transform" type="rotate"
                  from={`0 ${coreX} ${coreY}`} to={`360 ${coreX} ${coreY}`} dur="20s" repeatCount="indefinite" />
              </circle>
              {/* Inner ring */}
              <circle cx={coreX} cy={coreY} r="48" fill="hsl(255 20% 8%)" stroke="hsl(213 47% 57%)"
                strokeWidth="2" filter="url(#glow)" opacity="0.8" />
              {/* Pulsing glow */}
              <circle cx={coreX} cy={coreY} r="42" fill="hsl(213 47% 57%)" opacity="0.06">
                <animate attributeName="r" values="40;48;40" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.06;0.12;0.06" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Brain icon */}
              <text x={coreX} y={coreY + 5} textAnchor="middle" fontSize="32">🧠</text>
              {/* Label */}
              <text x={coreX} y={coreY + 55} textAnchor="middle"
                fill="hsl(253 30% 92%)" fontSize="12" fontWeight="700" fontFamily="inherit">
                Ядро АМОС
              </text>
              <text x={coreX} y={coreY + 70} textAnchor="middle"
                fill="hsl(252 10% 52%)" fontSize="10" fontFamily="inherit">
                (AI Engine)
              </text>
            </g>
          </svg>

          {/* Status labels below sources (HTML overlay) */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {integrations.map(integ => (
              <span key={integ.name} className={`text-[10px] font-mono-brand flex items-center gap-1 ${statusColor[integ.status]}`}>
                {statusIcon[integ.status]} {integ.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Stats panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          {/* Counters */}
          <div className="bg-surface border border-border rounded-xl p-4 sm:p-5">
            <div className="flex flex-col gap-3">
              <Counter target={14502} label="Сообщений проанализировано сегодня" />
              <div className="border-t border-border" />
              <Counter target={32} label="Выявлено новых паттернов" />
              <div className="border-t border-border" />
              <Counter target={148} label="Активных сессий" />
            </div>
          </div>

          {/* Integration health */}
          <div className="bg-surface border border-border rounded-xl p-4 sm:p-5">
            <h4 className="font-display text-[13px] font-semibold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-blue inline-block" />
              Статус интеграций
            </h4>
            <div className="flex flex-col gap-2">
              {integrations.map(integ => (
                <div key={integ.name} className={`flex items-center justify-between p-2.5 rounded-lg border transition-colors ${
                  integ.status === "error" ? "border-destructive/30 bg-destructive/5" :
                  integ.status === "processing" ? "border-primary/20 bg-primary/5" :
                  "border-border bg-card/50"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{integ.icon}</span>
                    <span className="text-xs font-semibold">{integ.name}</span>
                  </div>
                  <span className={`text-[10px] font-mono-brand font-semibold px-2 py-0.5 rounded-full border ${
                    integ.status === "ok" ? "bg-green/10 text-green border-green/30" :
                    integ.status === "processing" ? "bg-primary/10 text-primary border-primary/30" :
                    "bg-destructive/10 text-destructive border-destructive/30"
                  }`}>
                    {integ.status === "ok" ? "Online" : integ.status === "processing" ? "Syncing" : "Error"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Terminal log */}
      <TerminalLog />
    </div>
  );
}
