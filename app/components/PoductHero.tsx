'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface ImageItem {
  label: string;
  src: string;
}

const IMAGES: ImageItem[] = [
  { label: 'Estate Planning', src: '/images/service_image_1.png' },
  { label: 'Special Needs Trust', src: '/images/service_image_2.png' },
  { label: 'Term Life Insurance', src: '/images/service_image_3.png' },
  { label: 'Index Universal Life', src: '/images/service_image_4.png' },
  { label: 'Fixed Index Annuities', src: '/images/service_image_5.png' },
  { label: 'Long-Term Care', src: '/images/service_image_6.png' },
  { label: 'Health Insurance', src: '/images/service_image_7.png' },
  { label: 'Medicare Advantage', src: '/images/service_image_8.png' },
  { label: 'Partnership Program', src: '/images/service_image_9.png' },
];

const RADIUS = 190;
const N = IMAGES.length;

export default function ProductHero() {
  // ── text section state ──────────────────────────────────────────
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // ── orbit state ─────────────────────────────────────────────────
  const [activeIdx, setActiveIdx] = useState(0);
  const [popping, setPopping]     = useState(false);
  const [speed, setSpeed]         = useState(4);
  const [paused, setPaused]       = useState(false);

  const angleRef     = useRef(0);
  const pausedRef    = useRef(false);
  const resumeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef       = useRef<number>(0);
  const activeIdxRef = useRef(0);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // ── IntersectionObserver for text animate-in ────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);

  // ── orbit helpers ───────────────────────────────────────────────
  const getTopIndex = useCallback(() => {
    let best = 0, bestScore = -Infinity;
    for (let i = 0; i < N; i++) {
      const a = angleRef.current + (2 * Math.PI * i) / N;
      const score = -Math.sin(a);
      if (score > bestScore) { bestScore = score; best = i; }
    }
    return best;
  }, []);

  const showCenter = useCallback((idx: number) => {
    if (activeIdxRef.current === idx) return;
    activeIdxRef.current = idx;
    setActiveIdx(idx);
    setPopping(false);
    requestAnimationFrame(() => setPopping(true));
    setTimeout(() => setPopping(false), 600);
  }, []);

  const handleItemClick = useCallback((i: number) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setPaused(true);
    showCenter(i);
    resumeTimer.current = setTimeout(() => setPaused(false), 3000);
  }, [showCenter]);

  // ── animation loop ──────────────────────────────────────────────
  useEffect(() => {
    const baseSpeed = 0.002 + (speed / 10) * 0.02;

    const tick = () => {
      if (!pausedRef.current) {
        angleRef.current += baseSpeed;
        if (angleRef.current > 2 * Math.PI) angleRef.current -= 2 * Math.PI;
        const top = getTopIndex();
        if (top !== activeIdxRef.current) showCenter(top);
      }

      for (let i = 0; i < N; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const a       = angleRef.current + (2 * Math.PI * i) / N;
        const x       = Math.cos(a) * RADIUS;
        const y       = Math.sin(a) * RADIUS;
        const depth   = (Math.sin(a) + 1) / 2;
        const scale   = (0.55 + depth * 0.55).toFixed(3);
        const opacity = (0.4  + depth * 0.6).toFixed(3);
        el.style.left      = `calc(50% + ${x}px - 44px)`;
        el.style.top       = `calc(50% + ${y}px - 44px)`;
        el.style.transform = `scale(${scale})`;
        el.style.opacity   = opacity;
        el.style.zIndex    = String(Math.round(depth * 10));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, getTopIndex, showCenter]);

  const active = IMAGES[activeIdx];

  // ── render ──────────────────────────────────────────────────────
  return (
    <section id="product-section" className="product-section" aria-label="The product We Bring">
      <div className="product-background">
        <div className="product-bubble product-bubble-1" />
        <div className="product-bubble product-bubble-2" />
        <div className="product-bubble product-bubble-3" />
      </div>

      <div className="product-row">

        {/* ── Left: text ── */}
        <div
          className={`product-text ${isVisible ? 'animate-in' : ''}`}
          ref={textRef}
        >
          <div className="product-header">
            <h2 className="product-title">
              Financial Security for Every Stage of Life
            </h2>

            {[
              { href: '/estate-planning',       text: 'Estate Planning',        desc: 'Protect your assets, family, and legacy with personalized Will & Trust solutions.' },
              { href: '/special-needs-trust',   text: 'Special Needs Trust',    desc: 'Secure long-term financial protection for loved ones with special needs.' },
              { href: '/term-life-insurance',   text: 'Term Life Insurance',    desc: 'Affordable coverage designed to protect your family\'s future.' },
              { href: '/index-universal-life',  text: 'Index Universal Life',   desc: 'Lifelong protection with cash product growth potential.' },
              { href: '/fixed-index-annuities', text: 'Fixed Index Annuities',  desc: 'Guaranteed growth and reliable retirement income solutions.' },
              { href: '/long-term-care',        text: 'Long-Term Care',         desc: 'Prepare for future healthcare needs while protecting your savings.' },
              { href: '/health-insurance-aca',  text: 'Health Insurance (ACA)', desc: 'Affordable and comprehensive healthcare coverage for individuals and families.' },
              { href: '/medicare-advantage',    text: 'Medicare Advantage',     desc: 'All-in-one Medicare coverage with additional healthcare benefits.' },
              { href: '/partnership-program',   text: 'Partnership Program',    desc: 'Build a rewarding career helping families achieve financial confidence.' },
            ].map(({ href, text, desc }) => (
              <p key={href} className="product-description-line">
                <a href={href} className="product-description-link">{text}</a>
                {' — '}{desc}
              </p>
            ))}
          </div>
        </div>

        {/* ── Right: orbit ── */}
        <div className="product-image">
          <div className="orbit-scene">

            {/* Decorative rings */}
            <div className="orbit-ring orbit-ring-lg" />
            <div className="orbit-ring orbit-ring-md" />
            <div className="orbit-ring orbit-ring-sm" />

            {/* Center featured image */}
            <div className="orbit-center">
              <div
                className="orbit-center-img-wrap"
                style={{
                  border: popping
                    ? '3px solid #c8f564'
                    : '2px solid rgba(255,255,255,0.15)',
                  boxShadow: popping
                    ? '0 0 60px rgba(200,245,100,0.3), 0 0 120px rgba(200,245,100,0.12)'
                    : '0 8px 40px rgba(0,0,0,0.6)',
                  transform: popping ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={activeIdx}
                  src={active.src}
                  alt={active.label}
                  className="orbit-center-img"
                />
              </div>
              <span className="orbit-center-label">{active.label}</span>
            </div>

            {/* Orbiting thumbnails */}
            {IMAGES.map((img, i) => (
              <div
                key={i}
                ref={el => { itemRefs.current[i] = el; }}
                onClick={() => handleItemClick(i)}
                className="orbit-item"
                style={{
                  border: i === activeIdx
                    ? '2.5px solid #c8f564'
                    : '2px solid rgba(255,255,255,0.18)',
                  boxShadow: i === activeIdx
                    ? '0 0 20px rgba(200,245,100,0.45)'
                    : '0 4px 20px rgba(0,0,0,0.5)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.label} className="orbit-item-img" />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="orbit-controls">
            <label className="orbit-controls-label">Speed</label>
            <input
              type="range" min={1} max={10} step={1} value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="orbit-speed-range"
            />
            <button
              onClick={() => setPaused(p => !p)}
              className="orbit-pause-btn"
              style={{
                border: paused ? '1px solid #c8f564' : '1px solid rgba(255,255,255,0.12)',
                color:  paused ? '#c8f564' : 'rgba(255,255,255,0.3)',
                background: paused ? 'rgba(200,245,100,0.08)' : 'rgba(255,255,255,0.03)',
              }}
            >
              {paused ? '▶ Resume' : '⏸ Pause'}
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}