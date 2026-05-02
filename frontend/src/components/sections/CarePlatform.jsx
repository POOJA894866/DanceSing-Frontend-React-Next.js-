'use client';

import React from 'react';

/**
 * CarePlatform — Platform section for the Care page.
 */
const CarePlatform = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'MORE THAN A PROGRAMME';
  const heading = data.heading || 'The Platform - The Heartbeat Of Your Community';
  const body = data.body || 'danceSing is more than a wellness tool. It is a central hub for community life — bringing people together, supporting staff, and creating an atmosphere your residents will genuinely look forward to every single day.';

  const cards = data.cards?.length > 0 ? data.cards : [
    {
      title: 'Connection',
      description: 'Builds real connection among residents and staff, actively reducing social isolation and loneliness across your community.',
      image: { src: '/images/pr1.jpg', alt: 'Connection' },
    },
    {
      title: 'Science-Backed',
      description: 'Safe, science-backed resources for all abilities — developed and independently validated with three leading UK universities.',
      image: { src: '/images/pr2.jpg', alt: 'Science-Backed' },
    },
    {
      title: 'User Experience',
      description: 'Easy to implement — step-by-step facilitation guides, staff training materials, and an intuitive platform anyone can use from day one.',
      image: { src: '/images/pr3.jpg', alt: 'User Experience' },
    },
    {
      title: 'Great Atmosphere',
      description: 'Creates a positive culture — a joyful daily atmosphere that residents talk about, families notice, and staff are proud to deliver.',
      image: { src: '/images/pr4.jpg', alt: 'Great Atmosphere' },
    },
  ];

  const ctas = data.ctas?.length > 0 ? data.ctas : [
    { label: 'Book a Demo', href: '#demo', style: 'primary' },
    { label: 'Choose Care Resources →', href: '#resources', style: 'outline' },
  ];

  return (
    <section style={{ background: '#F6F8F9', padding: '96px 48px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{
            fontSize: '12px',
            fontWeight: '550',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'black',
            display: 'block',
            marginBottom: '16px',
            fontFamily: 'Roboto, sans-serif',
          }}>
            {tag}
          </span>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: '100',
            color: '#993d3d',
            lineHeight: '1.5',
            marginBottom: '24px',
            maxWidth: '784px',
            margin: '0 auto 24px',
          }}>
            {heading}
          </h2>
          <p style={{
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            color: 'black',
            lineHeight: '1.6',
            maxWidth: '1000px',
            margin: '0 auto',
          }}>
            {body}
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: '64px',
        }}>
          {cards.map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Image Placeholder */}
              <div style={{
                width: '100%',
                height: '200px',
                borderRadius: '30px',
                background: '#e0d8d0',
                marginBottom: '20px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {card.image?.src ? (
                  <img
                    src={card.image.src}
                    alt={card.image.alt || card.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={`/images/pr${i + 1}.jpg`}
                    alt={card.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Card Content */}
              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '18px',
                fontWeight: '300',
                color: 'black',
                marginBottom: '12px',
                textAlign: 'center',
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '14px',
                fontFamily: 'Roboto, sans-serif',
                color: '#5B6270',
                lineHeight: '1.6',
                margin: 0,
              }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {ctas.map((cta, i) => {
            const isOutline = cta.style === 'outline' || cta.style === 'outline-dark';
            return (
              <a
                key={i}
                href={cta.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '15px',
                  textDecoration: 'none',
                  fontFamily: 'Roboto, sans-serif',
                  transition: 'all 0.25s ease',
                  background: isOutline ? 'transparent' : '#993d3d',
                  color: isOutline ? '#993d3d' : 'white',
                  border: isOutline ? '1.5px solid #993d3d' : '1.5px solid #993d3d',
                }}
                onMouseEnter={e => {
                  if (isOutline) {
                    e.currentTarget.style.background = 'rgba(153,61,61,0.06)';
                  } else {
                    e.currentTarget.style.background = '#802e2e';
                    e.currentTarget.style.borderColor = '#802e2e';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isOutline ? 'transparent' : '#993d3d';
                  e.currentTarget.style.borderColor = '#993d3d';
                }}
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

export default CarePlatform;
