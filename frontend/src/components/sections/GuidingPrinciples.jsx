'use client';
import React from 'react';

const ICONS = {
  leaf: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#283466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 1 8.3C18.97 15.17 15.4 20 11 20z" />
      <path d="M11 20c-1.5-3.5-3.5-5-6-5a4 4 0 0 1 0-8c2 0 4 2 6 5" />
    </svg>
  ),
  handshake: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#283466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3-6 6" />
      <path d="M8.38 21.08 12 17.46a6 6 0 0 0-8.49-8.49l-1.63 1.63a1 1 0 0 0-.21 1.2l2.36 4.72a2 2 0 0 1 0 1.78l-2.07 4.14" />
    </svg>
  ),
  heartHand: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#283466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
    </svg>
  ),
  elevate: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#283466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  community: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#283466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 19a6 6 0 0 0-12 0" />
      <circle cx="8" cy="9" r="4" />
      <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
    </svg>
  ),
};

const GuidingPrinciples = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'WHAT WE STAND FOR';
  const heading = data.heading || 'The five principles\nthat guide everything we do';
  const subtitle = data.subtitle || 'These are not aspirational posters on a wall. They are the lens through which every product decision, partnership, and programme is made.';
  const cards = data.cards?.length > 0 ? data.cards : [
    { icon: 'leaf', title: 'Enjoy the Journey', description: '**Wellness should be joyful, not a chore.** We design experiences people look forward to returning to — every single day.' },
    { icon: 'handshake', title: 'Act with Integrity', description: 'We do what we say, say what we mean, and hold ourselves to the highest standard in every relationship we build with our partners, care communities, and individuals alike.' },
    { icon: 'heartHand', title: 'Be compassionate', description: 'Every product, session, and interaction is designed with genuine care for the people we serve — especially the most vulnerable. Compassion is not a policy; it is who we are.' },
    { icon: 'elevate', title: 'Elevate Others', description: 'We exist to lift people. Whether it is a resident discovering movement for the first time, or a care worker gaining confidence — we are here to help people reach more than they thought possible.' },
    { icon: 'community', title: 'Believe in Community', description: 'Connection is medicine. Every product we build is designed to strengthen bonds, reduce isolation, and grow the communities of people who need each other most.' },
  ];

  return (
    <section style={{
      background: '#f4f6fb',
      padding: '90px 5%',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#64748b',
            display: 'block',
            marginBottom: '16px',
          }}>
            {tag}
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '800',
            color: '#283466',
            lineHeight: '1.2',
            marginBottom: '20px',
            whiteSpace: 'pre-line',
          }}>
            {heading}
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#334155',
            lineHeight: '1.6',
            margin: '0 auto',
            maxWidth: '600px',
          }}>
            {subtitle}
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
        }}>
          {cards.map((card, i) => {
            const number = (i + 1).toString().padStart(2, '0');
            return (
              <div key={i} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '30px 20px',
                position: 'relative',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                borderTop: '6px solid #283466',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
              }}>
                <div style={{ marginBottom: '20px', color: '#283466' }}>
                  {ICONS[card.icon] || ICONS.leaf}
                </div>
                <h3 style={{
                  fontSize: '17px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '700',
                  color: '#283466',
                  marginBottom: '12px',
                  lineHeight: '1.3',
                }}>
                  {card.title}
                </h3>
                <div style={{
                  fontSize: '13px',
                  color: '#475569',
                  lineHeight: '1.6',
                  flexGrow: 1,
                  position: 'relative',
                  zIndex: 2,
                }} dangerouslySetInnerHTML={{
                  // Convert bold markdown to HTML strong tags
                  __html: card.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />

                {/* Watermark Number */}
                <span style={{
                  position: 'absolute',
                  bottom: '-10px',
                  right: '10px',
                  fontSize: '70px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '800',
                  color: '#e2e8f0',
                  lineHeight: '1',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}>
                  {number}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default GuidingPrinciples;
