'use client';
import React from 'react';

const CARD_ICONS = {
  movement: (
    <img src="/images/chair.svg" alt="Movement" style={{ width: '90px', height: '90px', objectFit: 'contain' }} />
  ),
  radio: (
    <img src="/images/rrod.svg" alt="Radio" style={{ width: '30px', height: '90px', objectFit: 'contain' }} />
  ),
  training: (
    <img src="/images/nurse.svg" alt="Training" style={{ width: '90px', height: '90px', objectFit: 'contain' }} />
  ),
};

const WhatDrivesUs = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'WHAT DRIVES US';
  const heading = data.heading || 'Empowering Every Older Adult To Thrive';
  const body = data.body || "Our mission is to empower older adults, caregivers, and care communities by providing accessible, fun, and research-backed wellness solutions.\n\nWhether through our innovative movement programmes, 24/7 Well-being Radio, or expert-led caregiver training — everything we build is designed to enrich lives with joy, connection, and lasting wellbeing.";
  const ctas = data.ctas?.length > 0 ? data.ctas : [
    { label: 'Explore Care Resources →', href: '/care', style: 'accent' },
    { label: 'Learn More', href: '#more', style: 'outline-white' },
  ];
  const cards = data.cards?.length > 0 ? data.cards : [
    { icon: 'movement', accent: '#964B4B', title: 'Innovative Movement Programs', description: 'Chair-based and adaptive movement sessions designed for every ability level — professionally led, evidence-based, and genuinely fun to take part in.' },
    { icon: 'radio', accent: '#D48441', title: '24/7 Well-being Radio', description: 'A commercial-free, always-on radio station curated specifically for older adults — mood-lifting music, reminiscence content, and dementia-friendly programming around the clock.' },
    { icon: 'training', accent: '#1A5E7A', title: 'Expert-led Caregiving Training', description: 'CPD-accredited workshops that give care staff the skills, confidence, and tools to lead meaningful engagement sessions every day — with lasting results for residents and staff alike.' },
  ];

  const btnStyle = (style) => {
    const base = {
      padding: '13px 22px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '14px',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'opacity 0.2s ease',
      whiteSpace: 'nowrap',
    };
    if (style === 'accent') return { ...base, background: '#964B4B', color: 'white' };
    if (style === 'outline-white') return { ...base, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.7)', color: 'white' };
    return { ...base, background: 'white', color: '#283466' };
  };

  // Stagger offsets for the 3 cards (top, middle, bottom)
  const cardOffsets = ['0px', '60px', '0px'];

  return (
    <section style={{
      background: '#283466',
      padding: '90px 5%',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Decorative diamond dots */}
      {[
        { top: '12%', left: '36%' }, { top: '40%', left: '28%' },
        { top: '68%', left: '32%' }, { top: '20%', right: '8%' },
        { top: '55%', right: '4%' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos,
          width: '10px', height: '10px',
          background: 'rgba(255,255,255,0.12)',
          transform: 'rotate(45deg)',
          borderRadius: '2px',
        }} />
      ))}

      <div style={{
        maxWidth: '1290px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '44% 1fr',
        gap: '100px',
        alignItems: 'flex-start',
      }}>

        {/* ── Left: Text ── */}
        <div style={{ paddingTop: '40px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            display: 'block',
            marginBottom: '20px',
          }}>
            {tag}
          </span>

          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '800',
            color: 'white',
            lineHeight: '1.2',
            marginBottom: '28px',
          }}>
            {heading}
          </h2>

          <div style={{ marginBottom: '40px' }}>
            {body.split('\n').map((para, i) => (
              <p key={i} style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: '1.75',
                margin: i > 0 ? '14px 0 0' : '0',
              }}>
                {para}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {ctas.map((cta, i) => (
              <a key={i} href={cta.href} style={btnStyle(cta.style)}>
                {cta.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Staggered Cards ── */}
        <div style={{ position: 'relative', paddingBottom: '20px' }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px 40px',
              border: `6px solid ${card.accent || '#964B4B'}`,
              marginBottom: i < cards.length - 1 ? '40px' : 0,
              marginLeft: cardOffsets[i] || '0px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '30px',
            }}>
              {/* Text */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '16px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '700',
                  color: card.accent || '#964B4B',
                  marginBottom: '10px',
                  lineHeight: '1.3',
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#475569',
                  lineHeight: '1.7',
                  margin: 0,
                }}>
                  {card.description}
                </p>
              </div>
              {/* Icon */}
              <div style={{ color: card.accent || '#964B4B', flexShrink: 0, paddingBottom: '4px' }}>
                {CARD_ICONS[card.icon] || CARD_ICONS.movement}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatDrivesUs;
