import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import brainImg from "@/assets/brain-core.png";

/* ─── Integrations ─── */
interface Integration {
  name: string;
  icon: string;
  status: "ok" | "processing" | "error";
  statusText: string;
  y: number;
}

const initialIntegrations: Integration[] = [
  { name: "Slack", icon: "💬", status: "ok", statusText: "Подключено: 15 мин назад (OK)", y: 70 },
  { name: "Jira", icon: "📋", status: "ok", statusText: "Подключено: 10 мин назад (OK)", y: 210 },
  { name: "Zoom", icon: "🎥", status: "processing", statusText: "Синхронизация... (Processing)", y: 350 },
  { name: "Corporate Email", icon: "✉️", status: "error", statusText: "Ошибка доступа (Red Error)", y: 490 },
];

const statusDotColor = { ok: "#22C55E", processing: "#C9A84C", error: "#EF4444" };
const statusTextColor = { ok: "#22C55E", processing: "#C9A84C", error: "#EF4444" };

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
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [reconnecting, setReconnecting] = useState<string | null>(null);

  const handleReconnect = (name: string) => {
    setReconnecting(name);
    setIntegrations(prev => prev.map(i =>
      i.name === name ? { ...i, status: "processing" as const, statusText: "Переподключение..." } : i
    ));
    setTimeout(() => {
      setIntegrations(prev => prev.map(i =>
        i.name === name ? { ...i, status: "ok" as const, statusText: "Подключено: только что (OK)" } : i
      ));
      setReconnecting(null);
    }, 3000);
  };
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
            {/* Beam gradient */}
            <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="1" />
              <stop offset="30%" stopColor="#E2C86A" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#60A5FA" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beamGradBright" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFF8E1" stopOpacity="0.9" />
              <stop offset="20%" stopColor="#E2C86A" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#93C5FD" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
            <filter id="beamGlow">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
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
          <g className="cursor-pointer">
            {/* ── VISIBLE ORBIT 1 (outermost) ── */}
            <circle cx={coreX} cy={coreY} r="115" fill="none" stroke="#3B82F6" strokeWidth="0.7" opacity="0.35" />
            {/* Rotating dashes on orbit 1 */}
            <circle cx={coreX} cy={coreY} r="115" fill="none" stroke="#60A5FA" strokeWidth="1"
              strokeDasharray="3 20" opacity="0.2">
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${coreX} ${coreY}`} to={`360 ${coreX} ${coreY}`} dur="30s" repeatCount="indefinite" />
            </circle>
            {/* Orbiting objects on orbit 1 */}
            <circle r="5" fill="#60A5FA" opacity="0.9" filter="url(#softGlow)">
              <animateMotion dur="8s" repeatCount="indefinite"
                path={`M ${coreX},${coreY - 115} A 115,115 0 1,1 ${coreX - 0.01},${coreY - 115}`} />
            </circle>
            <circle r="3" fill="#93C5FD" opacity="0.7">
              <animateMotion dur="8s" repeatCount="indefinite" begin="4s"
                path={`M ${coreX},${coreY - 115} A 115,115 0 1,1 ${coreX - 0.01},${coreY - 115}`} />
            </circle>
            <rect width="6" height="6" rx="1" fill="#C9A84C" opacity="0.8" filter="url(#softGlow)">
              <animateMotion dur="12s" repeatCount="indefinite"
                path={`M ${coreX + 115},${coreY} A 115,115 0 1,1 ${coreX + 114.99},${coreY}`} />
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
            </rect>

            {/* ── VISIBLE ORBIT 2 (middle) ── */}
            <circle cx={coreX} cy={coreY} r="95" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
            <circle cx={coreX} cy={coreY} r="95" fill="none" stroke="#3B82F6" strokeWidth="0.8"
              strokeDasharray="5 12" opacity="0.15">
              <animateTransform attributeName="transform" type="rotate"
                from={`360 ${coreX} ${coreY}`} to={`0 ${coreX} ${coreY}`} dur="22s" repeatCount="indefinite" />
            </circle>
            {/* Orbiting objects on orbit 2 */}
            <circle r="4" fill="#3B82F6" opacity="0.85" filter="url(#softGlow)">
              <animateMotion dur="6s" repeatCount="indefinite"
                path={`M ${coreX - 95},${coreY} A 95,95 0 1,0 ${coreX - 94.99},${coreY}`} />
            </circle>
            <polygon points="0,-4 3.5,2 -3.5,2" fill="#E2C86A" opacity="0.8" filter="url(#softGlow)">
              <animateMotion dur="9s" repeatCount="indefinite" begin="2s"
                path={`M ${coreX},${coreY + 95} A 95,95 0 1,1 ${coreX + 0.01},${coreY + 95}`} />
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" />
            </polygon>
            <circle r="2.5" fill="#93C5FD" opacity="0.6">
              <animateMotion dur="6s" repeatCount="indefinite" begin="3s"
                path={`M ${coreX - 95},${coreY} A 95,95 0 1,0 ${coreX - 94.99},${coreY}`} />
            </circle>

            {/* ── VISIBLE ORBIT 3 (inner) ── */}
            <circle cx={coreX} cy={coreY} r="88" fill="none" stroke="#60A5FA" strokeWidth="0.4" opacity="0.25" />
            <circle cx={coreX} cy={coreY} r="88" fill="none" stroke="#60A5FA" strokeWidth="0.6"
              strokeDasharray="2 16" opacity="0.2">
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${coreX} ${coreY}`} to={`360 ${coreX} ${coreY}`} dur="14s" repeatCount="indefinite" />
            </circle>
            {/* Orbiting objects on orbit 3 */}
            <circle r="3.5" fill="#C9A84C" opacity="0.8" filter="url(#softGlow)">
              <animateMotion dur="5s" repeatCount="indefinite"
                path={`M ${coreX},${coreY - 88} A 88,88 0 1,1 ${coreX - 0.01},${coreY - 88}`} />
            </circle>
            <circle r="2" fill="#60A5FA" opacity="0.5">
              <animateMotion dur="5s" repeatCount="indefinite" begin="2.5s"
                path={`M ${coreX},${coreY - 88} A 88,88 0 1,1 ${coreX - 0.01},${coreY - 88}`} />
            </circle>

            {/* Pulsing outer glow */}
            <circle cx={coreX} cy={coreY} r="85" fill="#3B82F6" opacity="0.03">
              <animate attributeName="r" values="80;100;80" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.03;0.08;0.03" dur="4s" repeatCount="indefinite" />
            </circle>
            {/* Labels */}
            <text x={coreX} y={coreY + 92} textAnchor="middle"
              fill="#E8E8F0" fontSize="16" fontWeight="700" fontFamily="'Playfair Display', serif">
              Ядро АМОС
            </text>
            <text x={coreX} y={coreY + 110} textAnchor="middle"
              fill="#6B6B80" fontSize="12" fontFamily="'Playfair Display', serif">
              (AI Engine)
            </text>
          </g>

          {/* ═══ NEURAL BEAM FROM CORE ═══ */}
          <g>
            {/* Wide soft beam glow */}
            <path d={`M ${coreX + 78} ${coreY} Q ${coreX + 200} ${coreY}, 900 ${coreY}`}
              fill="none" stroke="url(#beamGrad)" strokeWidth="28" opacity="0.15" filter="url(#beamGlow)">
              <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2.5s" repeatCount="indefinite" />
            </path>
            {/* Medium beam */}
            <path d={`M ${coreX + 78} ${coreY} Q ${coreX + 200} ${coreY}, 900 ${coreY}`}
              fill="none" stroke="url(#beamGrad)" strokeWidth="8" opacity="0.5" filter="url(#softGlow)">
              <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
            </path>
            {/* Bright core beam */}
            <path d={`M ${coreX + 78} ${coreY} Q ${coreX + 200} ${coreY}, 900 ${coreY}`}
              fill="none" stroke="url(#beamGradBright)" strokeWidth="2" opacity="0.8">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
            </path>

            {/* Neural network branches */}
            {/* Upper branches */}
            <path d={`M ${coreX + 180} ${coreY - 5} L 780 ${coreY - 60} L 850 ${coreY - 60}`}
              fill="none" stroke="#3B82F6" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
            <path d={`M ${coreX + 220} ${coreY - 8} L 760 ${coreY - 110} L 830 ${coreY - 130}`}
              fill="none" stroke="#3B82F6" strokeWidth="0.8" opacity="0.2" strokeLinecap="round" />
            <path d={`M ${coreX + 260} ${coreY - 3} L 800 ${coreY - 35} L 880 ${coreY - 40}`}
              fill="none" stroke="#60A5FA" strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
            {/* Lower branches */}
            <path d={`M ${coreX + 180} ${coreY + 5} L 780 ${coreY + 55} L 860 ${coreY + 55}`}
              fill="none" stroke="#3B82F6" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
            <path d={`M ${coreX + 220} ${coreY + 8} L 750 ${coreY + 100} L 840 ${coreY + 120}`}
              fill="none" stroke="#3B82F6" strokeWidth="0.8" opacity="0.2" strokeLinecap="round" />
            <path d={`M ${coreX + 260} ${coreY + 3} L 810 ${coreY + 30} L 890 ${coreY + 25}`}
              fill="none" stroke="#60A5FA" strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />

            {/* Branch endpoint dots */}
            {[
              { x: 850, y: coreY - 60 }, { x: 830, y: coreY - 130 }, { x: 880, y: coreY - 40 },
              { x: 860, y: coreY + 55 }, { x: 840, y: coreY + 120 }, { x: 890, y: coreY + 25 },
            ].map((dot, i) => (
              <circle key={`nd-${i}`} cx={dot.x} cy={dot.y} r="3" fill="#60A5FA" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="r" values="2;4;2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Pulse particles along the beam */}
            <circle r="5" fill="#C9A84C" opacity="0.9" filter="url(#softGlow)">
              <animateMotion dur="2s" repeatCount="indefinite" path={`M ${coreX + 78},${coreY} L 900,${coreY}`} />
              <animate attributeName="r" values="5;2;5" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="3" fill="#FFF8E1" opacity="0.7">
              <animateMotion dur="2s" repeatCount="indefinite" begin="0.7s" path={`M ${coreX + 78},${coreY} L 900,${coreY}`} />
              <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" begin="0.7s" />
            </circle>
            <circle r="4" fill="#E2C86A" opacity="0.6" filter="url(#softGlow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.3s" path={`M ${coreX + 78},${coreY} L 900,${coreY}`} />
            </circle>

            {/* Floating binary/data particles near branches */}
            {[
              { x: 750, y: coreY - 50, text: "101001" },
              { x: 800, y: coreY + 40, text: "010110" },
              { x: 720, y: coreY - 90, text: "110010" },
              { x: 770, y: coreY + 85, text: "001101" },
            ].map((d, i) => (
              <text key={`bin-${i}`} x={d.x} y={d.y} fontSize="8" fill="#3B82F6" opacity="0.15"
                fontFamily="'JetBrains Mono', monospace">
                <animate attributeName="opacity" values="0.08;0.25;0.08" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                {d.text}
              </text>
            ))}
          </g>

        </svg>

        {/* ═══ RECONNECT BUTTONS (HTML overlay) ═══ */}
        {integrations.map((integ) => {
          if (integ.status !== "error") return null;
          const topPercent = ((integ.y + 55) / 600) * 100;
          return (
            <motion.button
              key={`reconnect-${integ.name}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleReconnect(integ.name)}
              disabled={reconnecting === integ.name}
              className="absolute z-20 px-3 py-1.5 text-[10px] sm:text-xs font-mono-brand font-semibold rounded-md bg-destructive/15 border border-destructive/30 text-destructive hover:bg-destructive/25 transition-colors disabled:opacity-50"
              style={{ left: "4%", top: `${topPercent}%` }}
            >
              {reconnecting === integ.name ? "⟳ Connecting..." : "🔄 Reconnect"}
            </motion.button>
          );
        })}

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
