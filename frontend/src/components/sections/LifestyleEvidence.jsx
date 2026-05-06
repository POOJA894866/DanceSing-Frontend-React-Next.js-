'use client';

import React from 'react';

// ─── SVG Icon Map ────────────────────────────────────────────────────────────

const ICON_MAP = {
  individual: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <path d="M12 10v6" />
      <path d="M9 13h6" />
      <path d="M10 19l-2 3" />
      <path d="M14 19l2 3" />
    </svg>
  ),
  workspace: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  community: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
      <path d="M2 20v-1a4 4 0 0 1 4-4h1" />
      <path d="M22 20v-1a4 4 0 0 0-4-4h-1" />
    </svg>
  ),
  organisation: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 8h.01" />
      <path d="M12 8h.01" />
      <path d="M17 8h.01" />
      <path d="M7 12h.01" />
      <path d="M12 12h.01" />
      <path d="M17 12h.01" />
    </svg>
  ),
};

const FALLBACK_ICON_KEY = 'individual';

// ─── Arrow bullet used in each list item ────────────────────────────────────
function ArrowBullet() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#334155"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginTop: '3px', flexShrink: 0 }}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// ─── Card component ──────────────────────────────────────────────────────────
function EvidenceCard({ card }) {
  const iconEl = ICON_MAP[card.icon] || ICON_MAP[FALLBACK_ICON_KEY];

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.14)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)';
      }}
    >
      {/* Icon + Tag row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          color: '#2D5A3D',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {iconEl}
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'Roboto, sans-serif',
            color: '#2D5A3D',
          }}
        >
          {card.tag}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '20px',
          fontWeight: '700',
          color: '#0f172a',
          lineHeight: '1.3',
          marginBottom: '20px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        {card.title}
      </h3>

      {/* Bullet list */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {(card.items || []).map((item, j) => {
          const isLast = j === (card.items.length - 1);
          return (
            <li
              key={j}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                paddingBottom: isLast ? 0 : '14px',
                marginBottom: isLast ? 0 : '14px',
                borderBottom: isLast ? 'none' : '1px solid #f1f5f9',
              }}
            >
              <ArrowBullet />
              <p
                style={{
                  fontSize: '13.5px',
                  fontFamily: 'Roboto, sans-serif',
                  color: '#334155',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

const DEFAULT_CARDS = [
  {
    icon: 'individual',
    tag: 'INDIVIDUAL',
    title: 'Personal Wellbeing At Home',
    items: [
      { text: 'Improving personal wellbeing, fitness, or mindfulness.' },
      { text: 'Self-led lifestyle goals and daily wellness routines.' },
      { text: 'Premium wellbeing content accessible from any device at home.' },
      { text: 'From £16.67/month on the annual plan.' },
    ],
  },
  {
    icon: 'workspace',
    tag: 'WORKSPACE TEAMS',
    title: 'Staff Wellness & Team Wellbeing',
    items: [
      { text: 'Workplace teams at a single office or site.' },
      { text: 'Reducing staff stress and supporting employee mental health.' },
      { text: 'Unlimited logins with single-site reporting and usage tracking.' },
      { text: 'Optional live group sessions and custom training (add-ons).' },
    ],
  },
  {
    icon: 'community',
    tag: 'COMMUNITY GROUPS',
    title: 'Groups Meeting At One Venue',
    items: [
      { text: 'Weekly fitness, wellbeing, or social clubs at a regular venue.' },
      { text: 'Clubs and small organisations based at one location.' },
      { text: 'Accessible facilitation for group leaders — no prior experience needed.' },
      { text: 'Engagement reporting to track group participation.' },
    ],
  },
  {
    icon: 'organisation',
    tag: 'ORGANISATIONS',
    title: 'Multi-Site & National Programmes',
    items: [
      { text: 'Organisations with multiple offices or service locations.' },
      { text: 'National or regional lifestyle and wellbeing programmes.' },
      { text: 'Unlimited logins across all sites with multi-site reporting.' },
      { text: 'Dedicated account support, quarterly reviews, custom onboarding.' },
    ],
  },
];

const LifestyleEvidence = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'EVIDENCE';
  const heading = data.heading || 'Why Care Resource Works';
  const body = data.body ||
    'Our platform is based on research and real-life experience. Through ongoing evaluation, our programmes have consistently demonstrated positive outcomes for resident wellbeing, engagement, and quality of life.';
  const cards = data.cards?.length > 0 ? data.cards : DEFAULT_CARDS;

  return (
    <section
      style={{
        background: '#2D5A3D',
        padding: '80px 24px 90px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        {/* ── Header ─────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p
            style={{
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'white',
              fontFamily: 'Roboto, sans-serif',
              marginBottom: '14px',
            }}
          >
            {tag}
          </p>
          <h2
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: '400',
              color: '#ffffff',
              lineHeight: '1.2',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}
          >
            {heading}
          </h2>
          <p
            style={{
              fontSize: '15.5px',
              fontFamily: 'Roboto, sans-serif',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: '1.7',
              maxWidth: '1000px',
              margin: '0 auto',
            }}
          >
            {body}
          </p>
        </div>

        {/* ── Cards Grid ─────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            alignItems: 'stretch',
          }}
        >
          {cards.map((card, i) => (
            <EvidenceCard key={i} card={card} />
          ))}
        </div>

      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .lifestyle-evidence-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .lifestyle-evidence-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LifestyleEvidence;
