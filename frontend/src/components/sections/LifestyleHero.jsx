'use client';

import React from 'react';

/**
 * LifestyleHero — Hero section for the Lifestyle page.
 * Layout: Left = text content + CTAs | Right = image placeholder + 3 floating info cards
 * Mirrors the homepage hero pattern from the screenshot.
 */
const LifestyleHero = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'Wellness for Every Stage of Life';
  const heading = data.heading || 'Holistic Wellness,\nAccessible Anytime,\nAnywhere';
  const body = data.body || 'Experience the full spectrum of wellness — Pilates, Yoga, Dance Fitness, Meditation, Singing, and Nutrition. Designed to help older adults live healthier, happier, more independent lives.';

  const infoCards = data.info_cards?.length > 0
    ? data.info_cards
    : [
      {
        position: 'top',
        heading: 'Six Wellness Disciplines',
        text: 'Pilates, Yoga, Dance Fitness, Meditation, Singing, and Nutrition — a complete library of content covering every dimension of wellbeing.',
      },
      {
        position: 'right',
        heading: '24/7 Wellbeing Radio',
        text: 'Continuous motivation and emotional support — lift your mood and feel connected, any time of day or night, without needing to plan a session.',
      },
      {
        position: 'bottom',
        heading: 'University of Stirling backed',
        text: 'Research-validated outcomes — proven benefits for stress reduction, mental resilience, and long-term physical and emotional health.',
      },
    ];

  const ctas = data.ctas?.length > 0
    ? data.ctas
    : [
      { label: 'Join Now', href: '#join', style: 'primary' },
      { label: 'View Pricing →', href: '#pricing', style: 'outline' },
    ];

  const image = data.image;
  const headingLines = heading.split('\n');

  /* ── CTA renderer ── */
  const renderCta = (cta, i) => {
    const isPrimary = cta.style === 'primary' || i === 0;
    const base = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '13px 28px',
      borderRadius: '4px',
      fontWeight: '600',
      fontSize: '14px',
      fontFamily: 'Roboto, sans-serif',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      letterSpacing: '0.01em',
    };

    return isPrimary ? (
      <a
        key={i}
        href={cta.href}
        style={{ ...base, background: '#2d5a3d', color: 'white', border: '2px solid #2d5a3d' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#1e3f2a'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#2d5a3d'; }}
      >
        {cta.label}
      </a>
    ) : (
      <a
        key={i}
        href={cta.href}
        style={{ ...base, background: 'transparent', color: '#2d5a3d', border: '2px solid #2d5a3d' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#2d5a3d'; e.currentTarget.style.color = 'white'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2d5a3d'; }}
      >
        {cta.label}
      </a>
    );
  };

  /* ── Info card sub-component ── */
  const InfoCard = ({ card, style }) => (
    <div
      style={{
        position: 'absolute',
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(12px)',
        borderRadius: '14px',
        padding: '14px 20px',
        width: '310px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        border: '2px solid #3D634B',
        zIndex: 10,
        ...style,
      }}
    >
      <h4
        style={{
          fontSize: '14px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '700',
          color: '#3D634B',
          marginBottom: '6px',
          margin: '0 0 6px 0',
        }}
      >
        {card.heading}
      </h4>
      <p
        style={{
          fontSize: '12px',
          fontFamily: 'Roboto, sans-serif',
          color: '#555',
          lineHeight: '1.6',
          margin: 0,
          fontStyle: 'italic',
        }}
      >
        {card.text}
      </p>
    </div>
  );

  const topCard = infoCards[0];
  const rightCard = infoCards[1];
  const bottomCard = infoCards[2];

  return (
    <section
      style={{
        background: 'linear-gradient(171deg, rgba(2, 69, 121, 0.62) -55%, rgba(255, 255, 255, 1) 40%, rgba(14, 175, 129, 0.47) 350%)',
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: '80px',  
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        marginTop: '56px',
      }}
    >
      {/* Subtle decorative blobs */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(45,90,61,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(45,90,61,0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 48px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* ── LEFT: Text ── */}
        <div>
          {/* Tag */}
          <p
            style={{
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'Roboto, sans-serif',
              color: 'black',
              marginBottom: '20px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {tag}
          </p>

          {/* Heading */}
          <h1
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(32px, 3.8vw, 52px)',
              fontWeight: '500',
              color: '#3D634B',
              lineHeight: '1.2',
              marginBottom: '28px',
              letterSpacing: '-0.025em',
            }}
          >
            {headingLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          {/* Body */}
          <p
            style={{
              fontSize: '15px',
              fontFamily: 'Roboto, sans-serif',
              color: 'black',
              lineHeight: '1.8',
              marginBottom: '44px',
              maxWidth: '460px',
            }}
          >
            {body}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {ctas.map((cta, i) => renderCta(cta, i))}
          </div>
        </div>

        {/* ── RIGHT: Image placeholder + floating cards ── */}
        <div style={{ position: 'relative', height: '540px' }}>

          {/* Image container — empty placeholder */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '60px',
              right: '20px',
              bottom: '-20px',
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #d6e8dc 0%, #c4deca 50%, #b8d4bf 100%)',
              boxShadow: '0 24px 64px rgba(45,90,61,0.18)',
            }}
          >
              <img
                src={image?.src || '/images/life1.png'}
                alt={image?.alt || 'Lifestyle wellness'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
          </div>

          {/* Card 1 — TOP (above image, centred-right) */}
          {topCard && (
            <InfoCard
              card={topCard}
              style={{ top: '-18px', left: '20px', width: '310px' }}
            />
          )}

          {/* Card 2 — RIGHT (mid-right, overlapping edge) */}
          {rightCard && (
            <InfoCard
              card={rightCard}
              style={{ top: '50%', right: '-10px', transform: 'translateY(-50%)', width: '310px' }}
            />
          )}

          {/* Card 3 — BOTTOM-LEFT */}
          {bottomCard && (
            <InfoCard
              card={bottomCard}
              style={{ bottom: '10px', left: '-71px', width: '310px' }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default LifestyleHero;
