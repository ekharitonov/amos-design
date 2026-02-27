import { useState } from "react";
import { nodes, nodeMap, edges } from "./DashboardData";

export default function NetGraph() {
  const [hov, setHov] = useState<number | null>(null);
  const [hovNode, setHovNode] = useState<string | null>(null);

  return (
    <svg viewBox="0 0 600 530" className="w-full h-auto">
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="nodeGlow"><feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <radialGradient id="nodeFill" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#353448" /><stop offset="100%" stopColor="hsl(255 17% 14%)" />
        </radialGradient>
      </defs>

      {edges.map((e, i) => {
        const a = nodeMap[e.a], b = nodeMap[e.b];
        const isActive = e.active;
        const connected = hovNode && (e.a === hovNode || e.b === hovNode);
        return (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={isActive ? "hsl(43 56% 54%)" : hov === i || connected ? "hsl(213 47% 57%)" : "rgba(91,142,201,0.15)"}
            strokeWidth={isActive ? 3.5 : hov === i || connected ? 2 : 0.8}
            filter={isActive ? "url(#glow)" : "none"}
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
          />
        );
      })}

      <g>
        <rect x="240" y="222" width="140" height="30" rx="8" fill="hsl(255 17% 17%)" stroke="hsl(43 56% 54%)" strokeWidth="1.5" />
        <text x="310" y="242" textAnchor="middle" fill="hsl(43 56% 54%)" fontSize={12} fontWeight={700}>Активный Мост</text>
      </g>

      {nodes.map(nd => {
        const isHov = hovNode === nd.id;
        return (
          <g key={nd.id} className="cursor-pointer transition-transform duration-200"
            onMouseEnter={() => setHovNode(nd.id)} onMouseLeave={() => setHovNode(null)}>
            {(nd.hi || isHov) && (
              <circle cx={nd.x} cy={nd.y} r={nd.r + 6}
                fill="none" stroke={nd.hi ? "hsl(43 56% 54%)" : "hsl(213 47% 57%)"} strokeWidth={1.5}
                filter="url(#nodeGlow)" opacity={isHov ? 1 : 0.7} />
            )}
            <circle cx={nd.x} cy={nd.y} r={nd.r}
              fill="url(#nodeFill)" stroke={nd.hi ? "hsl(43 56% 54%)" : isHov ? "hsl(213 47% 57%)" : "hsl(255 12% 21%)"}
              strokeWidth={nd.hi ? 2 : 1} />
            <text x={nd.x} y={nd.y + 4} textAnchor="middle"
              fill={nd.hi ? "hsl(43 56% 54%)" : isHov ? "hsl(213 47% 57%)" : "hsl(253 30% 92%)"}
              fontSize={nd.r > 18 ? 13 : 10} fontWeight={600} className="pointer-events-none">
              {nd.n.split(" ").map(w => w[0]).join("")}
            </text>
            <text x={nd.x} y={nd.y + nd.r + 16} textAnchor="middle"
              fill={isHov ? "hsl(253 30% 92%)" : "hsl(252 10% 62%)"} fontSize={10} className="pointer-events-none">
              {nd.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
