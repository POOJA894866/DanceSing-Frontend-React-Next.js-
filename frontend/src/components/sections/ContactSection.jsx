'use client';
import React from 'react';

const ContactSection = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'COME AND SAY HELLO';
  const heading = data.heading || "We'd love to hear from you";
  const body = data.body || 'Whether you run a care home, work in an independent living community, or simply want to know more about what we do — our team is always happy to talk.';
  const email = data.email || 'support@dancesing.online';
  const responseTime = data.response_time || 'We respond within 48 hours.';
  const ratingText = data.rating_text || '4.9 out of 5 Stars from Reviews';
  
  const formHeading = data.form_heading || 'Get in touch with us';
  const formSubtext = data.form_subtext || 'We respond within 48 hours';
  
  const ctas = data.ctas?.length > 0 ? data.ctas : [
    { label: 'Book a Demo →', href: '#demo', style: 'white' },
    { label: 'Contact Us', href: '#contact', style: 'outline-white' },
  ];

  const btnStyle = (style) => {
    const base = {
      padding: '12px 20px',
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
    if (style === 'white') return { ...base, background: 'white', color: '#283466' };
    if (style === 'outline-white') return { ...base, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.7)', color: 'white' };
    return { ...base, background: 'white', color: '#283466' };
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: '14px 16px',
    fontSize: '14px',
    color: 'white',
    fontFamily: 'inherit',
    outline: 'none',
  };

  return (
    <section style={{
      background: '#f4f6fb',
      padding: '90px 5%',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        maxWidth: '1100px',
        width: '100%',
        borderRadius: '24px',
        display: 'flex',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(40, 52, 102, 0.1)',
      }}>

        {/* ── Left Column ── */}
        <div style={{
          flex: '1',
          background: '#232e58', // slightly darker navy
          padding: '60px 50px',
          color: 'white',
        }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            display: 'block',
            marginBottom: '16px',
          }}>
            {tag}
          </span>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 42px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '24px',
          }}>
            {heading}
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '1.6',
            marginBottom: '32px',
          }}>
            {body}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            <div style={{ fontSize: '14px' }}>
              <strong style={{ fontWeight: '600' }}>Email ID:</strong>{' '}
              <a href={`mailto:${email}`} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'underline' }}>{email}</a>
            </div>
            <div style={{ fontSize: '14px' }}>
              <strong style={{ fontWeight: '600' }}>Response time:</strong>{' '}
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>{responseTime}</span>
            </div>
            <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ fontWeight: '600' }}>Rating:</strong>{' '}
              <div style={{ display: 'flex', gap: '4px', color: '#e8a020' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.8)', marginLeft: '4px' }}>{ratingText}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {ctas.map((cta, i) => (
              <a key={i} href={cta.href} style={btnStyle(cta.style)}>
                {cta.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right Column ── */}
        <div style={{
          flex: '1',
          background: '#2c3970', // slightly lighter navy
          padding: '60px 50px',
          color: 'white',
        }}>
          <h3 style={{
            fontSize: '24px',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '700',
            marginBottom: '30px',
          }}>
            {formHeading}
          </h3>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="text" placeholder="Full Name" style={inputStyle} />
              <input type="tel" placeholder="Phone" style={inputStyle} />
            </div>
            <input type="email" placeholder="Email address" style={inputStyle} />
            <textarea 
              placeholder="Tell us about your organisation and how we can help..." 
              style={{ ...inputStyle, resize: 'none', minHeight: '120px' }} 
            />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.6)',
              marginTop: '4px',
              marginBottom: '4px',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {formSubtext}
            </div>

            <div>
              <button type="submit" style={{ ...btnStyle('white'), border: 'none' }}>
                Send Message →
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
