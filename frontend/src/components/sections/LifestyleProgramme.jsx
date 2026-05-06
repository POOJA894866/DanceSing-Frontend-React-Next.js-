'use client';

import React from 'react';

/**
 * LifestyleProgramme — "Wellness For Every Stage Of Life" section.
 * Layout: centred header + 4 cards (image placeholder + title + body) + 2 CTAs
 */
const LifestyleProgramme = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'THE PROGRAMME';
  const heading = data.heading || 'Wellness For Every Stage Of Life';
  const subtitle = data.subtitle || "danceSing's Lifestyle Programme brings a full spectrum of wellness resources to support physical and mental well-being — helping older adults live healthier, happier, more independent lives, at their own pace.";

  const cards = data.cards?.length > 0 ? data.cards : [
    {
      title: 'Accessibility',
      body: 'Accessible anytime, anywhere on any device, at home, in the community, or on the go. No gym membership, no commute, no barriers.',
      image: { src: '/images/life21.jpg' },
    },
    {
      title: 'Research-backed',
      body: 'University of Stirling studies demonstrate real benefits for stress reduction, mobility, and long-term health outcomes.',
      image: { src: '/images/life22.jpg' },
    },
    {
      title: 'Designed for Elderly',
      body: 'Every class is created with the needs, pace, and preferences of the over-50s in mind. Gentle, joyful, and genuinely effective.',
      image: { src: '/images/life23.jpg' },
    },
    {
      title: '24/7 Wellbeing Radio',
      body: 'Continuous background support for motivation, mood, and emotional connection — available even when you\'re not in a session.',
      image: { src: '/images/life34.jpg' },
    },
  ];

  const ctas = data.ctas?.length > 0 ? data.ctas : [
    { label: 'Join Now →', href: '#join', style: 'primary' },
    { label: 'Our Story', href: '/about', style: 'outline' },
  ];

  const headingLines = heading.split('\n');

  return (
    <section
      style={{
        background: '#f8faf9',
        padding: '100px 0 90px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1357px',
          margin: '0 auto',
          padding: '0 48px',
        }}
        
      >
        {/* ── Centred Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p
            style={{
              fontSize: '14px',
              fontWeight: '400',
              letterSpacing: '0.12em',
              color: 'black',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontFamily: 'Sora, sans-serif',
            }}
          >
            {tag}
          </p>

          <h2
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(30px, 4vw, 48px)',
              fontWeight: '200',
              color: '#2d5a3d',
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

          <p
            style={{
              fontSize: '15.5px',
              fontFamily: 'Roboto, sans-serif',
              color: 'black',
              lineHeight: '1.75',
              maxWidth: '1000px',
              margin: '0 auto',
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* ── 4-Column Card Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '28px',
            marginBottom: '56px',
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '24px',
              }}
            >
              {/* Image slot */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  background: 'linear-gradient(135deg, #d6e8dc 0%, #c2d9ca 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                {card.image?.src ? (
                  <img
                    src={card.image.src}
                    alt={card.image.alt || card.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                ) : (
                  /* Empty placeholder — upload image via Wagtail admin */
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(45,90,61,0.35)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: 'Sora, sans-serif',
                        color: 'rgba(45,90,61,0.4)',
                        letterSpacing: '0.03em',
                      }}
                    >
                      Image · Upload via Admin
                    </span>
                  </div>
                )}
              </div>

              {/* Text body */}
              <div style={{ padding: '0 4px' }}>
                <h3
                  style={{
                    fontSize: '18px',
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: '700',
                    color: '#000000',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    fontFamily: 'Roboto, sans-serif',
                    color: '#6b7280',
                    lineHeight: '1.6',
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA Buttons ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          {ctas.map((cta, i) => {
            const isPrimary = cta.style === 'primary' || i === 0;
            const base = {
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 30px',
              borderRadius: '4px',
              fontWeight: '600',
              fontSize: '14px',
              fontFamily: 'Roboto, sans-serif',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.22s ease',
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
          })}
        </div>
      </div>
    </section>
  );
};

export default LifestyleProgramme;
