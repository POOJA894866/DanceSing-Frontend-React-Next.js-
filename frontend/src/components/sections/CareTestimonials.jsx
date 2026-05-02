'use client';

import React, { useRef, useState } from 'react';

const CareTestimonials = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'WHAT CARE TEAMS SAY';
  const heading = data.heading || 'Heard directly from the communities we serve';
  const subtitle = data.subtitle || "Real feedback from care managers, activities coordinators, researchers, and residents' families across the UK.";

  const items = data.items?.length > 0 ? data.items : [
    { badge: 'CARE', text: '"We could clearly see the enjoyment and joy people experienced when using the resources."', author: 'Resident Impact' },
    { badge: 'CARE', text: '"We could clearly see the enjoyment and joy people experienced when using the resources."', author: 'Resident Impact' },
    { badge: 'CARE', text: '"We could clearly see the enjoyment and joy people experienced when using the resources."', author: 'Resident Impact' },
    { badge: 'CARE', text: '"We could clearly see the enjoyment and joy people experienced when using the resources."', author: 'Resident Impact' },
    { badge: 'CARE', text: '"We could clearly see the enjoyment and joy people experienced when using the resources."', author: 'Resident Impact' },
  ];

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const stopDrag = () => setIsDragging(false);

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section style={{
      background: '#7B3B3B',
      padding: '96px 0',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '0 5%', marginBottom: '56px' }}>
        <span style={{
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'white',
          display: 'block',
          marginBottom: '20px',
          fontFamily: 'Roboto, sans-serif',
        }}>
          {tag}
        </span>

        <h2 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: '700',
          color: '#ffffff',
          lineHeight: '1.15',
          marginBottom: '20px',
          letterSpacing: '-0.02em',
          maxWidth: '700px',
          margin: '0 auto 20px auto',
        }}>
          {heading}
        </h2>

        <p style={{
          fontSize: '16px',
          fontFamily: 'Roboto, sans-serif',
          color: 'white',
          lineHeight: '1.6',
          fontWeight: '200',
          maxWidth: '783px',
          margin: '0 auto',
        }}>
          {subtitle}
        </p>
      </div>

      {/* Scrollable card row */}
      <div style={{ position: 'relative' }}>
        {/* Left fade */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(to right, #7B3B3B, transparent)',
          pointerEvents: 'none',
        }} />
        {/* Right fade */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(to left, #7B3B3B, transparent)',
          pointerEvents: 'none',
        }} />

        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          style={{
            display: 'flex',
            gap: '24px',
            padding: '8px 5% 32px 5%',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            cursor: isDragging ? 'grabbing' : 'grab',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {items.map((item, i) => (
            <div key={i} style={{
              flex: '0 0 300px',
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              scrollSnapAlign: 'start',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              transition: 'transform 0.3s ease',
              userSelect: 'none',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Badge */}
              <span style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#964B4B',
                fontFamily: 'Roboto, sans-serif',
              }}>
                {item.badge || 'CARE'}
              </span>

              {/* Quote */}
              <p style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '15px',
                color: '#1a1f3c',
                lineHeight: '1.65',
                margin: 0,
                flexGrow: 1,
              }}>
                {item.text}
              </p>

              {/* Author */}
              <p style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '14px',
                fontWeight: '700',
                color: '#964B4B',
                margin: 0,
              }}>
                - {item.author}
                {item.role && (
                  <span style={{ display: 'block', fontWeight: '400', color: '#64748b', fontSize: '13px', fontFamily: 'Roboto, sans-serif' }}>
                    {item.role}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
        {['←', '→'].map((arrow, i) => (
          <button
            key={i}
            onClick={() => scrollBy(i === 0 ? -1 : 1)}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.35)',
              background: 'transparent',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
              fontFamily: 'sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.borderColor = 'white';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
            }}
          >
            {arrow}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CareTestimonials;
