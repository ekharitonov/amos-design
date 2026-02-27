import { useState, useCallback, useRef, useEffect } from "react";
import { nodes as initialNodes, edges, EdgeData } from "./DashboardData";

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

type NodePos = { id: string; n: string; x: number; y: number; r: number; hi?: boolean };

export default function NetGraph({ onSelectEdge, selectedEdgeKey }: NetGraphProps) {
  const [hovEdge, setHovEdge] = useState<number | null>(null);
  const [hovNode, setHovNode] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<NodePos[]>(() =>
    initialNodes.map(n => ({ ...n }))
  );
  const [dragId, setDragId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragStart = useRef<{ ox: number; oy: number; mx: number; my: number } | null>(null);

  const nodeMap = useRef<Record<string, NodePos>>({});
  useEffect(() => {
    const map: Record<string, NodePos> = {};
    nodePositions.forEach(n => { map[n.id] = n; });
    nodeMap.current = map;
  }, [nodePositions]);

  const getEdgeKey = useCallback((e: EdgeData) => {
    return [e.a, e.b].sort().join("-");
  }, []);

  const getSVGPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const svgPt = pt.matrixTransform(ctm.inverse());
    return { x: svgPt.x, y: svgPt.y };
  }, []);

  const handlePointerDown = useCallback((id: string, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const node = nodeMap.current[id];
    if (!node) return;
    const svgPt = getSVGPoint(e.clientX, e.clientY);
    dragStart.current = { ox: node.x, oy: node.y, mx: svgPt.x, my: svgPt.y };
    setDragId(id);
    (e.target as SVGElement).setPointerCapture(e.pointerId);
  }, [getSVGPoint]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragId || !dragStart.current) return;
    const svgPt = getSVGPoint(e.clientX, e.clientY);
    const dx = svgPt.x - dragStart.current.mx;
    const dy = svgPt.y - dragStart.current.my;
    const newX = Math.max(30, Math.min(570, dragStart.current.ox + dx));
    const newY = Math.max(30, Math.min(510, dragStart.current.oy + dy));

    setNodePositions(prev =>
      prev.map(n => n.id === dragId ? { ...n, x: newX, y: newY } : n)
    );
  }, [dragId, getSVGPoint]);

  const handlePointerUp = useCallback(() => {
    setDragId(null);
    dragStart.current = null;
  }, []);

  const nMap = nodeMap.current;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 540"
      className="w-full h-auto select-none"
      style={{ maxHeight: 520, touchAction: "none" }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <defs>
        <filter id="edgeGlow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="edgePulse">
          <feGaussianBlur stdDeviation="4" result="b">
            <animate attributeName="stdDeviation" values="2;5;2" dur="2s" repeatCount="indefinite" />
          </feGaussianBlur>
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="avatarShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.6)" />
        </filter>
        <filter id="nodePulse">
          <feGaussianBlur stdDeviation="5" result="b">
            <animate attributeName="stdDeviation" values="3;7;3" dur="2s" repeatCount="indefinite" />
          </feGaussianBlur>
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Clip paths — dynamic positions */}
        {nodePositions.map(nd => (
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
        const a = nMap[e.a], b = nMap[e.b];
        if (!a || !b) return null;
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
          filter = isActive ? "url(#edgePulse)" : "url(#edgeGlow)";
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
              style={{ transition: dragId ? "none" : "stroke 0.2s, stroke-width 0.2s" }}
            />
          </g>
        );
      })}

      {/* Active bridge label */}
      {(() => {
        const activeEdge = edges.find(e => e.active);
        if (!activeEdge) return null;
        const a = nMap[activeEdge.a], b = nMap[activeEdge.b];
        if (!a || !b) return null;
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
      {nodePositions.map(nd => {
        const isHov = hovNode === nd.id;
        const isDragging = dragId === nd.id;
        const isInSelected = selectedEdgeKey?.includes(nd.id);
        const showGlow = nd.hi || isHov || isInSelected || isDragging;
        const avatar = avatarMap[nd.id];

        return (
          <g key={nd.id}
            className={isDragging ? "cursor-grabbing" : "cursor-grab"}
            onMouseEnter={() => !dragId && setHovNode(nd.id)}
            onMouseLeave={() => !dragId && setHovNode(null)}
            onPointerDown={(e) => handlePointerDown(nd.id, e)}
          >
            {/* Outer glow ring */}
            {showGlow && (
              <circle cx={nd.x} cy={nd.y} r={nd.r + 7}
                fill="none"
                stroke={isDragging ? "hsl(213 47% 57%)" : nd.hi || isInSelected ? "hsl(43 56% 54%)" : "hsl(213 47% 57%)"}
                strokeWidth={isDragging ? 2 : 1.5}
                filter={nd.hi && !isDragging ? "url(#nodePulse)" : "url(#nodeGlow)"}
                opacity={isHov || isDragging ? 1 : 0.6}
                style={{ transition: dragId ? "none" : "opacity 0.2s" }}
              >
                {nd.hi && !isDragging && <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />}
              </circle>
            )}

            {/* Border circle */}
            <circle cx={nd.x} cy={nd.y} r={nd.r}
              fill="hsl(255 17% 14%)"
              stroke={isDragging ? "hsl(213 47% 57%)" : nd.hi || isInSelected ? "hsl(43 56% 54%)" : isHov ? "hsl(213 47% 57%)" : "hsl(255 12% 24%)"}
              strokeWidth={isDragging ? 3 : nd.hi || isInSelected ? 2.5 : 1.5}
              filter="url(#avatarShadow)"
              style={{ transition: dragId ? "none" : "stroke 0.2s, stroke-width 0.2s" }}
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
              fill={isHov || isInSelected || isDragging ? "hsl(253 30% 92%)" : "hsl(252 10% 58%)"}
              fontSize={11} fontWeight={isInSelected ? 600 : 400}
              style={{ transition: dragId ? "none" : "fill 0.2s", pointerEvents: "none", fontFamily: "'Source Sans 3', sans-serif" }}>
              {nd.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
