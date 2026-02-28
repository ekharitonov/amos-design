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
            {/* Beam gradients */}
            <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFF8E1" stopOpacity="1" />
              <stop offset="8%" stopColor="#C9A84C" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#E2C86A" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.3" />
              <stop offset="80%" stopColor="#60A5FA" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beamGradBright" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="5%" stopColor="#FFF8E1" stopOpacity="0.95" />
              <stop offset="15%" stopColor="#E2C86A" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#C9A84C" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#60A5FA" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beamGradWarm" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFF0C0" stopOpacity="0.8" />
              <stop offset="10%" stopColor="#DAB44E" stopOpacity="0.5" />
              <stop offset="35%" stopColor="#C9A84C" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="beamOriginGlow" cx="0" cy="0.5" r="0.4" fx="0" fy="0.5">
              <stop offset="0%" stopColor="#FFF8E1" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </radialGradient>
            <filter id="beamGlow">
              <feGaussianBlur stdDeviation="8" result="b1" />
              <feGaussianBlur stdDeviation="20" result="b2" />
              <feMerge><feMergeNode in="b2" /><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="plasmaGlow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feComposite in="b" in2="SourceGraphic" operator="over" />
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

          {/* ═══ CORE AMOS ENGINE — ROUNDED SQUARE FRAME ═══ */}
          <g className="cursor-pointer">
            {/* Outer rounded rect frame - subtle */}
            <rect x={coreX - 82} y={coreY - 82} width="164" height="164" rx="28"
              fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.2" />
            {/* Main rounded rect frame */}
            <rect x={coreX - 72} y={coreY - 72} width="144" height="144" rx="24"
              fill="hsl(220 25% 8%)" stroke="#3B82F6" strokeWidth="2" opacity="0.9" filter="url(#softGlow)" />
            {/* Inner glow fill */}
            <rect x={coreX - 72} y={coreY - 72} width="144" height="144" rx="24"
              fill="#3B82F6" opacity="0.05">
              <animate attributeName="opacity" values="0.03;0.1;0.03" dur="3s" repeatCount="indefinite" />
            </rect>
            {/* Brain image */}
            <image href={brainImg} x={coreX - 54} y={coreY - 54} width="108" height="108" filter="url(#softGlow)">
              <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
            </image>
            {/* Corner accents */}
            {[
              { x: coreX - 78, y: coreY - 78 }, { x: coreX + 68, y: coreY - 78 },
              { x: coreX - 78, y: coreY + 68 }, { x: coreX + 68, y: coreY + 68 },
            ].map((c, i) => (
              <circle key={`corner-${i}`} cx={c.x + 5} cy={c.y + 5} r="2" fill="#60A5FA" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {/* Labels */}
            <text x={coreX} y={coreY + 100} textAnchor="middle"
              fill="#E8E8F0" fontSize="16" fontWeight="700" fontFamily="'Playfair Display', serif">
              Ядро АМОС
            </text>
            <text x={coreX} y={coreY + 118} textAnchor="middle"
              fill="#6B6B80" fontSize="12" fontFamily="'Playfair Display', serif">
              (AI Engine)
            </text>
          </g>

          {/* ═══ PLASMA LASER BEAM ═══ */}
          <g>
            {/* Origin burst — radial glow at the source point */}
            <ellipse cx={coreX + 72} cy={coreY} rx="40" ry="50" fill="url(#beamOriginGlow)" opacity="0.8">
              <animate attributeName="rx" values="35;50;35" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
            </ellipse>

            {/* Layer 1: Ultra-wide plasma field */}
            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke="#C9A84C" strokeWidth="80" opacity="0.03" filter="url(#beamGlow)">
              <animate attributeName="opacity" values="0.02;0.06;0.02" dur="2s" repeatCount="indefinite" />
            </line>
            {/* Layer 2: Wide warm haze */}
            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke="url(#beamGradWarm)" strokeWidth="45" opacity="0.15" filter="url(#beamGlow)">
              <animate attributeName="opacity" values="0.1;0.22;0.1" dur="1.3s" repeatCount="indefinite" />
            </line>
            {/* Layer 3: Golden plasma sheath */}
            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke="url(#beamGrad)" strokeWidth="22" opacity="0.25" filter="url(#beamGlow)">
              <animate attributeName="opacity" values="0.2;0.35;0.2" dur="0.9s" repeatCount="indefinite" />
            </line>
            {/* Layer 4: Intense beam body */}
            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke="url(#beamGrad)" strokeWidth="10" opacity="0.7" filter="url(#plasmaGlow)">
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="strokeWidth" values="9;12;9" dur="0.8s" repeatCount="indefinite" />
            </line>
            {/* Layer 5: Hot bright core */}
            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke="url(#beamGradBright)" strokeWidth="4" opacity="0.9" filter="url(#plasmaGlow)">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="0.35s" repeatCount="indefinite" />
            </line>
            {/* Layer 6: White-hot plasma core */}
            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke="#FFFDE8" strokeWidth="1.8" opacity="0.95">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="0.25s" repeatCount="indefinite" />
              <animate attributeName="strokeWidth" values="1.5;2.5;1.5" dur="0.4s" repeatCount="indefinite" />
            </line>

            {/* Plasma jitter lines — slight offset beams for turbulence */}
            <line x1={coreX + 80} y1={coreY - 1.5} x2="900" y2={coreY - 2}
              stroke="url(#beamGradBright)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur="0.5s" repeatCount="indefinite" />
              <animate attributeName="y1" values={`${coreY - 1.5};${coreY - 3};${coreY - 1.5}`} dur="0.7s" repeatCount="indefinite" />
            </line>
            <line x1={coreX + 80} y1={coreY + 1.5} x2="900" y2={coreY + 2}
              stroke="url(#beamGradBright)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y1" values={`${coreY + 1.5};${coreY + 3};${coreY + 1.5}`} dur="0.8s" repeatCount="indefinite" />
            </line>

            {/* Plasma spark particles — many, varied speeds and sizes */}
            {[
              { delay: 0, r: 5, color: "#FFFFFF", dur: 1.0 },
              { delay: 0.15, r: 3, color: "#FFF8E1", dur: 1.2 },
              { delay: 0.3, r: 4, color: "#E2C86A", dur: 0.9 },
              { delay: 0.45, r: 2.5, color: "#FFFFFF", dur: 1.1 },
              { delay: 0.6, r: 6, color: "#FFF0C0", dur: 1.3 },
              { delay: 0.75, r: 2, color: "#E2C86A", dur: 0.8 },
              { delay: 0.9, r: 3.5, color: "#FFF8E1", dur: 1.0 },
              { delay: 1.05, r: 4.5, color: "#FFFFFF", dur: 1.4 },
              { delay: 1.2, r: 2, color: "#C9A84C", dur: 0.7 },
              { delay: 1.35, r: 3, color: "#FFF0C0", dur: 1.1 },
            ].map((p, i) => (
              <circle key={`pp-${i}`} r={p.r} fill={p.color} opacity="0.9" filter="url(#plasmaGlow)">
                <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`}
                  path={`M ${coreX + 72},${coreY + (i % 3 - 1) * 2} L 900,${coreY + (i % 5 - 2) * 1.5}`} />
                <animate attributeName="opacity" values="1;0.1;0" dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`} />
                <animate attributeName="r" values={`${p.r};${p.r * 0.3};0`} dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`} />
              </circle>
            ))}

            {/* Sparkle bursts near origin */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const sx = coreX + 72 + Math.cos(rad) * 15;
              const sy = coreY + Math.sin(rad) * 15;
              const ex = coreX + 72 + Math.cos(rad) * 35;
              const ey = coreY + Math.sin(rad) * 25;
              return (
                <line key={`spark-${i}`} x1={sx} y1={sy} x2={ex} y2={ey}
                  stroke="#FFF8E1" strokeWidth="0.8" opacity="0.3" strokeLinecap="round">
                  <animate attributeName="opacity" values="0;0.5;0" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.25}s`} />
                </line>
              );
            })}

            {/* ── CIRCUIT BOARD BRANCHES ── */}
            {/* Upper circuit lines */}
            <path d={`M ${coreX + 150} ${coreY} L ${coreX + 180} ${coreY - 30} L 750 ${coreY - 30} L 770 ${coreY - 50} L 850 ${coreY - 50}`}
              fill="none" stroke="#3B82F6" strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />
            <path d={`M ${coreX + 200} ${coreY} L ${coreX + 220} ${coreY - 55} L 720 ${coreY - 55} L 740 ${coreY - 80} L 780 ${coreY - 80} L 800 ${coreY - 105} L 870 ${coreY - 105}`}
              fill="none" stroke="#3B82F6" strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
            <path d={`M ${coreX + 170} ${coreY} L ${coreX + 190} ${coreY - 15} L 790 ${coreY - 15} L 810 ${coreY - 30} L 890 ${coreY - 30}`}
              fill="none" stroke="#60A5FA" strokeWidth="0.7" opacity="0.2" strokeLinecap="round" />
            <path d={`M ${coreX + 250} ${coreY - 2} L ${coreX + 270} ${coreY - 70} L 700 ${coreY - 70} L 720 ${coreY - 130} L 830 ${coreY - 130}`}
              fill="none" stroke="#3B82F6" strokeWidth="0.6" opacity="0.18" strokeLinecap="round" />
            {/* Lower circuit lines */}
            <path d={`M ${coreX + 150} ${coreY} L ${coreX + 180} ${coreY + 30} L 750 ${coreY + 30} L 770 ${coreY + 50} L 860 ${coreY + 50}`}
              fill="none" stroke="#3B82F6" strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />
            <path d={`M ${coreX + 200} ${coreY} L ${coreX + 220} ${coreY + 55} L 710 ${coreY + 55} L 730 ${coreY + 85} L 770 ${coreY + 85} L 790 ${coreY + 110} L 860 ${coreY + 110}`}
              fill="none" stroke="#3B82F6" strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
            <path d={`M ${coreX + 170} ${coreY} L ${coreX + 190} ${coreY + 15} L 800 ${coreY + 15} L 820 ${coreY + 28} L 890 ${coreY + 28}`}
              fill="none" stroke="#60A5FA" strokeWidth="0.7" opacity="0.2" strokeLinecap="round" />
            <path d={`M ${coreX + 250} ${coreY + 2} L ${coreX + 270} ${coreY + 72} L 690 ${coreY + 72} L 710 ${coreY + 135} L 840 ${coreY + 135}`}
              fill="none" stroke="#3B82F6" strokeWidth="0.6" opacity="0.18" strokeLinecap="round" />

            {/* Pulse particles running along circuit branches */}
            {[
              `M ${coreX + 150},${coreY} L ${coreX + 180},${coreY - 30} L 750,${coreY - 30} L 770,${coreY - 50} L 850,${coreY - 50}`,
              `M ${coreX + 150},${coreY} L ${coreX + 180},${coreY + 30} L 750,${coreY + 30} L 770,${coreY + 50} L 860,${coreY + 50}`,
              `M ${coreX + 200},${coreY} L ${coreX + 220},${coreY - 55} L 720,${coreY - 55} L 740,${coreY - 80} L 780,${coreY - 80} L 800,${coreY - 105} L 870,${coreY - 105}`,
              `M ${coreX + 200},${coreY} L ${coreX + 220},${coreY + 55} L 710,${coreY + 55} L 730,${coreY + 85} L 770,${coreY + 85} L 790,${coreY + 110} L 860,${coreY + 110}`,
            ].map((path, i) => (
              <g key={`cp-${i}`}>
                <circle r="2.5" fill="#60A5FA" opacity="0.8" filter="url(#softGlow)">
                  <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} path={path} />
                  <animate attributeName="opacity" values="0.5;1;0.5" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
                </circle>
                <circle r="1.5" fill="#93C5FD" opacity="0.5">
                  <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8 + 1.5}s`} path={path} />
                </circle>
              </g>
            ))}

            {/* Circuit branch junction dots */}
            {[
              { x: coreX + 180, y: coreY - 30 }, { x: 770, y: coreY - 50 },
              { x: coreX + 220, y: coreY - 55 }, { x: 800, y: coreY - 105 },
              { x: coreX + 180, y: coreY + 30 }, { x: 770, y: coreY + 50 },
              { x: coreX + 220, y: coreY + 55 }, { x: 790, y: coreY + 110 },
              { x: 740, y: coreY - 80 }, { x: 730, y: coreY + 85 },
            ].map((dot, i) => (
              <circle key={`jd-${i}`} cx={dot.x} cy={dot.y} r="2.5" fill="#60A5FA" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Endpoint terminal dots */}
            {[
              { x: 850, y: coreY - 50 }, { x: 870, y: coreY - 105 }, { x: 890, y: coreY - 30 }, { x: 830, y: coreY - 130 },
              { x: 860, y: coreY + 50 }, { x: 860, y: coreY + 110 }, { x: 890, y: coreY + 28 }, { x: 840, y: coreY + 135 },
            ].map((dot, i) => (
              <g key={`td-${i}`}>
                <circle cx={dot.x} cy={dot.y} r="3.5" fill="#3B82F6" opacity="0.15" filter="url(#softGlow)">
                  <animate attributeName="r" values="3;6;3" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.1;0.35;0.1" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={dot.x} cy={dot.y} r="2" fill="#60A5FA" opacity="0.7">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + i * 0.25}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}

            {/* Binary data streams */}
            {[
              { x: 740, y: coreY - 42, text: "10011010101" },
              { x: 690, y: coreY - 68, text: "01101100010" },
              { x: 780, y: coreY - 95, text: "10011101011" },
              { x: 720, y: coreY - 122, text: "00110100" },
              { x: 740, y: coreY + 42, text: "01011010110" },
              { x: 700, y: coreY + 68, text: "11001010100" },
              { x: 760, y: coreY + 98, text: "01101011" },
              { x: 710, y: coreY + 128, text: "100110" },
              { x: 800, y: coreY - 18, text: "1001110101011" },
              { x: 810, y: coreY + 12, text: "0110101001101" },
            ].map((d, i) => (
              <text key={`bin-${i}`} x={d.x} y={d.y} fontSize="7" fill="#3B82F6" opacity="0.12"
                fontFamily="'JetBrains Mono', monospace" letterSpacing="1.5">
                <animate attributeName="opacity" values="0.06;0.22;0.06" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
                {d.text}
              </text>
            ))}

            {/* Scattered floating particles */}
            {Array.from({ length: 20 }).map((_, i) => {
              const px = coreX + 90 + (i * 37) % 280;
              const py = coreY - 100 + (i * 23) % 200;
              const r = 0.8 + (i % 4) * 0.5;
              return (
                <circle key={`sp-${i}`} cx={px} cy={py} r={r}
                  fill={i % 3 === 0 ? "#C9A84C" : "#60A5FA"} opacity={0.15 + (i % 5) * 0.04}>
                  <animate attributeName="opacity"
                    values={`${0.08 + (i % 3) * 0.05};${0.3 + (i % 4) * 0.05};${0.08 + (i % 3) * 0.05}`}
                    dur={`${2 + (i % 5) * 0.6}s`} repeatCount="indefinite" />
                </circle>
              );
            })}
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
