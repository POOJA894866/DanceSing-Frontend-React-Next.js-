'use client';

import React from 'react';

const HomeHeartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <path d="M9 22V12h6v10"></path>
    <path d="M10 9.5a2.5 2.5 0 0 0 4 0c1.5-1.5 1.5-4 0-4-1.5 0-4 4-4 4z"></path>
  </svg>
);

const HospitalIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="10" width="10" height="12" rx="1" ry="1"></rect>
    <rect x="13" y="14" width="8" height="8" rx="1" ry="1"></rect>
    <path d="M8 3v4"></path>
    <path d="M6 5h4"></path>
    <path d="M15 11h4"></path>
  </svg>
);

const ClipboardHeartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    <path d="M9 13.5a2.5 2.5 0 0 0 6 0c0-1.5-3-4-3-4s-3 2.5-3 4z"></path>
  </svg>
);

const getIcon = (iconName) => {
  switch (iconName) {
    case 'home-heart': return <HomeHeartIcon />;
    case 'hospital': return <HospitalIcon />;
    case 'clipboard-heart': return <ClipboardHeartIcon />;
    default: return <HomeHeartIcon />;
  }
};

const CareConsultation = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'BOOK A CONSULTATION';
  const heading = data.heading || "Let's talk about your care community";
  const body = data.body || 'Every care setting is different. Our team will take the time to understand your community, your residents, and your team — and show you exactly how danceSing fits your needs.';
  const image = data.image;
  const cta = data.cta || { label: 'Book a Consultation →', href: '#contact', style: 'primary' };

  const steps = data.steps?.length > 0 ? data.steps : [
    {
      number: '01',
      title: 'Tell Us About Your Community',
      description: "We'll ask about your setting, your residents, and what you're currently doing for daily engagement.",
    },
    {
      number: '02',
      title: 'We Walk You Through The Platform',
      description: 'A live, tailored walkthrough of the resources, radio, and tools most relevant to your care setting.',
    },
    {
      number: '03',
      title: 'We Recommend The Right Plan',
      description: "We'll suggest the Individual, Team, or Organisation plan that fits — and answer every question you have.",
    },
  ];

  const audience_heading = data.audience_heading || 'Who is this right for?';
  const audience_body = data.audience_body || 'danceSing Care is designed for every setting where older adults need daily engagement and wellbeing support.';
  const audience_cta = data.audience_cta || { label: 'View Care Pricing →', href: '#pricing', style: 'outline' };

  const audience_cards = data.audience_cards?.length > 0 ? data.audience_cards : [
    {
      icon: 'home-heart',
      title: 'Care Home & Residential Facilities',
      description: 'Full-time residential care, assisted living, dementia units, and nursing homes of any size.',
    },
    {
      icon: 'hospital',
      title: 'Hospital Trusts & NHS Wards',
      description: 'Older adult wards, rehabilitation units, and community health settings serving senior patients.',
    },
    {
      icon: 'clipboard-heart',
      title: 'Multi-Site Organizations',
      description: 'National and regional care providers, local councils, charities, and adult social care networks.',
    },
  ];

  return (
    <section style={{ background: '#F6F8F9', padding: '96px 5%' }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'center',
      }}>

        {/* Left Side: Content and Steps */}
        <div>
          <span style={{
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'black',
            display: 'block',
            marginBottom: '20px',
            fontFamily: 'Roboto, sans-serif',
          }}>
            {tag}
          </span>

          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontWeight: '700',
            color: '#964B4B',
            lineHeight: '1.15',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            {heading}
          </h2>

          <p style={{
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            color: 'black',
            lineHeight: '1.7',
            marginBottom: '40px',
          }}>
            {body}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px 32px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px',
                boxShadow: '0 4px 0px rgba(0,0,0,0.1)',
              }}>
                <span style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '40px',
                  fontWeight: '700',
                  color: '#d4b4b4', // Muted red/brown matching the design
                  lineHeight: '1',
                }}>
                  {step.number}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1a1f3c',
                    margin: '0 0 8px 0',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    fontFamily: 'Roboto, sans-serif',
                    color: '#64748b',
                    margin: 0,
                    lineHeight: '1.6',
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={cta.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 28px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none',
              fontFamily: 'Roboto, sans-serif',
              transition: 'all 0.25s ease',
              background: '#964B4B',
              color: 'white',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = '#7a3c3c';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = '#964B4B';
            }}
          >
            {cta.label}
          </a>
        </div>

        {/* Right Side: Image Placeholder */}
        <div style={{ width: '96%', height: '91%', minHeight: '500px', position: 'relative' }}>
          <img
            src={image?.src || '/images/cons.png'}
            alt={image?.alt || 'Consultation'}
            style={{
              width: '98%',
              height: '109%',
              objectFit: 'cover',
              borderRadius: '24px',
              display: 'block',
            }}
          />
        </div>

      </div>

      {/* Bottom Half: Audience */}
      <div style={{ maxWidth: '1300px', margin: '96px auto 0 auto' }}>
        <h2 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 'clamp(32px, 4vw, 44px)',
          fontWeight: '500',
          color: '#964B4B',
          lineHeight: '1.15',
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}>
          {audience_heading}
        </h2>

        <p style={{
          fontSize: '16px',
          fontFamily: 'Roboto, sans-serif',
          color: '#1a1f3c',
          lineHeight: '1.6',
          marginBottom: '48px',
          maxWidth: '600px',
        }}>
          {audience_body}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}>
          {audience_cards.map((card, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '32px',
              borderTop: '8px solid #964B4B',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
              }}
            >
              <div style={{ color: '#1a1f3c', marginBottom: '24px' }}>
                {getIcon(card.icon)}
              </div>
              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '18px',
                fontWeight: '700',
                color: '#1a1f3c',
                margin: '0 0 16px 0',
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '14px',
                fontFamily: 'Roboto, sans-serif',
                color: '#334155',
                margin: 0,
                lineHeight: '1.6',
              }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {audience_cta && (
          <a
            href={audience_cta.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 24px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none',
              fontFamily: 'Roboto, sans-serif',
              transition: 'all 0.25s ease',
              background: 'transparent',
              color: '#964B4B',
              border: '2px solid #964B4B',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = '#fff5f5';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {audience_cta.label}
          </a>
        )}
      </div>
    </section>
  );
};

export default CareConsultation;
