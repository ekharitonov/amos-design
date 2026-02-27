import { useState, useCallback } from "react";
import { nodes, nodeMap, edges, EdgeData } from "./DashboardData";

// Avatar imports
import avatarA1 from "@/assets/avatars/alexey-p.jpg";
import avatarMS from "@/assets/avatars/maria-s.jpg";
import avatarSS from "@/assets/avatars/sidorov-s.jpg";
import avatarMA from "@/assets/avatars/maria-a.jpg";
import avatarVN from "@/assets/avatars/valeria-n.jpg";
import avatarA2 from "@/assets/avatars/alexey-p2.jpg";
import avatarYS from "@/assets/avatars/yusnian-s.jpg";
import avatarAD from "@/assets/avatars/aleniev-d.jpg";
import avatarLS from "@/assets/avatars/lania-s.jpg";

const avatarMap: Record<string, string> = {
  a1: avatarA1, ms: avatarMS, ss: avatarSS, ma: avatarMA,
  vn: avatarVN, a2: avatarA2, ys: avatarYS, ad: avatarAD, ls: avatarLS,
};

interface NetGraphProps {
  onSelectEdge?: (edge: EdgeData, edgeKey: string) => void;
  selectedEdgeKey?: string | null;
}

export default function NetGraph({ onSelectEdge, selectedEdgeKey }: NetGraphProps) {
  const [hovEdge, setHovEdge] = useState<number | null>(null);
  const [hovNode, setHovNode] = useState<string | null>(null);

  const getEdgeKey = useCallback((e: EdgeData) => {
    return [e.a, e.b].sort().join("-");
  }, []);

  return (
    <svg viewBox="0 0 600 540" className="w-full h-auto" style={{ maxHeight: 520 }}>
      <defs>
        <filter id="edgeGlow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="avatarShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.6)" />
        </filter>

        {/* Clip paths for each node */}
        {nodes.map(nd => (
          <clipPath key={`clip-${nd.id}`} id={`clip-${nd.id}`}>
            <circle cx={nd.x} cy={nd.y} r={nd.r - 1} />
          </clipPath>
        ))}
      </defs>

      {/* Background rings */}
      <circle cx="300" cy="270" r="220" fill="none" stroke="rgba(91,142,201,0.04)" strokeWidth="1" />
      <circle cx="300" cy="270" r="160" fill="none" stroke="rgba(91,142,201,0.03)" strokeWidth="1" />

      {/* Edges */}
      {edges.map((e, i) => {
        const a = nodeMap[e.a], b = nodeMap[e.b];
        const key = getEdgeKey(e);
        const isActive = e.active;
        const isSelected = selectedEdgeKey === key;
        const isConnectedToHov = hovNode && (e.a === hovNode || e.b === hovNode);
        const isHov = hovEdge === i;

        let stroke = "rgba(91,142,201,0.12)";
        let width = 0.8;
        let filter = "none";

        if (isActive || isSelected) {
          stroke = "hsl(43 56% 54%)";
          width = 3;
          filter = "url(#edgeGlow)";
        } else if (isHov || isConnectedToHov) {
          stroke = "hsl(213 47% 57%)";
          width = 1.8;
        }

        return (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="transparent" strokeWidth={14} className="cursor-pointer"
              onMouseEnter={() => setHovEdge(i)} onMouseLeave={() => setHovEdge(null)}
              onClick={() => onSelectEdge?.(e, key)}
            />
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={stroke} strokeWidth={width} filter={filter}
              className="pointer-events-none"
              style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
            />
          </g>
        );
      })}

      {/* Active bridge label */}
      {(() => {
        const activeEdge = edges.find(e => e.active);
        if (!activeEdge) return null;
        const a = nodeMap[activeEdge.a], b = nodeMap[activeEdge.b];
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        return (
          <g>
            <rect x={mx - 70} y={my - 16} width="140" height="30" rx="8"
              fill="hsl(255 17% 14%)" stroke="hsl(43 56% 54%)" strokeWidth="1.5" fillOpacity="0.95" />
            <text x={mx} y={my + 4} textAnchor="middle"
              fill="hsl(43 56% 54%)" fontSize={12} fontWeight={700}
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Активный Мост
            </text>
          </g>
        );
      })()}

      {/* Nodes with avatars */}
      {nodes.map(nd => {
        const isHov = hovNode === nd.id;
        const isInSelected = selectedEdgeKey?.includes(nd.id);
        const showGlow = nd.hi || isHov || isInSelected;
        const avatar = avatarMap[nd.id];

        return (
          <g key={nd.id} className="cursor-pointer"
            onMouseEnter={() => setHovNode(nd.id)}
            onMouseLeave={() => setHovNode(null)}>

            {/* Outer glow ring */}
            {showGlow && (
              <circle cx={nd.x} cy={nd.y} r={nd.r + 7}
                fill="none"
                stroke={nd.hi || isInSelected ? "hsl(43 56% 54%)" : "hsl(213 47% 57%)"}
                strokeWidth={1.5}
                filter="url(#nodeGlow)"
                opacity={isHov ? 1 : 0.6}
                style={{ transition: "opacity 0.2s" }}
              />
            )}

            {/* Border circle */}
            <circle cx={nd.x} cy={nd.y} r={nd.r}
              fill="hsl(255 17% 14%)"
              stroke={nd.hi || isInSelected ? "hsl(43 56% 54%)" : isHov ? "hsl(213 47% 57%)" : "hsl(255 12% 24%)"}
              strokeWidth={nd.hi || isInSelected ? 2.5 : 1.5}
              filter="url(#avatarShadow)"
              style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
            />

            {/* Avatar photo */}
            {avatar && (
              <image
                href={avatar}
                x={nd.x - nd.r + 1}
                y={nd.y - nd.r + 1}
                width={(nd.r - 1) * 2}
                height={(nd.r - 1) * 2}
                clipPath={`url(#clip-${nd.id})`}
                preserveAspectRatio="xMidYMid slice"
                style={{ pointerEvents: "none" }}
              />
            )}

            {/* Name label */}
            <text x={nd.x} y={nd.y + nd.r + 18} textAnchor="middle"
              fill={isHov || isInSelected ? "hsl(253 30% 92%)" : "hsl(252 10% 58%)"}
              fontSize={11} fontWeight={isInSelected ? 600 : 400}
              style={{ transition: "fill 0.2s", pointerEvents: "none", fontFamily: "'Source Sans 3', sans-serif" }}>
              {nd.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
