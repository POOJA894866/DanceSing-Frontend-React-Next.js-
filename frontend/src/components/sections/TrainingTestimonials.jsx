'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/* ── Decorative cross/diamond pattern (matches screenshot) ── */
const CrossPattern = () => (
  <svg
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', opacity: 0.18 }}
    aria-hidden="true"
  >
    {/* Generate a grid of small cross/plus symbols */}
    {Array.from({ length: 10 }, (_, row) =>
      Array.from({ length: 14 }, (_, col) => {
        const x = col * 30 + 15;
        const y = row * 30 + 15;
        return (
          <g key={`${row}-${col}`}>
            <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="#1a6070" strokeWidth="1.5" strokeLinecap="round" />
            <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#1a6070" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );
      })
    )}
  </svg>
);

const TrainingTestimonials = ({ data }) => {
  const [hovered, setHovered] = useState(false);

  if (!data) return null;

  const tag      = data.tag      || "LET'S TALK";
  const heading  = data.heading  || 'Interested In Training Outside Of Care?';
  const body     = data.body     ||
    "We don't have a fixed programme for non-care settings yet — but we're actively exploring it. " +
    "Reach out and tell us about your organisation and what you're trying to achieve. " +
    "Our team will get back to you within 48 hours.";
  const ctaLabel = data.cta_label || 'Contact the team →';
  const ctaHref  = data.cta_href  || '#contact';

  const TEAL = '#1a6070';
  const TEAL_DARK = '#134d5b';

  return (
    <section
      style={{
        background: '#ffffff',
        fontFamily: "'Inter', 'Roboto', system-ui, sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '90px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="lets-talk-grid"
      >
        {/* ── LEFT: text + CTA ───────────────────────────── */}
        <div>
          {/* Tag */}
          <span
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#64748b',
              marginBottom: '20px',
            }}
          >
            {tag}
          </span>

          {/* Heading */}
          <h2
            style={{
              fontSize: 'clamp(28px, 3.2vw, 42px)',
              fontFamily: "'Sora', 'Inter', sans-serif",
              fontWeight: '700',
              color: '#0f1f2e',
              lineHeight: '1.2',
              letterSpacing: '-0.5px',
              marginBottom: '20px',
            }}
          >
            {heading}
          </h2>

          {/* Body */}
          <p
            style={{
              fontSize: '15px',
              color: '#475569',
              lineHeight: '1.75',
              marginBottom: '36px',
              maxWidth: '520px',
            }}
          >
            {body}
          </p>

          {/* CTA Button */}
          <Link
            href={ctaHref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 26px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: "'Inter', 'Roboto', sans-serif",
              textDecoration: 'none',
              background: hovered ? TEAL_DARK : TEAL,
              color: 'white',
              transition: 'background 0.2s, transform 0.15s',
              transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
              boxShadow: hovered
                ? '0 8px 20px rgba(26,96,112,0.35)'
                : '0 4px 12px rgba(26,96,112,0.2)',
            }}
          >
            {ctaLabel}
          </Link>
        </div>

        {/* ── RIGHT: decorative cross pattern ────────────── */}
        <div
          style={{
            position: 'relative',
            height: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CrossPattern />
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .lets-talk-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding: 60px 24px !important;
          }
          .lets-talk-grid > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TrainingTestimonials;
