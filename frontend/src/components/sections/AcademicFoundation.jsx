'use client';
import React from 'react';

const AcademicFoundation = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'ACADEMIC FOUNDATION';
  const heading = data.heading || 'Five Years Of Measurable Difference';
  const body = data.body || 'We don\'t ask you to take our word for it. Every programme on danceSing has been evaluated using recognised research methodologies, in partnership with three of the UK\'s leading academic institutions. danceSing enhances adult care with evidence-based programmes that improve health and well-being in 12 weeks.\n\nResults are consistent, reproducible, and independently validated — giving our care community partners the confidence that what they are implementing is genuinely good for their residents.';
  const ctas = data.ctas?.length > 0 ? data.ctas : [
    { label: 'Explore our Programmes →', href: '#programs', style: 'primary' },
    { label: 'Talk to Our Team', href: '#contact', style: 'outline' },
  ];
  const partners = data.partners?.length > 0 ? data.partners : [
    {
      number: '01',
      name: 'University of Stirling',
      description: 'A world-leading authority in ageing and dementia research. Our primary research partner for over five years, evaluating danceSing programmes within residential care settings across Scotland and beyond.',
      tags: ['5+ YEAR PARTNERSHIP', 'DEMENTIA & AGEING RESEARCH'],
    },
    {
      number: '02',
      name: 'Glasgow University',
      description: 'Collaborating on health sciences and wellbeing research, providing rigorous evaluation of the physical and psychological outcomes of our movement and mindfulness programmes.',
      tags: ['HEALTH SCIENCE', 'WELLBEING OUTCOMES'],
    },
    {
      number: '03',
      name: 'University of Plymouth',
      description: 'Collaborating on health sciences and wellbeing research, providing rigorous evaluation of the physical and psychological outcomes of our movement and mindfulness programmes.',
      tags: ['COMMUNITY CARE', 'MOVEMENT SCIENCE'],
    },
  ];

  const btnStyle = (style) => {
    const base = {
      padding: '13px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '15px',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'opacity 0.2s ease',
      whiteSpace: 'nowrap',
    };
    if (style === 'primary') return { ...base, background: '#283466', color: 'white' };
    if (style === 'outline') return { ...base, background: 'transparent', border: '1.5px solid #283466', color: '#283466' };
    return { ...base, background: '#283466', color: 'white' };
  };

  return (
    <section style={{
      background: '#f4f6fb',
      padding: '90px 5%',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        maxWidth: '1290px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '44% 1fr',
        gap: '80px',
        alignItems: 'flex-start',
      }}>

        {/* ── Left: Text Content ── */}
        <div style={{ paddingTop: '8px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: '400',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'black',
            display: 'block',
            marginBottom: '20px',
          }}>
            {tag}
          </span>

          <h2 style={{
            fontSize: 'clamp(28px, 3.6vw, 45px)',
            textAlign: 'left',
            width: '120%',
            flexDirection: 'column',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '50',
            color: '#283466',
            lineHeight: '1.1',
            marginBottom: '25px',
          }}>
            {heading}
          </h2>

          <div style={{ marginBottom: '40px' }}>
            {body.split('\n').map((para, i) => (
              <p key={i} style={{
                fontSize: '15px',
                color: 'black',
                lineHeight: '1.75',
                margin: i > 0 ? '16px 0 0' : '0',
              }}>
                {para}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {ctas.map((cta, i) => (
              <a key={i} href={cta.href} style={btnStyle(cta.style)}>
                {cta.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Research Partners ── */}
        <div>
          {partners.map((partner, i) => (
            <div key={i} style={{
              paddingBottom: '32px',
              marginBottom: i < partners.length - 1 ? '32px' : 0,
              borderBottom: i < partners.length - 1 ? '1px solid #d1d9e8' : 'none',
              display: 'grid',
              gridTemplateColumns: '56px 1fr',
              gap: '20px',
            }}>
              {/* Number */}
              <span style={{
                fontSize: '48px',
                fontFamily: 'Sora, sans-serif',
                fontWeight: '500',
                color: '#4956A166',
                lineHeight: '1',
                paddingTop: '1px',
              }}>
                {partner.number}
              </span>

              {/* Content */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '300',
                  color: '#283466',
                  marginBottom: '10px',
                }}>
                  {partner.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: '300',
                  color: 'black',
                  lineHeight: '1.7',
                  marginBottom: '14px',
                }}>
                  {partner.description}
                </p>
                {/* Tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'right' }}>
                  {partner.tags.map((tag, ti) => (
                    <React.Fragment key={ti}>
                      <span style={{
                        fontSize: '10.5px',
                        fontWeight: '700',
                        color: 'black',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}>
                        {tag}
                      </span>
                      {ti < partner.tags.length - 1 && (
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AcademicFoundation;
