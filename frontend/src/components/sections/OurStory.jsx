'use client';
import React from 'react';

const OurStory = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'OUR STORY';
  const heading = data.heading || 'A Simple Idea That Grew Into Something Much Bigger';
  const intro = data.intro || 'danceSing began with a conviction: that older adults deserve more than passive entertainment — they deserve daily engagement that genuinely transforms their health and happiness.';
  const body = data.body || 'Founded with a passion for creating meaningful, engaging, and evidence-based resources, we set out to build a platform rooted in research and driven by a deep commitment to the health and happiness of our communities. What started as a vision for better care activities has grown into a comprehensive platform serving over 200 care communities, thousands of residents, and independent adults across the UK — with international expansion now under way.\n\nEvery programme we build — from chair-based movement to our 24/7 wellbeing radio — is designed with the same care and purpose that started it all.';
  const image = data.image;
  const ctas = data.ctas && data.ctas.length > 0 ? data.ctas : [
    { label: 'Explore our Programmes →', href: '#programs', style: 'primary' },
    { label: 'Learn more', href: '#more', style: 'outline' }
  ];

  const btnStyle = (style) => {
    const base = {
      padding: '9px 15px',
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
    if (style === 'primary') return { ...base, background: '#4956A1', color: 'white' };
    if (style === 'outline') return { ...base, background: 'transparent', border: '1.5px solid #4b639f', color: '#4b639f' };
    return { ...base, background: '#4b639f', color: 'white' };
  };

  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(e => console.log("Video autoplay prevented:", e));
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section style={{ background: '#f9fafb', padding: '80px 5%', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{
        maxWidth: '1250px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '45% 1fr',
        gap: '60px',
        alignItems: 'flex-start'
      }}>
        {/* Left: Video */}
        <div style={{
          width: '500px',
          height: '660px',
          borderRadius: '24px',
          background: '#e2e8f0',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <video
            ref={videoRef}
            src="/images/dancesing_video.mp4"
            playsInline
            loop
            controls
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Right: Content */}
        <div style={{ marginTop: '80px', marginBottom: '12px' }}>
          <span style={{
            fontSize: '12px',
            fontFamily: 'Roboto',
            fontWeight: '500',
            color: 'black',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '20px'
          }}>
            {tag}
          </span>

          <h2 style={{
            fontSize: 'clamp(20px, 3.5vw, 35px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '400',
            color: '#283466',
            lineHeight: '1.2',
            marginBottom: '24px'
          }}>
            {heading}
          </h2>

          <p style={{
            fontSize: '15px',
            fontWeight: '500',
            fontFamily: 'Roboto',
            fontStyle: 'italic',
            color: '#02020A',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            {intro}
          </p>

          <div style={{
            fontSize: '15px',
            textAlign: 'left',
            color: '#000000',
            lineHeight: '1.3',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontWeight: '300',
          }}>
            {body.split('\n').map((paragraph, index) => (
              <p key={index} style={{ margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {ctas.map((cta, i) => (
              <a key={i} href={cta.href} style={btnStyle(cta.style)}>
                {cta.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurStory;
