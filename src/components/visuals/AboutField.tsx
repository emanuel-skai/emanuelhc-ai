'use client';

import { useEffect, useRef } from 'react';

// Layered spirograph / interference field — the brand's 12-ellipse logo
// extended into a static engraving. Ported from the approved Claude Design canvas.
export default function AboutField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.44 * 0.85;
      const rings = 9;

      ctx.lineWidth = 0.6;
      // concentric guide rings
      for (let i = 0; i < 4; i++) {
        const r = R * (0.42 + i * 0.19);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${0.05 - i * 0.008})`;
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      // rotated ellipse family (the 12-ellipse spirograph, extended)
      for (let i = 0; i < rings; i++) {
        const rot = (Math.PI * i) / rings;
        const mix = i / rings;
        ctx.beginPath();
        ctx.strokeStyle =
          mix < 0.34
            ? 'rgba(110,231,183,0.16)'
            : mix < 0.7
              ? 'rgba(16,185,129,0.20)'
              : 'rgba(255,255,255,0.10)';
        ctx.lineWidth = mix < 0.34 ? 0.7 : 0.55;
        ctx.ellipse(cx, cy, R, R * 0.34, rot, 0, Math.PI * 2);
        ctx.stroke();
      }
      // fine interference: inner counter-rotated family
      for (let i = 0; i < rings; i++) {
        const rot = (Math.PI * i) / rings + Math.PI / (rings * 2);
        ctx.beginPath();
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = 'rgba(16,185,129,0.09)';
        ctx.ellipse(cx, cy, R * 0.62, R * 0.2, rot, 0, Math.PI * 2);
        ctx.stroke();
      }
      // accent nodes
      [0, 3, 7].forEach((i) => {
        const a = (Math.PI * 2 * i) / 12 - Math.PI / 2;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(110,231,183,0.65)';
        ctx.arc(cx + Math.cos(a) * R, cy + Math.sin(a) * R * 0.34, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });
      // radial falloff so the field never sits behind text
      ctx.globalCompositeOperation = 'destination-out';
      const g = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.12);
      g.addColorStop(0, 'rgba(0,0,0,0.55)');
      g.addColorStop(0.45, 'rgba(0,0,0,0)');
      g.addColorStop(0.86, 'rgba(0,0,0,0.15)');
      g.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
    };

    draw();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(draw, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
