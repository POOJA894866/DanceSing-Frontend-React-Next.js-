import React from 'react';
import Button from '../common/Button';

/**
 * CtaBanner — Section 3
 * Dark navy strip: text left / video thumbnail right.
 * data: { heading, subtitle, image, ctas[] }
 */
const CtaBanner = ({ data }) => {
  if (!data) return null;
  const { heading, subtitle, image, ctas } = data;

  return (
    <section className="cta-banner" id={data.id || 'cta-banner'} style={{ background: '#283466', padding: '100px 0', color: 'white' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '80px', alignItems: 'center' }}>

        {/* Left Side: Radio Details */}
        <div>
          <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.1em', opacity: 0.7, textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            Radio
          </span>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', padding: '8px 20px', borderRadius: '50px', marginBottom: '32px', fontSize: '13px', fontWeight: '700' }}>
            <span style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px #4ade80' }} />
            Broadcasting 24/7 • No adverts
          </div>

          <h2 style={{ fontSize: '52px', fontStyle: 'normal', fontWeight: '300', fontFamily: '"Sora", sans-serif', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-1px' }}>
            Listen now <br /> <span style={{ color: '#94a3b8' }}>on air</span>
          </h2>

          <p style={{ fontSize: '17px', opacity: 0.85, lineHeight: '1.6', marginBottom: '40px', maxWidth: '480px' }}>
            Tune into danceSing On Air — our 24/7 commercial-free wellbeing radio station crafted for older adults. Uplifting music, mood-boosting shows, reminiscence content, and dementia-friendly programming — all day, every day.
          </p>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a href="#" style={{ background: '#D48441', color: 'white', padding: '10px 30px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', boxShadow: '0 10px 20px rgba(212,132,65,0.2)', border: '1.5px solid #F6F8F9' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              Listen Live
            </a>
            <a href="#" style={{ border: '2px solid rgba(255,255,255,0.3)', color: '#10165dff', padding: '10px 30px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none', fontSize: '16px', backgroundColor: 'white' }}>
              Learn more
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Player Card */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {image?.src ? (
            <img
              src={image.src}
              alt={image.alt || 'Radio Player'}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '32px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                display: 'block',
                objectFit: 'cover',
                maxHeight: '500px'
              }}
            />
          ) : (
            <img
              src="/images/radio-player.png"
              alt="Radio Player"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '32px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                display: 'block'
              }}
            />
          )}
        </div>

      </div>
    </section>
  );
};

export default CtaBanner;
