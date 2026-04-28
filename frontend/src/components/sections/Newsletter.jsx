import React, { useState } from 'react';

/**
 * Newsletter — Section 9
 * Dark background email form.
 * data: { heading, subtitle, inputPlaceholder, submitLabel, disclaimer }
 */
const Newsletter = ({ data }) => {
  if (!data) return null;
  const { heading, subtitle, inputPlaceholder, submitLabel, disclaimer } = data;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future Wagtail forms integration point
    console.log('Subscribing email:', email);
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="newsletter" id={data.id || 'newsletter'} style={{ background: '#ffffff', padding: '100px 0' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ background: '#283466', borderRadius: '24px', padding: '64px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          
          {/* Left Column */}
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#cbd5e1', letterSpacing: '0.15em', display: 'block', marginBottom: '24px' }}>
              BOOK A DEMO
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#ffffff', marginBottom: '20px', lineHeight: '1.2' }}>
              Save time and book a call with us
            </h2>
            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '40px' }}>
              Have a glance at our calendar and select a good time for you. We respond within 48 hours and our friendly team will walk you through everything danceSing has to offer.
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ background: '#ffffff', color: '#283466', padding: '14px 28px', borderRadius: '12px', fontWeight: '700', fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Book a Demo →
              </a>
              <a href="#" style={{ background: 'transparent', color: '#ffffff', padding: '14px 28px', borderRadius: '12px', border: '2px solid #5c6b9e', fontWeight: '700', fontSize: '15px', textDecoration: 'none' }}>
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginBottom: '32px' }}>
              Get in touch with us
            </h3>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => e.preventDefault()}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '14px 20px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', width: '100%', outline: 'none' }}
                />
                <input 
                  type="text" 
                  placeholder="Phone" 
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '14px 20px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', width: '100%', outline: 'none' }}
                />
              </div>

              <input 
                type="email" 
                placeholder="Email address" 
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '14px 20px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', width: '100%', outline: 'none' }}
              />

              <textarea 
                placeholder="Tell us about your organisation and how we can help..." 
                rows="4"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '14px 20px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', width: '100%', outline: 'none', resize: 'none' }}
              />

              <span style={{ color: '#cbd5e1', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                ⏱ We respond within 48 hours
              </span>

              <button 
                type="submit" 
                style={{ background: '#ffffff', color: '#283466', padding: '14px 28px', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '15px', width: 'fit-content', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}
              >
                Send Message →
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;
