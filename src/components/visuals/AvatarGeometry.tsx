'use client';

import { useEffect, useRef } from 'react';

// Geometry resolving into the brand avatar: mandala core, two mirrored woven
// wings, dissolving dot fields. Parametric threads and nodes only.
// Ported from the approved Claude Design canvas.
export default function AvatarGeometry({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const TAU = Math.PI * 2;

    const draw = (animate: boolean) => {
      cancelAnimationFrame(rafRef.current);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const cx = w * 0.5;
      const cy = h * 0.52;
      const S = h * 0.6;
      const R = Math.min(w * 0.36, h * 0.4);

      const mandala = (p: number) => {
        ctx.shadowColor = 'rgba(16,185,129,0.55)';
        ctx.shadowBlur = 7;
        for (let i = 0; i < 9; i++) {
          const r = R * (0.1 + i * 0.105);
          ctx.beginPath();
          ctx.lineWidth = i % 3 === 0 ? 0.8 : 0.5;
          ctx.strokeStyle = `rgba(52,211,153,${(0.46 - i * 0.026).toFixed(3)})`;
          ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + TAU * p);
          ctx.stroke();
        }
        // flower-of-life: circles walked around three radii
        ([[6, 0.3, 0.3], [12, 0.52, 0.26], [18, 0.78, 0.24]] as const).forEach(([n, dist, rad], ring) => {
          for (let i = 0; i < n; i++) {
            const a = (TAU * i) / n + ring * 0.24;
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(110,231,183,${(0.3 - ring * 0.055).toFixed(3)})`;
            ctx.arc(
              cx + Math.cos(a) * R * dist,
              cy + Math.sin(a) * R * dist,
              R * rad,
              -Math.PI / 2,
              -Math.PI / 2 + TAU * p
            );
            ctx.stroke();
          }
        });
        // rosette petals
        for (let i = 0; i < 24; i++) {
          const rot = (Math.PI * i) / 24;
          ctx.beginPath();
          ctx.lineWidth = 0.45;
          ctx.strokeStyle = 'rgba(16,185,129,0.24)';
          ctx.ellipse(cx, cy, R * 0.86, R * 0.3, rot, -Math.PI / 2, -Math.PI / 2 + TAU * p);
          ctx.stroke();
        }
        // vertical axis with nodes
        ctx.beginPath();
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = 'rgba(226,240,236,0.24)';
        ctx.moveTo(cx, cy - R * 1.15 * p);
        ctx.lineTo(cx, cy + R * 1.15 * p);
        ctx.stroke();
        if (p > 0.8) {
          [-1.05, -0.62, -0.2, 0.2, 0.62, 1.05].forEach((f) => {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(110,231,183,0.8)';
            ctx.arc(cx, cy + R * f, 2.1, 0, TAU);
            ctx.fill();
          });
          ctx.beginPath();
          ctx.fillStyle = 'rgba(167,243,208,0.95)';
          ctx.arc(cx, cy, 3, 0, TAU);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      };

      const wing = (flip: boolean, p: number) => {
        // abstract woven wing flanking the mandala — density, not figure
        const ox = cx + (flip ? 1 : -1) * w * 0.24;
        ctx.shadowColor = 'rgba(16,185,129,0.5)';
        ctx.shadowBlur = 6;
        for (let i = 0; i < 30; i++) {
          const rot = (Math.PI * i) / 30 + (flip ? -0.22 : 0.22);
          const ry = S * (0.08 + 0.34 * Math.pow(i / 30, 1.5));
          ctx.beginPath();
          ctx.lineWidth = 0.45;
          ctx.strokeStyle =
            i % 4 === 0
              ? `rgba(167,243,208,${(0.26 * p).toFixed(3)})`
              : `rgba(52,211,153,${(0.22 * p).toFixed(3)})`;
          ctx.ellipse(ox, cy, S * 0.62, ry, rot, -Math.PI / 2, -Math.PI / 2 + TAU * p);
          ctx.stroke();
        }
        for (let i = 0; i < 18; i++) {
          const a = (TAU * i) / 18;
          ctx.beginPath();
          ctx.lineWidth = 0.4;
          ctx.strokeStyle = `rgba(52,211,153,${(0.17 * p).toFixed(3)})`;
          ctx.arc(
            ox + Math.cos(a) * S * 0.24,
            cy + Math.sin(a) * S * 0.18,
            S * 0.2,
            -Math.PI / 2,
            -Math.PI / 2 + TAU * p
          );
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      };

      const dots = (p: number) => {
        // dissolving dot field at the lower corners
        ctx.fillStyle = 'rgba(52,211,153,0.5)';
        for (let i = 0; i < 26; i++) {
          for (let j = 0; j < 9; j++) {
            const fx = i / 25;
            const fy = j / 8;
            const x = fx * w * 0.34 - w * 0.02;
            const y = h * 0.7 + fy * h * 0.3 + Math.sin(fx * 6.2) * h * 0.035;
            const a = (1 - fx) * (0.5 - Math.abs(fy - 0.5) * 0.6) * 0.85 * p;
            if (a <= 0.02) continue;
            [x, w - x].forEach((px) => {
              ctx.globalAlpha = a;
              ctx.beginPath();
              ctx.arc(px, y, 1.1, 0, TAU);
              ctx.fill();
            });
          }
        }
        ctx.globalAlpha = 1;
      };

      const paint = (p: number) => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        mandala(p);
        wing(false, p);
        wing(true, p);
        dots(p);
        // edge falloff so nothing hits a hard border
        ctx.globalCompositeOperation = 'destination-out';
        const g = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.3, cx, cy, Math.max(w, h) * 0.62);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(0.72, 'rgba(0,0,0,0.35)');
        g.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
      };

      if (!animate) {
        paint(1);
        return;
      }
      const start = performance.now();
      const dur = 2800;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        paint(Math.max(0.03, 1 - Math.pow(1 - t, 3)));
        if (t < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    draw(!reduced);
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => draw(false), 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
