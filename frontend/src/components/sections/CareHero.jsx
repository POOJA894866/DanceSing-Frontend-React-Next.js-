'use client';

import React from 'react';

/**
 * CareHero — Hero section for the Care page.
 * Layout: Left = text content + CTAs | Right = image with 3 floating feature cards
 * Matches the screenshot design exactly.
 */
const CareHero = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'Trusted by 200+ communities';
  const heading = data.heading || 'Wellness That Enriches\nEvery Care Community';
  const body =
    data.body ||
    "A trusted, comprehensive wellness platform that enriches lives, supports care teams, and strengthens your community's quality and compliance — making it an essential part of senior living.";

  const features = data.features?.length > 0
    ? data.features
    : [
      {
        icon: 'music',
        title: 'Music',
        description:
          'Engages memory, lifts mood, and fosters social connection — especially powerful for residents living with dementia.',
      },
      {
        icon: 'movement',
        title: 'Movement',
        description:
          'Improves physical mobility, balance, and confidence — reducing falls and increasing independence in daily activities.',
      },
      {
        icon: 'mindfulness',
        title: 'Mindfulness',
        description:
          'Lowers stress and anxiety, supports emotional health, and helps residents and staff find daily calm and connection.',
      },
    ];

  const ctas = data.ctas?.length > 0
    ? data.ctas
    : [
      { label: 'Book a Demo', href: '#demo', style: 'primary' },
      { label: 'Choose Care Resources →', href: '#resources', style: 'outline-dark' },
    ];

  const image = data.image;

  const headingLines = heading.split('\n');

  /* ── Icon SVGs ── */
  const IconMusic = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );

  const IconMovement = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <path d="M10 22v-5l-1-1V10c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v6l-1 1v5" />
      <path d="M7 13h2m6 0h2" />
    </svg>
  );

  const IconMindfulness = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M7 10c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <path d="M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
    </svg>
  );

  const getIcon = (icon) => {
    if (icon === 'music') return <IconMusic />;
    if (icon === 'movement') return <IconMovement />;
    return <IconMindfulness />;
  };

  const renderCta = (cta, i) => {
    const isFirst = i === 0;
    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      borderRadius: '3px',
      fontWeight: '600',
      fontSize: '14px',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      fontFamily: 'Roboto, sans-serif',
      border: '2px solid transparent',
    };

    if (cta.style === 'primary' || isFirst) {
      return (
        <a
          key={i}
          href={cta.href}
          style={{
            ...baseStyle,
            background: '#964B4B',
            color: 'white',
            border: '2px solid #964B4B',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#964B4B'; e.currentTarget.style.borderColor = '#964B4B'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#964B4B'; e.currentTarget.style.borderColor = '#964B4B'; }}
        >
          {cta.label}
        </a>
      );
    }

    return (
      <a
        key={i}
        href={cta.href}
        style={{
          ...baseStyle,
          background: 'transparent',
          color: '#964B4B',
          border: '2px solid #964B4B',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#964B4B'; e.currentTarget.style.borderColor = '#964B4B'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#964B4B'; }}
      >
        {cta.label}
      </a>
    );
  };

  return (
    <section
      style={{
        background: 'linear-gradient(171deg, rgba(2, 69, 121, 0.62) -55%, rgba(255, 255, 255, 1) 40%, rgba(228, 51, 51, 0.53) 350%)',
        minHeight: '100vh',
        paddingTop: '116px',
        paddingBottom: '85px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        marginTop: '56px',
      }}
    >
      <div
        style={{
          maxWidth: '1420px',
          margin: '0 auto',
          padding: '0 48px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* ── LEFT: Text Content ── */}
        <div style={{ paddingRight: '20px' }}>
          {/* Tag */}
          <p
            style={{
              fontSize: '13px',
              fontWeight: '500',
              fontFamily: 'Sora, sans-serif',
              color: 'black',
              marginBottom: '24px',
              letterSpacing: '0.01em',
            }}
          >
            {tag}
          </p>

          {/* Heading */}
          <h1
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(34px, 4vw, 52px)',
              fontWeight: '500',
              color: '#964B4B',
              lineHeight: '1.15',
              marginBottom: '28px',
              letterSpacing: '-0.02em',
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
              textAlign: 'left',
              color: 'black',
              lineHeight: '1.75',
              marginBottom: '40px',
              maxWidth: '480px',
            }}
          >
            {body}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {ctas.map((cta, i) => renderCta(cta, i))}
          </div>
        </div>

        {/* ── RIGHT: Image + Floating Cards ── */}
        <div style={{ position: 'relative', height: '560px' }}>
          {/* Image container */}
          <div
            style={{
              position: 'absolute',
              top: '5px',
              left: '65px',
              right: '40px',
              bottom: '-48px',
              borderRadius: '24px',
              overflow: 'hidden',
              background: '#d4c4b0',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            {image?.src ? (
              <img
                src={image.src}
                alt={image.alt || 'Care community wellness'}
                style={{ width: '500px', height: '500px', objectFit: 'cover', objectPosition: 'center' }}
              />
            ) : (
              <img
                src="/images/careheropic.jpg"
                alt="Care community wellness"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
            )}
          </div>

          {/* ── Floating Feature Cards ── */}

          {/* Card 1: Music — top-left overlapping image */}
          {features[0] && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                left: '-44px',
                zIndex: 10,
                background: 'white',
                borderRadius: '14px',
                padding: '12px 20px',
                width: '309px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '2px solid #964B4B',
              }}
            >
              <h4
                style={{
                  fontSize: '15px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '600',
                  color: '#964B4B',
                  marginBottom: '8px',
                }}
              >
                {features[0].title}
              </h4>
              <p
                style={{
                  fontSize: '12px',
                  fontFamily: 'Roboto, sans-serif',
                  color: 'black',
                  lineHeight: '1.55',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                {features[0].description}
              </p>
            </div>
          )}

          {/* Card 2: Movement — right side mid */}
          {features[1] && (
            <div
              style={{
                position: 'absolute',
                top: '54%',
                right: '-34px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'white',
                borderRadius: '14px',
                padding: '12px 20px',
                width: '309px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '2px solid #964B4B',
              }}
            >
              <h4
                style={{
                  fontSize: '15px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '100',
                  color: '#964B4B',
                  marginBottom: '8px',
                }}
              >
                {features[1].title}
              </h4>
              <p
                style={{
                  fontSize: '12px',
                  fontFamily: 'Roboto, sans-serif',
                  color: 'black',
                  lineHeight: '1.55',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                {features[1].description}
              </p>
            </div>
          )}

          {/* Card 3: Mindfulness — bottom-left */}
          {features[2] && (
            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                left: '-112px',
                zIndex: 10,
                background: 'white',
                borderRadius: '14px',
                padding: '12px 20px',
                width: '309px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '2px solid #964B4B',
              }}
            >
              <h4
                style={{
                  fontSize: '15px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '600',
                  color: '#964B4B',
                  marginBottom: '8px',
                }}
              >
                {features[2].title}
              </h4>
              <p
                style={{
                  fontSize: '12px',
                  fontFamily: 'Roboto, sans-serif',
                  color: 'black',
                  lineHeight: '1.55',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                {features[2].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareHero;
