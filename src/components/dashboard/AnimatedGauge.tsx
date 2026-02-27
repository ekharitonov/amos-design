import { useEffect, useRef } from "react";

interface AnimatedGaugeProps {
  score?: number;
  max?: number;
  size?: number;
}

export default function AnimatedGauge({ score = 8.2, max = 10, size = 280 }: AnimatedGaugeProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 2;
    cv.width = size * dpr;
    cv.height = size * 0.72 * dpr;
    ctx.scale(dpr, dpr);
    const cx = size / 2, cy = size * 0.62, R = size * 0.4;
    let progress = 0;
    const target = score / max;

    const gold = "#C9A84C";
    const goldBright = "#E2C86A";
    const red = "#D45555";
    const text = "#EAEAF2";

    const draw = () => {
      ctx.clearRect(0, 0, size, size * 0.72);
      const sA = Math.PI, eA = 2 * Math.PI;
      const curAngle = sA + progress * Math.PI;

      ctx.save();
      ctx.shadowColor = "rgba(201,168,76,0.15)";
      ctx.shadowBlur = 30;
      ctx.beginPath(); ctx.arc(cx, cy, R + 8, sA, eA);
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(201,168,76,0.08)"; ctx.stroke();
      ctx.restore();

      ctx.beginPath(); ctx.arc(cx, cy, R, sA, eA);
      ctx.lineWidth = 20; ctx.strokeStyle = "#1E1D2A"; ctx.lineCap = "round"; ctx.stroke();

      const grad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      grad.addColorStop(0, goldBright);
      grad.addColorStop(0.4, "#E8A040");
      grad.addColorStop(0.7, "#D46040");
      grad.addColorStop(1, red);
      ctx.save();
      ctx.shadowColor = "rgba(212,85,85,0.4)"; ctx.shadowBlur = 20;
      ctx.beginPath(); ctx.arc(cx, cy, R, sA, curAngle);
      ctx.lineWidth = 20; ctx.strokeStyle = grad; ctx.lineCap = "round"; ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.shadowColor = "rgba(212,85,85,0.3)"; ctx.shadowBlur = 15;
      ctx.beginPath(); ctx.arc(cx, cy, R - 14, sA, curAngle);
      ctx.lineWidth = 2; ctx.strokeStyle = "rgba(212,85,85,0.2)"; ctx.stroke();
      ctx.restore();

      for (let i = 0; i <= 10; i++) {
        const a = sA + (i / 10) * Math.PI;
        const inner = R - 28, outer = R - 22;
        ctx.beginPath();
        ctx.moveTo(cx + inner * Math.cos(a), cy + inner * Math.sin(a));
        ctx.lineTo(cx + outer * Math.cos(a), cy + outer * Math.sin(a));
        ctx.lineWidth = i % 5 === 0 ? 2 : 1;
        ctx.strokeStyle = i / 10 <= progress ? "rgba(212,85,85,0.5)" : "rgba(100,98,120,0.3)";
        ctx.stroke();
      }

      const needleR = R - 18;
      const nx = cx + needleR * Math.cos(curAngle);
      const ny = cy + needleR * Math.sin(curAngle);

      ctx.save();
      ctx.shadowColor = "rgba(212,85,85,0.8)"; ctx.shadowBlur = 15;
      const nGrad = ctx.createLinearGradient(cx, cy, nx, ny);
      nGrad.addColorStop(0, "rgba(212,85,85,0.3)");
      nGrad.addColorStop(1, red);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny);
      ctx.lineWidth = 3; ctx.strokeStyle = nGrad; ctx.stroke();
      ctx.beginPath(); ctx.arc(nx, ny, 4, 0, Math.PI * 2);
      ctx.fillStyle = red; ctx.fill();
      ctx.restore();

      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#2A2939"; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = text; ctx.fill();

      if (progress < target) {
        progress += (target - progress) * 0.04;
        if (target - progress < 0.001) progress = target;
        animRef.current = requestAnimationFrame(draw);
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [score, max, size]);

  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      <canvas ref={ref} style={{ width: size, height: size * 0.72 }} />
      <div className="text-center -mt-2.5">
        <div className="text-[13px] text-text-dim tracking-wider">Mask Score</div>
        <div className="font-display text-4xl font-bold text-foreground leading-none">
          {score} <span className="text-lg text-muted-foreground font-normal">/ {max}</span>
        </div>
        <div className="text-[13px] text-amos-red font-semibold mt-0.5">(Высокий)</div>
      </div>
    </div>
  );
}
