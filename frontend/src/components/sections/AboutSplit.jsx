import React from 'react';
import Button from '../common/Button';

/**
 * AboutSplit — Section 4
 * 2-col split: text + stats one side, image other side.
 * data: { tag, heading, body, imagePosition, image, stats[], ctas[] }
 */
const AboutSplit = ({ data }) => {
  if (!data) return null;
  const { tag, heading, body, imagePosition, image, stats, ctas } = data;
  const reverse = imagePosition === 'left';

  return (
    <section className={`section about bg-${data.background || 'white'}`} id={data.id || 'about'} style={{ padding: '80px 0', background: data.background === 'off-white' ? '#f8fafc' : data.background === 'dark' ? '#1e2445' : '#ffffff' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1.1fr 1.1fr', gap: '100px', alignItems: 'start' }}>

        {/* Left Column */}
        <div className="split-grid__text">
          {tag && (
            <p style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.15em', color: '#64748b', textTransform: 'uppercase', marginBottom: '16px' }}>
              {tag.includes('EXCELLENCE') ? 'ACADEMIC PARTNERSHIP' : tag}
            </p>
          )}

          <h2 style={{ fontSize: '48px', alignSelf: 'stretch', fontWeight: '700', color: '#283466', marginBottom: '28px', lineHeight: '1.15', letterSpacing: '-1px', fontFamily: 'Sora' }}>
            {heading || 'Backed by Academic Excellence'}
          </h2>

          <p style={{ fontSize: '17px', color: '#475569', lineHeight: '1.7', marginBottom: '20px' }}>
            {body || "We're proud to collaborate with one of the UK's leading research institutions to ensure our programmes are grounded in robust evidence and real-world impact."}
          </p>

          {tag?.toLowerCase().includes('academic') || heading?.toLowerCase().includes('academic') ? (
            <>
              <p style={{ fontSize: '17px', color: '#475569', lineHeight: '1.7', marginBottom: '36px' }}>
                For over five years, danceSing has worked in partnership with the <strong>University of Stirling</strong> — a world-leading authority in ageing and dementia research. Our resources are rigorously evaluated within care communities using recognised research methodologies, ensuring they meet high academic and ethical standards.
              </p>

              {/* Partnership Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f1f5f9', padding: '16px 24px', borderRadius: '16px', marginBottom: '40px' }}>
                <div style={{ color: '#1e2445', background: 'white', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '16px', color: '#1e2445' }}>University of Stirling Partnership</strong>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>World-leading authority in ageing & dementia research · 5+ years</span>
                </div>
              </div>
            </>
          ) : null}

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {ctas?.length > 0 ? (
              <>
                {ctas.map((cta, i) => {
                  const isPrimary = cta.style === 'primary' || cta.style === 'accent';
                  return (
                    <a key={i} href={cta.href || '#'} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      background: isPrimary ? '#993d3d' : 'white',
                      color: isPrimary ? 'white' : '#1e2445',
                      border: isPrimary ? 'none' : '1.5px solid #1e2445',
                      padding: '14px 32px',
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '16px',
                      textDecoration: 'none',
                      boxShadow: isPrimary ? '0 10px 20px rgba(153,61,61,0.15)' : 'none',
                      transition: 'all 0.2s'
                    }}>
                      {isPrimary ? 'Explore Care Plans →' : cta.label}
                    </a>
                  )
                })}
                {/* Statically add the Read the Research button if the mapped data only provided one button */}
                {ctas.length === 1 && (
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'white', color: '#1e2445', border: '1.5px solid #1e2445', padding: '14px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', textDecoration: 'none', transition: 'all 0.2s' }}>
                    Read the Research
                  </a>
                )}
              </>
            ) : (
              <>
                <a href="#" style={{ background: '#993d3d', color: 'white', padding: '14px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 20px rgba(153,61,61,0.15)' }}>
                  Explore Care Plans →
                </a>
                <a href="#" style={{ background: 'white', color: '#1e2445', border: '1.5px solid #1e2445', padding: '14px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', textDecoration: 'none' }}>
                  Read the Research
                </a>
              </>
            )}
          </div>
        </div>

        {/* Right Column (Grid or Image) */}
        <div>
          {tag?.toLowerCase().includes('academic') || heading?.toLowerCase().includes('academic') || (stats && stats.length > 0) ? (
            <div>
              <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.15em', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '24px' }}>
                PROVEN IMPACT DATA
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontFamily: 'Sora' }}>
                {(tag?.toLowerCase().includes('academic') || heading?.toLowerCase().includes('academic') ? [
                  { label: 'Depression in participants', value: '49%', down: true },
                  { label: 'Anxiety reported', value: '34%', down: true },
                  { label: 'Loneliness experienced', value: '29%', down: true },
                  { label: 'Fear of falling', value: '34%', down: true },
                  { label: 'Sleep satisfaction', value: '25%', up: true },
                  { label: 'DHEA for immunity', value: '62%', up: true },
                  { label: 'Staff stress levels', value: '21%', down: true },
                  { label: 'Staff job satisfaction', value: '12%', up: true },
                ] : (stats && stats.length > 0 ? stats : [])).map((stat, i) => {
                  const isDown = stat.down || stat.value.includes('↓') || ['depression', 'anxiety', 'loneliness', 'fear', 'stress'].some(k => stat.label.toLowerCase().includes(k));
                  const cleanValue = stat.value.replace(/[↑↓]/g, '').trim();

                  return (
                    <div key={i} style={{ background: '#e9eff3ff', padding: '14px 20px', borderRadius: '16px', border: '1px solid #f1f5f9', transition: 'all 0.2s' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px', fontFamily: 'Roboto, sans-serif' }}>{stat.label}</span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontSize: '28px', fontWeight: '800', color: '#1e2445' }}>{cleanValue}</span>
                        <span style={{ fontSize: '20px', fontWeight: '800', color: '#1e2445' }}>{isDown ? '↓' : '↑'}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            image?.src && (
              <div style={{ borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '8px solid white' }}>
                <img src={image.src} alt={image.alt || heading} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            )
          )}
        </div>

      </div>
    </section>
  );
};

export default AboutSplit;
