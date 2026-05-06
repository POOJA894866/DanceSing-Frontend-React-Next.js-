'use client';

import React from 'react';

const LifestyleTestimonials = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'WHAT CARE TEAMS SAY';
  const heading = data.heading || 'Heard directly from\nthe communities we serve';
  const subtitle = data.subtitle || "Real feedback from care managers, activities coordinators, researchers, and residents' families across the UK.";
  
  const items = data.items?.length > 0 ? data.items : [
    {
      pill_text: 'CARE',
      quote: "We could clearly see the enjoyment and joy people experienced when using the resources.",
      author: "Resident Impact",
    },
    {
      pill_text: 'CARE',
      quote: "We could clearly see the enjoyment and joy people experienced when using the resources.",
      author: "Resident Impact",
    },
    {
      pill_text: 'CARE',
      quote: "We could clearly see the enjoyment and joy people experienced when using the resources.",
      author: "Resident Impact",
    },
    {
      pill_text: 'CARE',
      quote: "We could clearly see the enjoyment and joy people experienced when using the resources.",
      author: "Resident Impact",
    },
    {
      pill_text: 'CARE',
      quote: "We could clearly see the enjoyment and joy people experienced when using the resources.",
      author: "Resident Impact",
    },
  ];

  const headingLines = heading.split('\n');

  return (
    <section style={{ background: '#4a6f58', padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Header Section */}
        <div style={{ padding: '0 24px', marginBottom: '60px' }}>
          <span style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            letterSpacing: '0.15em', 
            color: '#e5eee8', 
            textTransform: 'uppercase', 
            display: 'block', 
            marginBottom: '16px',
            fontFamily: 'Sora, sans-serif'
          }}>
            {tag}
          </span>

          <h2 style={{ 
            fontSize: 'clamp(32px, 4vw, 48px)', 
            fontFamily: 'Sora, sans-serif', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '16px', 
            lineHeight: '1.2', 
            letterSpacing: '-0.02em' 
          }}>
            {headingLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          <p style={{
            fontSize: '15px',
            fontFamily: 'Roboto, sans-serif',
            color: '#e5eee8',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {subtitle}
          </p>
        </div>

        {/* Carousel Section */}
        <div 
          className="lifestyle-testimonials-scroll" 
          style={{ 
            display: 'flex', 
            gap: '24px', 
            overflowX: 'auto', 
            paddingBottom: '24px', 
            paddingLeft: 'max(24px, calc((100vw - 1352px) / 2))', 
            paddingRight: '24px', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none' 
          }}
        >
          {items.map((item, i) => (
            <div 
              key={i} 
              style={{ 
                background: '#f8fbf9', 
                padding: '32px', 
                borderRadius: '16px', 
                textAlign: 'left', 
                minWidth: '320px', 
                maxWidth: '320px', 
                flexShrink: 0, 
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                <span style={{ 
                  color: '#4a6f58', 
                  background: '#e8f0eb', 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  letterSpacing: '0.08em' 
                }}>
                  {item.pill_text}
                </span>
              </div>

              <p style={{ 
                fontSize: '16px', 
                color: '#1a1f3c', 
                lineHeight: '1.6', 
                fontFamily: 'Roboto, sans-serif',
                marginBottom: '40px',
                flexGrow: 1
              }}>
                &ldquo;{item.quote}&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4 style={{ 
                  fontSize: '15px', 
                  fontWeight: '700', 
                  color: '#1a1f3c', 
                  margin: 0,
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  - {item.author}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
      
      <style>{`
        .lifestyle-testimonials-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default LifestyleTestimonials;
