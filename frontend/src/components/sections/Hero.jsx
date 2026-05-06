import React from 'react';
import Link from 'next/link';
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
  const rating_text = data.rating_text || (data.stats?.length ? 'Highly Rated' : '');
  const radio_text = data.radio_text || data.tag || 'Broadcasting Live • 24/7 Wellness Radio';
  const floating_cta = data.floating_cta || { label: 'Listen Now', href: '#radio', style: 'accent' };

  // Avatar initials for the trust row
  const avatarInitials = ['DS', 'AL', 'SR', 'CM'];
  const avatarColors = ['#283466', '#e8a020', '#2f6d42', '#c75c4d'];

  return (
    <>
      <section className="hero-premium">
        <div className="hero-premium__inner">
          {/* Main Hero Card */}
          <div className="hero-card">
            {(image?.src || true) && (
              <img src={image?.src || '/images/pr3.jpg'} alt={image?.alt || 'Hero'} className="hero-card__bg" />
            )}
            <div className="hero-card__overlay" />

            {/* ── Centre Content ── */}
            <div className="hero-card__content">
              {/* Radio Pill */}
              {radio_text && (
                <div className="radio-pill">
                  <span className="radio-pill__dot" />
                  <span className="radio-pill__text">{radio_text}</span>
                </div>
              )}

              <h1 className="hero-card__heading" style={{ whiteSpace: 'pre-line' }}>
                {heading.replace(/\\n/g, '\n').replace(/([a-zA-Z])\n/g, '$1 \n')}
              </h1>

              <p className="hero-card__body">
                {body.split(/\n|\\n/).map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}{i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>

              {/* CTA Buttons */}
              <div className="hero-card__ctas">
                {ctas?.length > 0 ? (
                  ctas.map((cta, i) => {
                    let href = cta.href || '#';
                    const labelLower = cta.label?.toLowerCase() || '';
                    if (labelLower.includes('care')) href = '/care';
                    else if (labelLower.includes('lifestyle')) href = '/lifestyle';
                    else if (labelLower.includes('about')) href = '/about';

                    return (
                      <Link key={i} href={href} className={`hero-btn hero-btn--${cta.style}`}>
                        {cta.label}
                        {(cta.style === 'accent' || cta.style === 'green') && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14m-7-7 7 7-7 7"/>
                          </svg>
                        )}
                      </Link>
                    );
                  })
                ) : (
                  /* Fallback hardcoded buttons if API has no ctas */
                  <>
                    <Link href="/care" className="hero-btn hero-btn--accent">
                      Explore Care Resources
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14m-7-7 7 7-7 7"/>
                      </svg>
                    </Link>
                    <Link href="/lifestyle" className="hero-btn hero-btn--green">
                      Explore Lifestyle
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14m-7-7 7 7-7 7"/>
                      </svg>
                    </Link>
                    <Link href="#demo" className="hero-btn hero-btn--outline-white">
                      Watch Demo
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* ── Bottom-Left Trust Bar ── */}
            <div className="hero-trust">
              {/* Award Logos */}
              <div className="hero-trust__awards">
                <img src="/images/samll1.jpg" alt="Award 1" className="award-logo" />
                <img src="/images/samll2.png" alt="Award 2" className="award-logo" />
              </div>

              {/* Star Rating */}
              {rating_text && (
                <div className="hero-trust__rating">
                  <div className="stars">★★★★★</div>
                  <span>{rating_text}</span>
                </div>
              )}


            </div>

            {/* ── Bottom-Right Floating Listen Button ── */}
            {floating_cta?.label && (
              <a href={floating_cta.href} className="listen-fab">
                <div className="listen-fab__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '2px' }}>
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                  </svg>
                  <span className="listen-fab__label">{floating_cta.label}</span>
                </div>
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
