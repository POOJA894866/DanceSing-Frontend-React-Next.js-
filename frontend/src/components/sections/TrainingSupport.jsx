'use client';

import React from 'react';

const TrainingSupport = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'COMPREHENSIVE SUPPORT';
  const heading = data.heading || 'Everything your team needs to succeed';
  const body = data.body || 'Thorough onboarding and continuous support across four pillars — so your staff feel confident from day one and supported for the long term.';

  const hasValidCards = data.cards && data.cards.length > 0 && data.cards[0].title && data.cards[0].title.trim() !== '';
  const cards = hasValidCards ? data.cards : [
    {
      icon: 'access',
      category: 'ACCESS & SETUP',
      title: 'Technical Setup & Onboarding',
      items: [
        { text: 'Step-by-step guidance on device setup, connectors (HDMI, etc.), and screen configuration.' },
        { text: 'Troubleshooting support to ensure smooth operation from day one.' },
        { text: 'Online onboarding session with your dedicated support contact.' },
        { text: 'Staff materials and quick-start guides for the whole team.' }
      ]
    },
    {
      icon: 'engagement',
      category: 'ENGAGEMENT COACHING',
      title: 'Maximising Resident Engagement',
      items: [
        { text: 'Coaching staff on how to get the most from every session.' },
        { text: 'Tailoring content to residents\' abilities and preferences.' },
        { text: 'Ensuring sessions are consistent, impactful, and person-centred.' },
        { text: 'Best practice guidance on dementia-inclusive facilitation.' }
      ]
    },
    {
      icon: 'facilitation',
      category: 'FACILITATION TRAINING',
      title: 'How & Why It Works',
      items: [
        { text: 'Training covers not just how to run sessions, but the evidence behind why they work.' },
        { text: 'Helping residents build skills for daily tasks and increase independence.' },
        { text: 'Flexible delivery — predominantly online video calls to suit team schedules.' },
        { text: 'In-person half-day and full-day options available.' }
      ]
    },
    {
      icon: 'support',
      category: 'ONGOING SUPPORT',
      title: 'Support That Doesn\'t Stop',
      items: [
        { text: 'Dedicated ongoing support to keep things running smoothly.' },
        { text: 'Regular virtual check-ins and updates with new resources.' },
        { text: 'Data-driven insights to track progress and measure outcomes.' },
        { text: 'Quarterly review sessions for Team and Organisation plans.' }
      ]
    }
  ];

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'access':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
          </svg>
        );
      case 'engagement':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'facilitation':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'support':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18" />
            <path d="M9 8h1" />
            <path d="M9 12h1" />
            <path d="M9 16h1" />
            <path d="M14 8h1" />
            <path d="M14 12h1" />
            <path d="M14 16h1" />
            <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
    }
  };

  return (
    <section style={{
      background: '#1A5E7A', // teal background based on screenshot
      padding: '100px 0',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <span style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '700',
            fontFamily: 'Roboto, sans-serif',
            color: 'white',
            letterSpacing: '0.15em',
            marginBottom: '20px',
            textTransform: 'uppercase'
          }}>
            {tag}
          </span>

          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '400',
            color: 'white',
            lineHeight: '1.2',
            marginBottom: '24px',
            letterSpacing: '-0.5px'
          }}>
            {heading}
          </h2>

          <p style={{
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.6',
            margin: '0 auto',
            maxWidth: '900px'
          }}>
            {body}
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          {cards.map((card, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>

              {/* Card Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#256b82',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {renderIcon(card.icon)}
                </div>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  fontFamily: 'Roboto, sans-serif',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  {card.category}
                </span>
              </div>

              {/* Card Title */}
              <h3 style={{
                fontSize: '22px',
                fontFamily: 'Sora, sans-serif',
                fontWeight: '700',
                color: '#02020a',
                lineHeight: '1.3',
                marginBottom: '24px'
              }}>
                {card.title}
              </h3>

              {/* List Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {card.items.map((item, itemIdx) => (
                  <div key={itemIdx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '16px 0',
                    borderTop: itemIdx === 0 ? 'none' : '1px solid #f1f5f9'
                  }}>
                    <span style={{
                      color: '#475569',
                      fontSize: '14px',
                      fontWeight: '700',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      →
                    </span>
                    <span style={{
                      fontSize: '14px',
                      fontFamily: 'Roboto, sans-serif',
                      color: '#1e293b',
                      lineHeight: '1.5'
                    }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrainingSupport;
