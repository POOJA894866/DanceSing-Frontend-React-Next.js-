'use client';

import React from 'react';
import Link from 'next/link';

const TrainingPlatform = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'THE PLATFORM';
  const heading = data.heading || 'More Than Training — A Comprehensive Care Hub';
  const body = data.body || 'danceSing Training is more than a one-off workshop. It is a continuous support system that connects teams, reduces burnout, and creates the conditions for exceptional daily care delivery.';
  
  const cards = data.cards?.length > 0 ? data.cards : [
    { title: 'Atmosphere', description: 'Connects teams and residents, fostering a consistently positive and engaging atmosphere across your care community.' },
    { title: 'Data Reporting', description: 'Detailed usage data and reporting on select plans, track staff participation and resident engagement to measure progress and outcomes.' },
    { title: 'Science -backed Tools', description: 'Easy-to-use, science-backed tools for all levels of care settings — practical resources designed with, and validated by, leading UK universities.' },
    { title: 'Reduced Admin Work', description: 'Reduces administrative burden — expert support and clear facilitation guides mean less time planning and more time caring.' }
  ];

  const ctas = data.ctas?.length > 0 ? data.ctas : [
    { label: 'Book a Consultation →', href: '#consultation', style: 'primary' },
    { label: 'Explore Care Resources', href: '/care', style: 'outline' }
  ];

  const fallbackImages = ['/images/pr1.jpg', '/images/pr2.jpg', '/images/pr3.jpg', '/images/pr4.jpg'];

  const headingLines = heading.split('—');

  return (
    <section style={{
      background: '#f4f6f8',
      padding: '100px 0',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px',
        textAlign: 'center'
      }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px' }}>
          <span style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '700',
            fontFamily: 'Roboto, sans-serif',
            color: '#64748b',
            letterSpacing: '0.1em',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            {tag}
          </span>

          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '700',
            color: '#1a5e7b', // Teal color
            lineHeight: '1.2',
            marginBottom: '24px',
            letterSpacing: '-1px'
          }}>
            {headingLines[0]} {headingLines[1] && <span style={{ whiteSpace: 'nowrap' }}>—</span>}
            {headingLines[1] && <><br />{headingLines[1].trim()}</>}
          </h2>

          <p style={{
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            color: '#1e293b',
            lineHeight: '1.6',
            margin: '0 auto'
          }}>
            {body}
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {cards.map((card, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '100%',
                height: '220px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '24px',
                background: '#e2e8f0',
                boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
              }}>
                <img
                  src={card.image?.src || fallbackImages[i % fallbackImages.length]}
                  alt={card.image?.alt || card.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 style={{
                fontSize: '20px',
                fontFamily: 'Sora, sans-serif',
                fontWeight: '700',
                color: '#02020a',
                marginBottom: '12px'
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '14px',
                fontFamily: 'Roboto, sans-serif',
                color: '#64748b',
                lineHeight: '1.6',
                margin: 0
              }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {ctas.map((cta, i) => {
            const isPrimary = cta.style === 'primary';
            return (
              <Link key={i} href={cta.href} style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                fontFamily: 'Roboto, sans-serif',
                textDecoration: 'none',
                background: isPrimary ? '#1a5e7b' : 'transparent',
                color: isPrimary ? 'white' : '#1a5e7b',
                border: `1.5px solid ${isPrimary ? '#1a5e7b' : '#1a5e7b'}`,
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                if (!isPrimary) {
                  e.currentTarget.style.background = 'rgba(26, 94, 123, 0.05)';
                } else {
                  e.currentTarget.style.background = '#13475c';
                  e.currentTarget.style.borderColor = '#13475c';
                }
              }}
              onMouseLeave={e => {
                if (!isPrimary) {
                  e.currentTarget.style.background = 'transparent';
                } else {
                  e.currentTarget.style.background = '#1a5e7b';
                  e.currentTarget.style.borderColor = '#1a5e7b';
                }
              }}>
                {cta.label}
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TrainingPlatform;
