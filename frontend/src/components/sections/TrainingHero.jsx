'use client';

import React from 'react';
import Link from 'next/link';

const TrainingHero = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'Empowering Care Teams';
  const heading = data.heading || 'Empowering Teams,\nElevating Care Standards';
  const body = data.body || 'Our all-in-one training and support solution is designed to save time, lift care standards, and empower teams — making it an indispensable tool for senior living communities and care providers.';
  
  const floatingCards = data.floating_cards?.length > 0 ? data.floating_cards : [
    { title: 'Live On-Demand Sessions', description: 'High-quality activities available anytime — helping teams deliver engaging experiences without needing extra staff or preparation time.' },
    { title: 'Facilitator Training', description: 'Builds staff confidence and consistency in activity delivery, raising care standards and earning the danceSing Level 1 Facilitation Certificate.' },
    { title: 'Dedicated Support', description: 'We handle all service support so your team can focus entirely on what matters — delivering excellent, person-centred care.' }
  ];

  const ctas = data.ctas?.length > 0 ? data.ctas : [
    { label: 'Book a Consultation', href: '#consultation', style: 'primary' },
    { label: 'View Pricing →', href: '#pricing', style: 'outline' }
  ];

  const image = data.image;
  const headingLines = heading.split('\n');

  // Positioning for the 3 floating cards (top-left, middle-right, bottom-left relative to image)
  const cardPositions = [
    { top: '40px', left: '-120px' },
    { top: '50%', right: '-80px', transform: 'translateY(-50%)' },
    { bottom: '20px', left: '-140px' }
  ];

  return (
    <section style={{
      background: 'linear-gradient(135deg, #f4f6f8 0%, #e8edf1 40%, #d8e3ea 100%)',
      minHeight: '100vh',
      paddingTop: '160px',
      paddingBottom: '100px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Decorative Warm Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(255,245,235,0.8) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Left Content */}
        <div style={{ paddingRight: '20px' }}>
          <span style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '700',
            fontFamily: 'Roboto, sans-serif',
            color: '#333',
            marginBottom: '16px',
            textTransform: 'none'
          }}>
            {tag}
          </span>

          <h1 style={{
            fontSize: 'clamp(40px, 4.5vw, 56px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '700',
            color: '#1a5e7b', // Teal color matching screenshot
            lineHeight: '1.15',
            marginBottom: '30px',
            letterSpacing: '-1px'
          }}>
            {headingLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <p style={{
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            color: '#2d3748',
            lineHeight: '1.6',
            marginBottom: '40px',
            maxWidth: '500px'
          }}>
            {body}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
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
                  border: `1.5px solid ${isPrimary ? '#1a5e7b' : '#94a3b8'}`,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  if (!isPrimary) {
                    e.currentTarget.style.borderColor = '#1a5e7b';
                    e.currentTarget.style.background = 'rgba(26, 94, 123, 0.05)';
                  } else {
                    e.currentTarget.style.background = '#13475c';
                    e.currentTarget.style.borderColor = '#13475c';
                  }
                }}
                onMouseLeave={e => {
                  if (!isPrimary) {
                    e.currentTarget.style.borderColor = '#94a3b8';
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

        {/* Right Image & Floating Cards */}
        <div style={{ position: 'relative', height: '600px', display: 'flex', justifyContent: 'center' }}>
          
          {/* Main Image */}
          <div style={{
            width: '400px',
            height: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            background: '#e2e8f0', // Placeholder gray
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            {image?.src && (
              <img src={image.src} alt={image.alt || 'Training'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>

          {/* Floating Cards */}
          {floatingCards.map((card, i) => {
            const pos = cardPositions[i] || {};
            return (
              <div key={i} style={{
                position: 'absolute',
                ...pos,
                background: 'white',
                padding: '20px 24px',
                borderRadius: '12px',
                width: '320px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                border: '2px solid #1a5e7b',
                zIndex: 10
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '700',
                  color: '#1a5e7b',
                  marginBottom: '8px'
                }}>
                  {card.title}
                </h4>
                <p style={{
                  fontSize: '12px',
                  fontFamily: 'Roboto, sans-serif',
                  color: '#4a5568',
                  lineHeight: '1.5',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Listen Now Button */}
      <a href="/radio" style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: '#e67e22', // Orange color
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        boxShadow: '0 8px 24px rgba(230, 126, 34, 0.4)',
        border: '3px solid white',
        zIndex: 50,
        transition: 'transform 0.2s ease'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '4px' }}>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
        <span style={{ fontSize: '10px', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>Listen Now</span>
      </a>

    </section>
  );
};

export default TrainingHero;
