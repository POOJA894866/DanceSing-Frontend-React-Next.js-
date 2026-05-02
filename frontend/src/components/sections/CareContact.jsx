'use client';

import React from 'react';
import Link from 'next/link';

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const CareContact = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'GET STARTED';
  const heading = data.heading || 'Ready to bring danceSing Care to your community?';
  const body = data.body || "Book a free consultation and let's talk through how Music, Movement, and Mindfulness can transform daily life for your residents and team.";
  
  const email_label = data.email_label || 'Email ID:';
  const email_address = data.email_address || 'support@dancesing.online';
  const response_label = data.response_label || 'Response time:';
  const response_text = data.response_text || 'We respond within 48 hours.';
  const rating_label = data.rating_label || 'Rating:';
  const rating_text = data.rating_text || '4.9 out of 5 Stars from Reviews';

  const button_1_label = data.button_1_label || 'Book a Consultation →';
  const button_1_link = data.button_1_link || '#book';
  const button_2_label = data.button_2_label || 'View Pricing';
  const button_2_link = data.button_2_link || '#pricing';

  const form_heading = data.form_heading || 'Get in touch with us';
  const form_response_text = data.form_response_text || 'We respond within 48 hours';
  const form_button_label = data.form_button_label || 'Send Message →';

  return (
    <section style={{ background: 'white', padding: '96px 5%' }}>
      <style>{`
        .care-contact-input::placeholder {
          color: white;
        }
      `}</style>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: '#964B4B',
        borderRadius: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        overflow: 'hidden',
      }}>
        
        {/* Left Side: Content */}
        <div style={{
          padding: '64px',
          borderRight: '1px solid rgba(255, 255, 255, 0.15)',
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: '400',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.9)',
            display: 'block',
            marginBottom: '24px',
            fontFamily: 'Roboto, sans-serif',
          }}>
            {tag}
          </span>

          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontWeight: '400',
            color: 'white',
            lineHeight: '1.2',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            {heading}
          </h2>

          <p style={{
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            color: ' rgba(246, 248, 249, 0.80)',
            lineHeight: '1.6',
            marginBottom: '32px',
          }}>
            {body}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '15px' }}>
              <strong style={{ color: 'white', minWidth: '120px' }}>{email_label}</strong>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                <a href={`mailto:${email_address}`} style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>
                  {email_address}
                </a>
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '15px' }}>
              <strong style={{ color: 'white', minWidth: '120px' }}>{response_label}</strong>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{response_text}</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '15px' }}>
              <strong style={{ color: 'white', minWidth: '120px' }}>{rating_label}</strong>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '2px', marginRight: '8px' }}>
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{rating_text}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href={button_1_link} style={{
              background: 'white',
              color: '#964B4B',
              padding: '14px 28px',
              borderRadius: '8px',
              fontWeight: '600',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '15px',
              textDecoration: 'none',
              display: 'inline-block',
            }}>
              {button_1_label}
            </Link>
            <Link href={button_2_link} style={{
              background: 'transparent',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              padding: '14px 28px',
              borderRadius: '8px',
              fontWeight: '600',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '15px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'border-color 0.25s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'}
            >
              {button_2_label}
            </Link>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ padding: '64px' }}>
          <h3 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '28px',
            fontWeight: '600',
            color: 'white',
            marginBottom: '32px',
          }}>
            {form_heading}
          </h3>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input 
                className="care-contact-input"
                type="text" 
                placeholder="Full Name" 
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '16px',
                  color: 'white',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
              <input 
                className="care-contact-input"
                type="tel" 
                placeholder="Phone" 
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '16px',
                  color: 'white',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
            </div>
            
            <input 
              className="care-contact-input"
              type="email" 
              placeholder="Email address" 
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '16px',
                color: 'white',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '15px',
                outline: 'none',
              }}
            />

            <textarea 
              className="care-contact-input"
              placeholder="Tell us about your organisation and how we can help..." 
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '16px',
                color: 'white',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '15px',
                minHeight: '120px',
                resize: 'none',
                outline: 'none',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px', marginTop: '4px' }}>
              <ClockIcon />
              <span>{form_response_text}</span>
            </div>

            <button 
              type="submit"
              style={{
                background: 'white',
                color: '#1a1f3c',
                border: 'none',
                padding: '14px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '15px',
                cursor: 'pointer',
                marginTop: '16px',
                alignSelf: 'flex-start',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {form_button_label}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default CareContact;
