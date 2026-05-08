'use client';

import React, { useState } from 'react';

/* ─── SVG Icons ─────────────────────────────────────────────── */
const icons = {
  building: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01" />
    </svg>
  ),
  hospital: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  network: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
      <path d="M12 7v4M12 11l-5.5 6M12 11l5.5 6" />
    </svg>
  ),
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L12 3l9 9" /><path d="M9 21V12h6v9" /><path d="M3 12v9h18V12" />
    </svg>
  ),
  briefcase: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12" strokeWidth="2" />
    </svg>
  ),
  community: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  education: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="12" y1="7" x2="12" y2="13" /><line x1="9" y1="10" x2="15" y2="10" />
    </svg>
  ),
  fitness: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
    </svg>
  ),
  mindfulness: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  question: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

/* ─── Defaults ──────────────────────────────────────────────── */
const DEFAULT_CURRENTLY_TRAIN = [
  { icon: 'building', label: 'Care homes & residential settings' },
  { icon: 'hospital', label: 'NHS trusts & hospital wards' },
  { icon: 'network',  label: 'Multi-site care organisations' },
  { icon: 'home',     label: 'Care homes & residential settings' },
];

const DEFAULT_BENEFIT_CARDS = [
  {
    icon: 'briefcase',
    title: 'Corporate & workplace wellbeing',
    description:
      'Organisations looking to train internal facilitators to lead wellness sessions for employees — movement, mindfulness, and creative connection in the workplace.',
  },
  {
    icon: 'community',
    title: 'Community & voluntary sector',
    description:
      'Charities, community centres, and voluntary organisations who want to equip their teams to run evidence-based wellbeing programmes for the people they serve.',
  },
  {
    icon: 'education',
    title: 'Education & training providers',
    description:
      'Colleges, universities, or CPD providers who want to incorporate danceSing facilitation training into their own health, social care, or wellbeing programmes.',
  },
  {
    icon: 'fitness',
    title: 'Fitness & Wellness Instructors',
    description:
      'Independent fitness professionals or wellness coaches who want to extend their practice to include specialist facilitation skills for older or mixed-age populations.',
  },
  {
    icon: 'mindfulness',
    title: 'Mindfulness & Arts Therapist',
    description:
      'Practitioners in music therapy, mindfulness, or movement-based disciplines looking to formalise their approach with our evidence-based facilitation framework.',
  },
  {
    icon: 'question',
    title: 'Something else entirely',
    description:
      "If you see a fit between what we do and the work your organisation does, we're genuinely open to the conversation. The best partnerships often start with an unexpected question.",
  },
];

/* ─── Component ─────────────────────────────────────────────── */
const TrainingBeyondCare = ({ data }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!data) return null;

  /* top section */
  const sectionTag   = data.section_tag   || 'TRAINING BEYOND CARE';
  const heading      = data.heading       || 'Currently built for care —\nbut not limited to it';
  const body         = data.body          || 'Right now, danceSing Training is focused on care homes, hospital trusts, and adult social care teams — where the need is clearest and the impact is most immediate.\n\nBut the programme — building confident facilitation of Music, Movement, and Mindfulness — is transferable. If you work in a setting that isn\'t a care home but could benefit from what we do, we want to hear from you. We\'re open to exploring training partnerships beyond the care sector, and happy to discuss what that could look like.';
  const imageUrl     = data.image?.url    || '/images/training-session.jpg';
  const imageAlt     = data.image?.alt    || 'Training session in progress';

  const currentlyTrainHeading = data.currently_train_heading || 'Who We Currently Train';
  const currentlyTrainItems   =
    data.currently_train_items?.length > 0
      ? data.currently_train_items
      : DEFAULT_CURRENTLY_TRAIN;

  /* bottom section */
  const benefitHeading  = data.benefit_heading  || 'Who Else Could Benefit?';
  const benefitSubtitle = data.benefit_subtitle || "These are the settings we're open to discussing — if any of these sound like your organisation, reach out and let's explore what a training partnership could look like.";
  const benefitCards    =
    data.benefit_cards?.length > 0 ? data.benefit_cards : DEFAULT_BENEFIT_CARDS;

  /* shared palette */
  const TEAL = '#1a6070';
  const TEAL_DARK = '#124f5e';
  const TEAL_BG   = '#1a6070';

  return (
    <section
      style={{
        background: TEAL_BG,
        fontFamily: "'Inter', 'Roboto', system-ui, sans-serif",
      }}
    >
      {/* ── TOP SPLIT ──────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '90px 48px 80px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
        className="beyond-care-top-grid"
      >
        {/* Left */}
        <div>
          <span
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '20px',
            }}
          >
            {sectionTag}
          </span>

          <h2
            style={{
              fontSize: 'clamp(30px, 3.5vw, 46px)',
              fontFamily: "'Sora', 'Inter', sans-serif",
              fontWeight: '700',
              color: '#ffffff',
              lineHeight: '1.18',
              letterSpacing: '-0.5px',
              marginBottom: '28px',
              whiteSpace: 'pre-line',
            }}
          >
            {heading}
          </h2>

          {/* Render multiple paragraphs if body has newlines */}
          {body.split('\n\n').map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.82)',
                lineHeight: '1.75',
                marginBottom: '18px',
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Right — image + floating card panel */}
        <div style={{ position: 'relative' }}>
          {/* Photo */}
          <div
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
              height: '440px',
            }}
          >
            <img
              src={imageUrl}
              alt={imageAlt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Floating "Who We Currently Train" panel */}
          <div
            style={{
              position: 'absolute',
              right: '-24px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'white',
              borderRadius: '16px',
              padding: '24px 20px',
              width: '260px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
              zIndex: 2,
            }}
          >
            <p
              style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#0f3d4a',
                marginBottom: '16px',
                letterSpacing: '0.01em',
              }}
            >
              {currentlyTrainHeading}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentlyTrainItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#f8fbfc',
                    border: '1.5px solid #e2eef2',
                    borderRadius: '40px',
                    padding: '10px 16px',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#edf7fa';
                    e.currentTarget.style.borderColor = '#1a6070';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#f8fbfc';
                    e.currentTarget.style.borderColor = '#e2eef2';
                  }}
                >
                  <span style={{ color: '#1a6070', flexShrink: 0, display: 'flex' }}>
                    {icons[item.icon] || icons.building}
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#1a3d4a',
                      fontWeight: '500',
                      lineHeight: '1.35',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BENEFIT CARDS ──────────────────────────────── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 48px 100px',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.07)',
            borderRadius: '24px',
            padding: '56px 48px',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(26px, 2.8vw, 36px)',
              fontFamily: "'Sora', 'Inter', sans-serif",
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '14px',
              lineHeight: '1.2',
            }}
          >
            {benefitHeading}
          </h2>

          <p
            style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: '1.65',
              marginBottom: '44px',
              maxWidth: '720px',
            }}
          >
            {benefitSubtitle}
          </p>

          {/* 3×2 cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}
            className="beyond-care-cards-grid"
          >
            {benefitCards.map((card, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  cursor: 'default',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  transform: hoveredCard === idx ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow:
                    hoveredCard === idx
                      ? '0 20px 40px rgba(0,0,0,0.2)'
                      : '0 4px 16px rgba(0,0,0,0.1)',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: '#edf7fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: TEAL,
                    marginBottom: '20px',
                    transition: 'background 0.2s',
                    ...(hoveredCard === idx ? { background: '#d0eff5' } : {}),
                  }}
                >
                  {icons[card.icon] || icons.question}
                </div>

                <h3
                  style={{
                    fontSize: '17px',
                    fontFamily: "'Sora', 'Inter', sans-serif",
                    fontWeight: '700',
                    color: TEAL_DARK,
                    marginBottom: '12px',
                    lineHeight: '1.3',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: '#4a6b77',
                    lineHeight: '1.65',
                    margin: 0,
                  }}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .beyond-care-top-grid {
            grid-template-columns: 1fr !important;
          }
          .beyond-care-cards-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .beyond-care-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TrainingBeyondCare;
