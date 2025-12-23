'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';

type CompareSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  label?: string;
};

// Centralized list of before/after image filenames for easy maintenance
// Images are expected to be placed under `/public/before_after/`
const BEFORE_AFTER_PAIRS: Array<{ before: string; after: string }> = [
  { before: 'ba-face3-slider-before.webp', after: 'ba-face3-slider-after.webp' },
  { before: 'ba-face4-slider-before.webp', after: 'ba-face4-slider-after.webp' },
  { before: 'ba-face5-slider-before.webp', after: 'ba-face5-slider-after.webp' },
  { before: 'slider-grace-before.jpg', after: 'slider-grace-after-180.jpg' },
  { before: 'slider-debbie-before.webp', after: 'slider-debbie-after-180.jpg' },
  { before: 'ba-b06-before.jpeg', after: 'ba-b06-after.jpeg' },
];

const CompareSlider: React.FC<CompareSliderProps> = ({ beforeSrc, afterSrc, label = 'Case' }) => {
  const id = useId();
  const [pos, setPos] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const percent = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(percent);
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const target = containerRef.current;
    if (!target) return;
    isDraggingRef.current = true;
    try { target.setPointerCapture?.(e.pointerId); } catch {}
    updateFromClientX(e.clientX);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isDraggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    isDraggingRef.current = false;
    const target = containerRef.current;
    try { target?.releasePointerCapture?.(e.pointerId); } catch {}
  };

  useEffect(() => {
    const handleLeave = () => { isDraggingRef.current = false; };
    window.addEventListener('mouseup', handleLeave);
    window.addEventListener('touchend', handleLeave);
    return () => {
      window.removeEventListener('mouseup', handleLeave);
      window.removeEventListener('touchend', handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="compare-root"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onTouchMove={(e) => {
        if (isDraggingRef.current) {
          e.preventDefault();
          updateFromClientX(e.touches[0].clientX);
        }
      }}
      role="region"
      aria-labelledby={id}
    >
      <Image src={afterSrc} alt={`${label} after`} fill className="img" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
      <Image
        src={beforeSrc}
        alt={`${label} before`}
        fill
        className="img"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <input
        aria-label={`Compare ${label}`}
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="range"
      />
      <div className="divider" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="divider-line" />
        <div className="divider-handle" role="slider" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
      <span className="badge badge-left">Before</span>
      <span className="badge badge-right">After</span>
      <style jsx>{`
        .compare-root { position: relative; width: 100%; aspect-ratio: 1 / 1; user-select: none; -webkit-user-select: none; overflow: hidden; cursor: col-resize; background: rgba(0,0,0,0.05); touch-action: none; }
        .img { object-fit: cover; }
        .range { position: absolute; inset: auto 0 12px 0; margin: 0 auto; width: 66%; appearance: none; background: transparent; cursor: ew-resize; }
        .range:focus { outline: none; }
        .divider { pointer-events: none; position: absolute; inset: 0 auto 0 0; }
        .divider-line { height: 100%; width: 2px; background: rgba(255,255,255,0.8); box-shadow: 0 0 10px rgba(255,255,255,0.7); }
        .divider-handle { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); display: inline-flex; align-items: center; justify-content: center; gap: 2px; width: 40px; height: 40px; border-radius: 999px; background: rgba(255,255,255,0.9); color: #111827; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.06); }
        .badge { position: absolute; top: 10px; padding: 0.25rem 0.5rem; font-weight: 600; font-size: 0.8rem; border-radius: 6px; background: rgba(255,255,255,0.9); color: #111827; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .badge-left { left: 10px; }
        .badge-right { right: 10px; }
      `}</style>
    </div>
  );
};

const BeforeAfter: React.FC = () => {
  return (
    <section className="before-after-section">
      <div className="container">
        <div className="section-header">
          <div className="title-container">
            <span className="section-subtitle">Real Patient Transformations</span>
            <h2 className="section-title">Before & After</h2>
            <div className="title-decoration">
              <div className="decoration-line"></div>
              <div className="decoration-dot"></div>
              <div className="decoration-line"></div>
            </div>
          </div>
          <p className="section-description">Visualize the subtle, natural-looking improvements our treatments can deliver.</p>
          <p className="section-credit">Images courtesy of ultherapy.com.au</p>
        </div>

        <div className="pairs">
          {BEFORE_AFTER_PAIRS.map((pair, index) => (
            <div className="pair-card" key={`${pair.before}-${pair.after}`}>
              <CompareSlider
                beforeSrc={`/before_after/${pair.before}`}
                afterSrc={`/before_after/${pair.after}`}
                label={`Case ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .before-after-section { background: #ffffff; padding: 5rem 0; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section-header { text-align: center; margin-bottom: 3rem; max-width: 800px; margin-left: auto; margin-right: auto; }
        .title-container { margin-bottom: 1.5rem; }
        .section-subtitle { display: inline-block; font-size: 0.875rem; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #9ca3af; background: linear-gradient(135deg, #9ca3af 0%, #d1d5db 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.75rem; }
        .section-title { font-size: 2.5rem; font-weight: 300; color: #1f2937; letter-spacing: -0.025em; line-height: 1.1; margin-bottom: 1rem; }
        .title-decoration { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1.25rem; }
        .decoration-line { width: 60px; height: 1px; background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%); }
        .decoration-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg, #9ca3af 0%, #d1d5db 100%); position: relative; }
        .decoration-dot::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; border: 1px solid rgba(156,163,175,0.2); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1);} 100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5);} }
        .section-description { font-size: 1.1rem; color: #4b5563; line-height: 1.8; max-width: 560px; margin: 0 auto; }
        .section-credit { font-size: 0.85rem; color: #9ca3af; margin-top: 0.5rem; }

        .pairs { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        @media (min-width: 1024px) { .pairs { grid-template-columns: 1fr 1fr 1fr; gap: 2rem; } }
        .pair-card { background: #fff; border: 1px solid rgba(226,232,240,0.8); border-radius: 10px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.06); padding: 0; width: 80%; margin: 0 auto; }
      `}</style>
    </section>
  );
};

export default BeforeAfter;


