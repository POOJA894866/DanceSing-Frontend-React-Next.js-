'use client';
import React from 'react';

const AboutHero = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'The People and Purpose Behind the Platform';
  const heading = data.heading || 'Founded On A Belief That Joy Is Medicine';
  const body = data.body || 'We started danceSing because we saw what happened when older adults had access to music, movement, and real human connection every day — and we wanted every care community in the UK to feel that difference.';
  const ctas = data.ctas || [];
  const images = data.images || [];
  const bottomBar = data.bottom_bar?.length > 0
    ? data.bottom_bar
    : ['ICO Registered', 'UK-based', 'Established in 2019'];

  const btnStyle = (style) => {
    const base = {
      padding: '13px 22px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '15px',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer',
      transition: 'opacity 0.2s ease',
      whiteSpace: 'nowrap',
    };
    if (style === 'accent') return { ...base, background: '#964B4B', color: 'white' };
    if (style === 'green') return { ...base, background: '#3D634B', color: 'white' };
    if (style === 'outline-white') return { ...base, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.75)', color: 'white' };
    return { ...base, background: 'white', color: '#283466' };
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ── Dark Hero Area ── */}
      <div style={{ background: '#283466', padding: '146px 5% 88px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          maxWidth: '1300px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}>

          {/* ── Left: Text Content ── */}
          <div style={{ textAlign: 'left' }}>
            <span style={{
              fontSize: '13px',
              fontFamily: 'Sora,sans-serif',
              fontWeight: '500',
              letterSpacing: '1px',
              color: 'rgba(255,255,255,0.85)',
              display: 'block',
              marginBottom: '20px',
            }}>
              {tag}
            </span>

            <h1 style={{
              fontSize: 'clamp(30px, 4.5vw, 55px)',
              fontFamily: 'Sora, sans-serif',
              textAlign: "left",
              fontWeight: '200',
              lineHeight: '1.2',
              color: 'white',
              marginTop: "30px",
              marginBottom: '28px',
              letterSpacing: '-1px',
            }}>
              {heading === 'Founded On A Belief That Joy Is Medicine' ? (
                <>
                  Founded On A Belief <br />
                  That Joy Is Medicine
                </>
              ) : (
                heading
              )}
            </h1>

            <p style={{
              fontSize: '15px',
              lineHeight: '1.65',
              fontFamily: 'Roboto',
              textAlign: "left",
              color: '#F2F4F3',
              marginBottom: '40px',
              maxWidth: '500px',
            }}>
              {body}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {ctas.length > 0 ? ctas.map((cta, i) => (
                <a key={i} href={cta.href} style={btnStyle(cta.style)}>{cta.label}</a>
              )) : (
                <>
                  <a href="#care" style={{ ...btnStyle('#964B4B'), fontFamily: 'Roboto' }}>Explore Care →</a>
                  <a href="#lifestyle" style={{ ...btnStyle('#3D634B'), fontFamily: 'Roboto' }}>Explore Lifestyle →</a>
                  <a href="#demo" style={{ ...btnStyle('#F2F4F3'), fontFamily: 'Roboto' }}>Watch Demo</a>
                </>
              )}
            </div>
          </div>

          {/* ── Right: Image Carousel Placeholder ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '24px' }}>
            <div style={{
              width: '560px',
              height: "560px",
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '36px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: '20px',
              border: '1px solid rgba(255,255,255,0.12)',
              position: 'relative'
            }}>
              {/* Show image if provided */}
              {images.length > 0 && (
                <img
                  src={images[0].src}
                  alt={images[0].alt || ''}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}

              {/* Carousel dots */}
              <div style={{ display: 'flex', gap: '7px', position: 'relative', zIndex: 2 }}>
                {(images.length > 1 ? images : [1, 2, 3, 4, 5]).map((_, idx) => (
                  <div key={idx} style={{
                    width: idx === 0 ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: idx === 0 ? 'white' : 'rgba(255,255,255,0.45)',
                    transition: 'all 0.3s ease',
                  }} />
                ))}
              </div>
            </div>

            {/* ── Listen Now Button ── */}
            <a href="#radio" className="listen-fab">
              <div className="listen-fab__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '2px' }}>
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                <span className="listen-fab__label">Listen Now</span>
              </div>
            </a>
          </div>

        </div>

      </div>

      {/* ── Bottom Info Bar ── */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #eaeef3',
        padding: '28px 5%',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {bottomBar.map((item, i) => (
            <React.Fragment key={i}>
              <h3 style={{
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontWeight: '800',
                color: '#283466',
                margin: 0,
                fontFamily: 'Sora, sans-serif',
              }}>
                {item}
              </h3>
              {i < bottomBar.length - 1 && (
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8', flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </section>
  );
};

export default AboutHero;

