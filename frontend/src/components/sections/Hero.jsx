import React from 'react';
import Button from '../common/Button';
import StatsBar from './StatsBar';

/**
 * Hero — Section 1
 * Full-viewport dark image + stats row below content.
 * data: { tag, heading, body, image, stats[], ctas[] }
 */
const Hero = ({ data }) => {
  if (!data) return null;
  
  // Mapping with fallbacks to support both old and new Wagtail blocks
  const heading = data.heading || '';
  const body = data.body || '';
  const image = data.image;
  const ctas = data.ctas || [];
  const awards = data.awards || [];
  const rating_text = data.rating_text || (data.stats?.length ? 'Highly Rated' : '');
  const radio_text = data.radio_text || data.tag || 'Live • 24/7 Wellness Radio';
  const floating_cta = data.floating_cta || { label: 'Listen Now', href: '#radio', style: 'accent' };

  return (
    <>
      <section className="hero-premium">
      <div className="hero-premium__inner">
        {/* Main Hero Card */}
        <div className="hero-card">
          {image?.src && (
            <img src={image.src} alt={image.alt || 'Hero'} className="hero-card__bg" />
          )}
          <div className="hero-card__overlay" />
          
          <div className="hero-card__content">
            {/* Radio Pill */}
            {radio_text && (
              <div className="radio-pill">
                <span className="radio-pill__dot" />
                <span className="radio-pill__text">{radio_text}</span>
              </div>
            )}

            <h1 className="hero-card__heading">
              {heading.split(/\n|\\n/).map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}{i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            <p className="hero-card__body">
              {body.split(/\n|\\n/).map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}{i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>

            <div className="hero-card__ctas">
              {ctas?.map((cta, i) => (
                <a key={i} href={cta.href} className={`hero-btn hero-btn--${cta.style}`}>
                  {cta.label}
                  {(cta.style === 'accent' || cta.style === 'green') && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                      <path d="M5 12h14m-7-7 7 7-7 7"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Awards & Ratings Bar */}
          <div className="hero-trust">
            <div className="hero-trust__awards">
              <img src="/images/award-sme.png" alt="SME News Award" className="award-logo" />
              <img src="/images/award-ai.png" alt="AI Excellence Award" className="award-logo" />
            </div>
            {rating_text && (
              <div className="hero-trust__rating">
                <div className="stars">★★★★★</div>
                <span>{rating_text}</span>
              </div>
            )}
          </div>

          {/* Floating Listen Button */}
          {floating_cta?.label && (
            <a href={floating_cta.href} className="listen-fab">
              <div className="listen-fab__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                </svg>
              </div>
              <span className="listen-fab__label">{floating_cta.label}</span>
            </a>
          )}
        </div>
      </div>
    </section>
    <StatsBar data={{
      stats: [
        { value: '200+', label: 'Care Communities' },
        { value: '24/7', label: 'Well-being Radio' },
        { value: '100%', label: 'Evidence Backed' },
        { value: '10,000+', label: 'Residents' }
      ]
    }} />
  </>
);
};

export default Hero;
