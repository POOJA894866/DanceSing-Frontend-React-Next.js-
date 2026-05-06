'use client';

import React from 'react';

const icons = {
  pilates: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 6v8" />
      <path d="m8 10 4-4 4 4" />
      <path d="M7 22l5-8 5 8" />
    </svg>
  ),
  yoga: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6c-2.5 0-4.5 2-4.5 4.5V14h9v-3.5C16.5 8 14.5 6 12 6z" />
      <path d="M7.5 14v4.5c0 1.9 1.6 3.5 3.5 3.5h2c1.9 0 3.5-1.6 3.5-3.5V14" />
      <path d="M3 14h18" />
    </svg>
  ),
  dance: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <path d="m10 9 2-2 2 2-2 6" />
      <path d="m9 18 3-3 3 3" />
      <path d="m14 10 3-2" />
      <path d="M10 10 7 8" />
    </svg>
  ),
  meditation: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M14 9h-4L8 13l2 5" />
      <path d="M16 13l-2 5" />
      <path d="M6 21v-3l2-5" />
      <path d="M18 21v-3l-2-5" />
      <path d="M12 9v6" />
    </svg>
  ),
  singing: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
      <circle cx="17" cy="7" r="5" />
    </svg>
  ),
  nutrition: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  ),
};

const LifestyleDisciplines = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'SIX DISCIPLINES, ONE PLATFORM';
  const heading = data.heading || 'Every dimension of wellbeing, in one place';
  const subtitle = data.subtitle || 'From physical movement to emotional calm — our six wellness disciplines cover every aspect of a healthy, connected, independent life.';

  const cards = data.cards?.length > 0 ? data.cards : [
    {
      icon_name: 'pilates',
      title: 'Pilates',
      description: 'Gentle core-strengthening and postural alignment sessions designed for older adults — improving stability, reducing back pain, and building lasting physical confidence.',
    },
    {
      icon_name: 'yoga',
      title: 'Yoga',
      description: 'Chair-based and standing yoga adapted for all ability levels — increasing flexibility, improving balance, and bringing a sense of calm and inner stillness to each day.',
    },
    {
      icon_name: 'dance',
      title: 'Dance Fitness',
      description: 'Joyful, music-led movement sessions that get the heart pumping, lift the mood, and bring the irreplaceable energy of dancing together into everyday life.',
    },
    {
      icon_name: 'meditation',
      title: 'Meditation',
      description: 'Guided mindfulness and meditation practices that reduce stress and anxiety, support emotional resilience, and help you find quiet, grounded moments in a busy world.',
    },
    {
      icon_name: 'singing',
      title: 'Singing',
      description: 'Vocal sessions that build confidence, support respiratory health, and create the kind of joyful social connection that is uniquely powerful for older adults\' wellbeing.',
    },
    {
      icon_name: 'nutrition',
      title: 'Nutrition',
      description: 'Accessible, practical nutrition guidance tailored to the needs of older adults — supporting energy, immunity, and independence through the power of everyday food choices.',
    },
  ];

  return (
    <section style={{ background: '#ffffff', padding: '100px 0 120px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header Section */}
        <div style={{ marginBottom: '64px', maxWidth: '600px' }}>
          <p style={{
            fontSize: '13px',
            fontWeight: '800',
            letterSpacing: '0.12em',
            color: 'black',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontFamily: 'Sora, sans-serif',
          }}>
            {tag}
          </p>

          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            fontWeight: '400',
            color: '#3D634B',
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}>
            {heading}
          </h2>

          <p style={{
            fontSize: '15px',
            fontFamily: 'Roboto, sans-serif',
            color: 'black',
            lineHeight: '1.65',
            margin: 0,
          }}>
            {subtitle}
          </p>
        </div>

        {/* 3x2 Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
        }}>
          {cards.map((card, i) => {
            const IconComponent = icons[card.icon_name] || icons.pilates;
            return (
              <div key={i} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '36px',
                border: '1px solid #f3f4f6',
                boxShadow: '0 10px 9px rgba(0,0,0,0.16)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 9px rgba(0,0,0,0.16)';
                }}>
                <div style={{ color: '#3b6b4c' }}>
                  {IconComponent}
                </div>

                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: '700',
                    color: '#3b6b4c',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: '13.5px',
                    fontFamily: 'Roboto, sans-serif',
                    color: '#111827',
                    lineHeight: '1.6',
                    margin: 0,
                  }}>
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default LifestyleDisciplines;
