'use client';
import React from 'react';

const ICONS = {
  movement: (
    <img src="/images/move.svg" alt="Movement" style={{ width: '30px', height: '30px' }} />
  ),
  mindfulness: (
    <img src="/images/mind.svg" alt="Mindfulness" style={{ width: '30px', height: '30px' }} />
  ),
  music: (
    <img src="/images/mucis.svg" alt="Music" style={{ width: '32px', height: '32px' }} />
  ),
  training: (
    <img src="/images/Vector.svg" alt="Training" style={{ width: '32px', height: '32px' }} />
  ),
};

const OurMission = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'OUR PURPOSE';
  const heading = data.heading || 'Our Mission';
  const subtitle = data.subtitle || 'Designed with older adults, by specialists who care about accessible wellness for all abilities';
  const body = data.body || 'We aim to empower older adults, caregivers, and care communities by providing accessible, fun, and research-backed wellness solutions.\n\nWhether through our innovative movement programmes, 24/7 Well-being Radio, or expert-led caregiver training, our mission is to enrich lives with joy, connection, and well-being.';
  const image = data.image;
  const features = data.features?.length > 0 ? data.features : [
    { icon: 'movement', title: 'Movement', description: 'Chair-based and adaptive routines for every ability, led by trained professionals.' },
    { icon: 'mindfulness', title: 'Mindfulness', description: 'Daily practices that reduce anxiety, improve sleep, and foster calm connection.' },
    { icon: 'music', title: 'Music', description: 'Clinically validated music therapy approaches that boost mood, memory and joy.' },
    { icon: 'training', title: 'Training', description: 'Expert-led workshops that build care staff confidence and capability.' },
  ];
  const ctas = data.ctas?.length > 0 ? data.ctas : [
    { label: 'Explore Care Resources →', href: '/care', style: 'accent' },
    { label: 'Explore Lifestyle →', href: '#lifestyle', style: 'green' },
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
    if (style === 'green') return { ...base, background: '#3D634B', color: 'white' };
    return { ...base, background: '#283466', color: 'white' };
  };

  return (
    <section style={{
      background: 'white',
      padding: '78px 5%',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        maxWidth: '1350px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '42% 1fr',
        gap: '150px',
        alignItems: 'flex-start',
      }}>

        {/* ── Left: Image Placeholder ── */}
        <div style={{
          width: '600px',
          height: '560px',
          borderRadius: '36px',
          background: '#e2e8f0',
          overflow: 'hidden',
          position: 'relative',
          marginTop: '88px',
        }}>
          <img
            src={image?.src || "/images/ourmiss.jpg"}
            alt={image?.alt || 'Our Mission'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        {/* ── Right: Content ── */}
        <div style={{ paddingTop: '10px' }}>
          <span style={{
            fontSize: '17px',
            fontWeight: '300',
            fontFamily:'Roboto',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#02020A',
            display: 'block',
            marginBottom: '16px',
          }}>
            {tag}
          </span>

          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '300',
            color: '#283466',
            lineHeight: '1.2',
            marginBottom: '22px',
          }}>
            {heading}
          </h2>

          <p style={{
            fontSize: '14px',
            fontFamily: 'Roboto',
            fontWeight: '500',
            fontStyle: 'italic',
            color: '#02020A',
            lineHeight: '1.6',
            marginBottom: '20px',
          }}>
            {subtitle}
          </p>

          <div style={{ marginBottom: '32px' }}>
            {body.split('\n').map((para, i) => (
              <p key={i} style={{
                fontSize: '14px',
                color: 'black',
                fontFamily: 'Roboto',
                fontWeight: '200',
                lineHeight: '1.75',
                margin: i > 0 ? '12px 0 0' : '0',
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* ── 2×2 Feature Cards ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '40px',
          }}>
            {features.map((feat, i) => (
              <div key={i} style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderLeft: '4px solid #283466',
                borderRadius: '12px',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{ marginBottom: '10px' }}>
                  {ICONS[feat.icon] || ICONS.movement}
                </div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#283466',
                  marginBottom: '8px',
                  fontFamily: 'Sora, sans-serif',
                }}>
                  {feat.title}
                </h4>
                <p style={{
                  fontSize: '13.5px',
                  fontFamily: 'Roboto, sans-serif',
                  color: '#0f172a',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

          {/* ── CTA Buttons ── */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {ctas.map((cta, i) => (
              <a key={i} href={cta.href} style={btnStyle(cta.style)}>
                {cta.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurMission;
