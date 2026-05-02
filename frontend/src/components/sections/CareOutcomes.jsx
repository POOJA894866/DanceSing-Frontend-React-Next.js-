'use client';

import React from 'react';

const ArrowUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const ArrowDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);

const CapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#964B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const CareOutcomes = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'UNIVERSITY VALIDATED OUTCOMES';
  const heading = data.heading || 'Proven, research-backed results in 12 weeks';
  const body = data.body || 'Backed by University of Stirling — a world-leading authority in ageing and dementia research — every danceSing programme is rigorously evaluated within care communities using recognised research methodologies.\n\nThe results speak for themselves. Implemented consistently, danceSing delivers measurable improvements to resident health, staff wellbeing, and community quality within three months.';
  const partner_box_heading = data.partner_box_heading || 'University of Stirling & Partner Institutions';
  const partner_box_text = data.partner_box_text || 'Independently validated · 5+ year academic partnership';

  const ctas = data.ctas?.length > 0 ? data.ctas : [
    { label: 'Start Free Trial', href: '#trial', style: 'primary' },
    { label: 'Book a Demo', href: '#demo', style: 'outline' },
  ];

  const stats_tag = data.stats_tag || 'PROVEN IMPACT DATA';
  const stats = data.stats?.length > 0 ? data.stats : [
    { label: 'Depression in participants', value: '49%', trend: 'down' },
    { label: 'Anxiety reported', value: '34%', trend: 'down' },
    { label: 'Loneliness experienced', value: '29%', trend: 'down' },
    { label: 'Fear of falling', value: '34%', trend: 'down' },
    { label: 'Stress', value: '25%', trend: 'down' },
    { label: 'Sleep satisfaction', value: '25%', trend: 'up' },
    { label: 'DHEA for immunity', value: '62%', trend: 'up' },
    { label: 'Staff stress levels', value: '21%', trend: 'down' },
  ];

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 5%' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

        {/* Left Side: Text and Content */}
        <div>
          <span style={{
            fontSize: '12px',
            fontWeight: '500',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'black',
            display: 'block',
            marginBottom: '20px',
            fontFamily: 'Roboto, sans-serif',
          }}>
            {tag}
          </span>

          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '400',
            color: '#964B4B',
            lineHeight: '1.15',
            marginBottom: '32px',
            maxWidth: '500px',
            letterSpacing: '-0.02em',
          }}>
            {heading}
          </h2>

          <div style={{
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            color: 'black',
            lineHeight: '1.7',
            marginBottom: '40px',
            whiteSpace: 'pre-line',
          }}>
            {body}
          </div>

          <div style={{
            background: '#f8f9fa',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '40px',
          }}>
            <div style={{ background: 'white', padding: '12px', borderRadius: '50%', display: 'flex' }}>
              <CapIcon />
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: '600', color: '#1a1f3c' }}>
                {partner_box_heading}
              </h4>
              <p style={{ margin: 0, fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#000000', fontWeight: '400' }}>
                {partner_box_text}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {ctas.map((cta, i) => {
              const isPrimary = cta.style === 'primary' || i === 0;
              return (
                <a
                  key={i}
                  href={cta.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '15px',
                    textDecoration: 'none',
                    fontFamily: 'Roboto, sans-serif',
                    transition: 'all 0.25s ease',
                    background: isPrimary ? '#964B4B' : 'transparent',
                    color: isPrimary ? 'white' : '#964B4B',
                    border: isPrimary ? '2px solid #964B4B' : '2px solid #964B4B',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    if (isPrimary) {
                      e.currentTarget.style.background = '#7a3c3c';
                      e.currentTarget.style.borderColor = '#7a3c3c';
                    } else {
                      e.currentTarget.style.background = '#fff5f5';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = isPrimary ? '#964B4B' : 'transparent';
                    e.currentTarget.style.borderColor = '#964B4B';
                  }}
                >
                  {cta.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Side: Stats Grid */}
        <div>
          <span style={{
            fontSize: '12px',
            fontWeight: '550',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'black',
            display: 'block',
            marginBottom: '20px',
            fontFamily: 'Roboto, sans-serif',
          }}>
            {stats_tag}
          </span>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                background: '#f8f9fa',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <span style={{
                  fontSize: '14px',
                  fontFamily: 'Roboto, sans-serif',
                  color: '#1a1f3c',
                  fontWeight: '500',
                  marginBottom: '16px',
                  display: 'block',
                }}>
                  {stat.label}
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  color: '#964B4B',
                }}>
                  <span style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: '32px',
                    fontWeight: '700',
                    lineHeight: '1',
                  }}>
                    {stat.value}
                  </span>
                  {stat.trend === 'up' ? <ArrowUp /> : stat.trend === 'down' ? <ArrowDown /> : null}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CareOutcomes;
