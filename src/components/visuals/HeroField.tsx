'use client';

import { useEffect, useRef } from 'react';

// Mirrored interference field: dense woven wings, calm center.
// Threads only, no blobs. Ported from the approved Claude Design canvas.
export default function HeroField({ className }: { className?: string }) {
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

      // Portrait screens get a calmer field: wings pushed to the edges,
      // smaller radius, and a full-width central clearing for the text.
      const portrait = w < h || w < 768;
      const cy = h * 0.5;
      const R = portrait ? h * 0.42 : Math.max(h * 0.72, w * 0.26);
      const wingX = portrait ? -w * 0.22 : w * 0.17;

      const arc = (
        x: number, y: number, rx: number, ry: number,
        rot: number, p: number, stroke: string, lw: number
      ) => {
        ctx.beginPath();
        ctx.lineWidth = lw;
        ctx.strokeStyle = stroke;
        ctx.ellipse(x, y, rx, ry, rot, -Math.PI / 2, -Math.PI / 2 + TAU * p);
        ctx.stroke();
      };

      const wing = (x: number, p: number) => {
        const k = 1.15;
        const mint = (a: number) => `rgba(167,243,208,${Math.min(0.85, a * k * p).toFixed(3)})`;
        const emer = (a: number) => `rgba(52,211,153,${Math.min(0.85, a * k * p).toFixed(3)})`;
        const pale = (a: number) => `rgba(226,240,236,${Math.min(0.85, a * k * p).toFixed(3)})`;
        ctx.shadowColor = 'rgba(16,185,129,0.5)';
        ctx.shadowBlur = 6;
        // broad woven fan
        for (let i = 0; i < 44; i++) {
          const rot = (Math.PI * i) / 44;
          const ry = R * (0.13 + 0.62 * Math.pow(i / 44, 1.4));
          arc(x, cy, R * 1.15, ry, rot, p, i % 3 === 0 ? mint(0.2) : emer(0.22), 0.6);
        }
        for (let i = 0; i < 22; i++) {
          const rot = (Math.PI * i) / 22 + Math.PI / 3;
          arc(x, cy, R * 0.92, R * (0.5 + 0.5 * (i / 22)), rot, p, emer(0.14), 0.45);
        }
        // tighter counter family
        for (let i = 0; i < 28; i++) {
          const rot = (Math.PI * i) / 28 + Math.PI / 56;
          arc(x, cy, R * 0.66, R * 0.42, rot, p, pale(0.15), 0.5);
        }
        // rosette: circles walked around a radius — the interference core
        for (let i = 0; i < 30; i++) {
          const a = (TAU * i) / 30;
          const ox = x + Math.cos(a) * R * 0.46;
          const oy = cy + Math.sin(a) * R * 0.3;
          arc(ox, oy, R * 0.3, R * 0.3, 0, p, i % 5 === 0 ? mint(0.16) : emer(0.13), 0.45);
        }
        // concentric rings
        for (let i = 0; i < 7; i++) {
          arc(x, cy, R * (0.3 + i * 0.14), R * (0.3 + i * 0.14), 0, p, pale(0.12 - i * 0.01), 0.45);
        }
        // radial fan threads
        for (let i = 0; i < 36; i++) {
          const a = (Math.PI * i) / 36 - Math.PI / 2;
          ctx.beginPath();
          ctx.lineWidth = 0.4;
          ctx.strokeStyle = emer(0.12);
          ctx.moveTo(x + Math.cos(a) * R * 0.28, cy + Math.sin(a) * R * 0.28);
          ctx.lineTo(x + Math.cos(a) * R * 1.1 * p, cy + Math.sin(a) * R * 0.5 * p);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      };

      const paint = (p: number) => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        // deep sea-green atmosphere held at the frame
        const atmo = ctx.createLinearGradient(0, 0, w, 0);
        atmo.addColorStop(0, 'rgba(6,78,59,0.55)');
        atmo.addColorStop(0.26, 'rgba(6,78,59,0.26)');
        atmo.addColorStop(0.5, 'rgba(6,78,59,0.03)');
        atmo.addColorStop(0.74, 'rgba(6,78,59,0.26)');
        atmo.addColorStop(1, 'rgba(6,78,59,0.55)');
        ctx.fillStyle = atmo;
        ctx.fillRect(0, 0, w, h);

        wing(wingX, p);
        ctx.save();
        ctx.translate(w, 0);
        ctx.scale(-1, 1);
        wing(wingX, p);
        ctx.restore();

        if (portrait) {
          // dim the whole field, then carve one full-width central clearing
          ctx.fillStyle = 'rgba(0,0,0,0.38)';
          ctx.fillRect(0, 0, w, h);
          ctx.globalCompositeOperation = 'destination-out';
          ctx.save();
          ctx.translate(w * 0.5, cy);
          ctx.scale(1, 1.2);
          const clearM = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.62);
          clearM.addColorStop(0, 'rgba(0,0,0,0.96)');
          clearM.addColorStop(0.6, 'rgba(0,0,0,0.75)');
          clearM.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = clearM;
          ctx.beginPath();
          ctx.arc(0, 0, w * 0.62, 0, TAU);
          ctx.fill();
          ctx.restore();
        } else {
          // clear the message zone (right column) and the artwork's own core
          ctx.globalCompositeOperation = 'destination-out';
          ctx.save();
          ctx.translate(w * 0.72, cy);
          ctx.scale(1, 0.78);
          const clear = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.34);
          clear.addColorStop(0, 'rgba(0,0,0,0.99)');
          clear.addColorStop(0.6, 'rgba(0,0,0,0.82)');
          clear.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = clear;
          ctx.beginPath();
          ctx.arc(0, 0, w * 0.34, 0, TAU);
          ctx.fill();
          ctx.restore();
          ctx.save();
          ctx.translate(w * 0.26, cy);
          const clear2 = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.18);
          clear2.addColorStop(0, 'rgba(0,0,0,0.9)');
          clear2.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = clear2;
          ctx.beginPath();
          ctx.arc(0, 0, w * 0.18, 0, TAU);
          ctx.fill();
          ctx.restore();
        }

        const vfade = ctx.createLinearGradient(0, 0, 0, h);
        vfade.addColorStop(0, 'rgba(0,0,0,0.9)');
        vfade.addColorStop(0.1, 'rgba(0,0,0,0.15)');
        vfade.addColorStop(0.88, 'rgba(0,0,0,0.2)');
        vfade.addColorStop(1, 'rgba(0,0,0,0.9)');
        ctx.fillStyle = vfade;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
      };

      if (!animate) {
        paint(1);
        return;
      }
      const start = performance.now();
      const dur = 2600;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        paint(Math.max(0.02, 1 - Math.pow(1 - t, 3)));
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
