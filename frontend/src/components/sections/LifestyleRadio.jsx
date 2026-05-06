'use client';

import React, { useState, useEffect, useRef } from 'react';

/* ─── Inline SVG icons ─────────────────────────────────────────── */

const IconPlay = ({ size = 16, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const IconPause = ({ size = 16, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

const IconPrev = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#4b5563" stroke="none">
    <polygon points="19,20 9,12 19,4" />
    <rect x="5" y="4" width="2" height="16" rx="1" fill="#4b5563" />
  </svg>
);

const IconNext = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#4b5563" stroke="none">
    <polygon points="5,4 15,12 5,20" />
    <rect x="17" y="4" width="2" height="16" rx="1" fill="#4b5563" />
  </svg>
);

const IconVolume = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const IconGradCap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d5a3d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5" />
  </svg>
);

/* ─── Animated progress bar ─────────────────────────────────────── */
function AnimatedProgress({ playing }) {
  const [progress, setProgress] = useState(42);
  const rafRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = (ts) => {
      if (lastRef.current !== null) {
        const delta = ts - lastRef.current;
        setProgress(p => {
          const next = p + delta * 0.006; // ~1% per ~167ms
          return next >= 100 ? 0 : next;
        });
      }
      lastRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [playing]);

  return (
    <div style={{ position: 'relative', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.25)', flex: 1 }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${progress}%`,
          borderRadius: '2px',
          background: '#D97706',
          transition: playing ? 'none' : 'width 0.3s ease',
        }}
      />
    </div>
  );
}

/* ─── Mini player card ───────────────────────────────────────────── */
function PlayerCard({ data }) {
  const [playing, setPlaying] = useState(false);

  const nowPlaying = data?.now_playing_label || 'NOW PLAYING · DANCESING ON AIR';
  const trackTitle = data?.track_title || 'Moods of the Morning — Classical Favourites';
  const stationName = data?.station_name || 'danceSing Wellness Radio · Daily programme';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        right: '24px',
        background: 'rgba(15,23,42,0.88)',
        backdropFilter: 'blur(12px)',
        borderRadius: '14px',
        padding: '18px 20px 16px',
        color: 'white',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      }}
    >
      {/* Top row */}
      <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', fontFamily: 'Roboto, sans-serif', marginBottom: '6px', textTransform: 'uppercase' }}>
        {nowPlaying}
      </p>
      <h4 style={{ fontSize: '16px', fontFamily: 'Sora, sans-serif', fontWeight: '700', color: 'white', lineHeight: '1.3', marginBottom: '4px' }}>
        {trackTitle}
      </h4>
      <p style={{ fontSize: '11px', fontFamily: 'Roboto, sans-serif', color: 'rgba(255,255,255,0.5)', marginBottom: '14px' }}>
        {stationName}
      </p>

      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Prev */}
        <button
          onClick={() => {}}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', opacity: 0.6 }}
          aria-label="Previous"
        >
          <IconPrev />
        </button>

        {/* Play/Pause */}
        <button
          onClick={() => setPlaying(p => !p)}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: '#D97706',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(217,119,6,0.45)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <IconPause size={14} /> : <IconPlay size={14} />}
        </button>

        {/* Next */}
        <button
          onClick={() => {}}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', opacity: 0.6 }}
          aria-label="Next"
        >
          <IconNext />
        </button>

        {/* Progress bar */}
        <AnimatedProgress playing={playing} />

        {/* Volume */}
        <button
          onClick={() => {}}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', opacity: 0.6, flexShrink: 0 }}
          aria-label="Volume"
        >
          <IconVolume />
        </button>
      </div>
    </div>
  );
}

/* ─── Image / placeholder pane ──────────────────────────────────── */
function ImagePane({ image, playerData }) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        aspectRatio: '16/11',
        background: 'linear-gradient(135deg, #c8ddd0 0%, #b0cdb9 100%)',
        boxShadow: '0 20px 60px rgba(45,90,61,0.15)',
      }}
    >
      {image?.src || true ? (
        <img
          src={image?.src || '/images/liferadio.jpg'}
          alt={image?.alt || 'Radio'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      ) : (
        /* Empty placeholder */
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(45,90,61,0.3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span style={{ fontSize: '11px', fontFamily: 'Sora, sans-serif', color: 'rgba(45,90,61,0.35)', letterSpacing: '0.04em' }}>
            Image · Upload via Admin
          </span>
        </div>
      )}

      {/* Player overlay */}
      <PlayerCard data={playerData} />
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────── */
const LifestyleRadio = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'SIX DISCIPLINES, ONE PLATFORM';
  const heading = data.heading || '24/7 Well-being Radio —\nmotivation, anytime';
  const body1 = data.body1 || 'Included with every Lifestyle plan — danceSing On Air is a 24/7 commercial-free radio station with uplifting music, mindfulness programming, and mood-boosting content curated specifically for older adults.';
  const body2 = data.body2 || 'No session to plan. No video to follow. Just switch it on and let it lift the room.';
  const badgeTitle = data.badge_title || 'University of Stirling & Partner Institutions';
  const badgeText = data.badge_text || 'Proven stress reduction and long-term health benefits · 5+ years';

  const ctas = data.ctas?.length > 0 ? data.ctas : [
    { label: 'Listen Live', href: '#radio', style: 'primary' },
    { label: 'Learn More', href: '#more', style: 'outline' },
  ];

  const headingLines = heading.split('\n');

  return (
    <section
      style={{
        background: '#ffffff',
        padding: '90px 24px 100px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* ── Left: text column ────────────────────────────────── */}
        <div>
          {/* Tag */}
          <p
            style={{
              fontSize: '14px',
              fontWeight: '400',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: 'black',
              fontFamily: 'Roboto, sans-serif',
              marginBottom: '18px',
            }}
          >
            {tag}
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              fontWeight: '400',
              color: '#3D634B',
              lineHeight: '1.2',
              letterSpacing: '-0.025em',
              marginBottom: '24px',
            }}
          >
            {headingLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          {/* Body 1 */}
          <p
            style={{
              fontSize: '15px',
              fontFamily: 'Roboto, sans-serif',
              color: '#374151',
              lineHeight: '1.75',
              marginBottom: '16px',
            }}
          >
            {body1}
          </p>

          {/* Body 2 */}
          <p
            style={{
              fontSize: '15px',
              fontFamily: 'Roboto, sans-serif',
              color: '#374151',
              lineHeight: '1.75',
              marginBottom: '28px',
            }}
          >
            {body2}
          </p>

          {/* University partner badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              background: '#f0f6f2',
              border: '1px solid #d1e8da',
              borderRadius: '10px',
              padding: '14px 18px',
              marginBottom: '36px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: '#e1f0e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconGradCap />
            </div>
            <div>
              <p
                style={{
                  fontSize: '14px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '700',
                  color: '#1a2e1e',
                  marginBottom: '3px',
                }}
              >
                {badgeTitle}
              </p>
              <p
                style={{
                  fontSize: '12.5px',
                  fontFamily: 'Roboto, sans-serif',
                  color: '#4b5563',
                  margin: 0,
                }}
              >
                {badgeText}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {ctas.map((cta, i) => {
              const isOrange = cta.style === 'primary' || i === 0;
              const base = {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                fontFamily: 'Roboto, sans-serif',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.01em',
                border: '2px solid transparent',
              };
              return isOrange ? (
                <a
                  key={i}
                  href={cta.href}
                  id={`radio-cta-${i}`}
                  style={{ ...base, background: '#D97706', color: 'white', borderColor: '#D97706' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#b45309'; e.currentTarget.style.borderColor = '#b45309'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#D97706'; e.currentTarget.style.borderColor = '#D97706'; }}
                >
                  <IconPlay size={13} color="white" />
                  {cta.label}
                </a>
              ) : (
                <a
                  key={i}
                  href={cta.href}
                  id={`radio-cta-${i}`}
                  style={{ ...base, background: 'transparent', color: '#2d5a3d', borderColor: '#2d5a3d' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#2d5a3d'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2d5a3d'; }}
                >
                  {cta.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* ── Right: image + player ─────────────────────────────── */}
        <ImagePane image={data.image} playerData={data} />
      </div>

      {/* Responsive: stack on mobile/tablet */}
      <style>{`
        @media (max-width: 900px) {
          #lifestyle-radio-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LifestyleRadio;
