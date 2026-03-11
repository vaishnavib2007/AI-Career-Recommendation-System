import { useMemo } from 'react';

interface RadarChartProps {
  labels: string[];
  values: number[];
  maxValue?: number;
  size?: number;
}

export default function RadarChart({ labels, values, maxValue = 100, size = 280 }: RadarChartProps) {
  const center = size / 2;
  const radius = size / 2 - 40;
  const n = labels.length;

  const points = useMemo(() => {
    return values.map((v, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = (v / maxValue) * radius;
      return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
    });
  }, [values, n, radius, center, maxValue]);

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-w-[300px]">
      {/* Grid */}
      {gridLevels.map(level => (
        <polygon
          key={level}
          points={Array.from({ length: n }, (_, i) => {
            const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
            const r = radius * level;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(' ')}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="0.5"
        />
      ))}
      {/* Axes */}
      {labels.map((_, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        return (
          <line key={i} x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="hsl(var(--border))" strokeWidth="0.5" />
        );
      })}
      {/* Data */}
      <polygon
        points={points.map(p => `${p.x},${p.y}`).join(' ')}
        fill="hsl(var(--primary) / 0.2)"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="hsl(var(--primary))" />
      ))}
      {/* Labels */}
      {labels.map((label, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const lx = center + (radius + 25) * Math.cos(angle);
        const ly = center + (radius + 25) * Math.sin(angle);
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground" style={{ fontSize: '8px', fontFamily: 'var(--font-body)' }}>
            {label.length > 8 ? label.slice(0, 7) + '…' : label}
          </text>
        );
      })}
    </svg>
  );
}
