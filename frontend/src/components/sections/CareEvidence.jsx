'use client';

import React from 'react';

const ICON_MAP = {
  patient: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v6l-2 4" />
      <path d="M12 12l2 4v6" />
      <path d="M8 8h6l2 4" />
      <path d="M14 12v10" />
      <path d="M14 6h3v16" />
    </svg>
  ),
  staff: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M12 7v4" />
      <path d="M10 9h4" />
    </svg>
  ),
  leadership: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  ),
  community: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

/**
 * CareEvidence — "Why Care Resource Works" section.
 */
const CareEvidence = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'EVIDENCE';
  const heading = data.heading || 'Why Care Resource Works';
  const body = data.body || 'Our platform is based on research and real-life experience. Through ongoing evaluation, our programmes have consistently demonstrated positive outcomes for resident wellbeing, engagement, and quality of life.';

  const cards = data.cards?.length > 0 ? data.cards : [];

  return (
    <section style={{ background: '#964B4B', padding: '70px 24px' }}>
      <div style={{ maxWidth: '1500px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)',
            display: 'block',
            marginBottom: '16px',
            fontFamily: 'Roboto, sans-serif',
          }}>
            {tag}
          </span>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: '700',
            color: 'white',
            lineHeight: '1.2',
            marginBottom: '24px',
          }}>
            {heading}
          </h2>
          <p style={{
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: '1.65',
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
          alignItems: 'stretch',
          marginBottom: '-150px',
          maxWidth: "1437px",
        }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '36px',
              padding: '33px 22px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 30px 40px rgba(0,0,0,0.1)',
              marginBottom: '150px',
            }}>
              {/* Card Tag & Icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: '#964B4B' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {ICON_MAP[card.icon] || ICON_MAP.patient}
                </div>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'Roboto, sans-serif',
                }}>
                  {card.tag}
                </span>
              </div>

              {/* Card Title */}
              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '20px',
                fontWeight: '400',
                color: '#1a1f3c',
                marginBottom: '20px',
                paddingBottom: '20px',
                borderBottom: '1px solid #e2e8f0',
                lineHeight: '1.3',
              }}>
                {card.title}
              </h3>

              {/* List Items */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}>
                {card.items?.map((item, j) => {
                  const isLast = j === card.items.length - 1;
                  return (
                    <li key={j} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      paddingBottom: isLast ? '0' : '20px',
                      marginBottom: isLast ? '0' : '20px',
                      borderBottom: isLast ? 'none' : '1px solid #e2e8f0',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '4px', flexShrink: 0 }}>
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <p style={{
                        fontSize: '14px',
                        fontFamily: 'Roboto, sans-serif',
                        color: 'black',
                        lineHeight: '1.6',
                        margin: 0,
                      }}>
                        {item.title && (
                          <strong style={{ color: 'black', fontWeight: '600' }}>
                            {item.title} —{' '}
                          </strong>
                        )}
                        {item.text}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CareEvidence;
