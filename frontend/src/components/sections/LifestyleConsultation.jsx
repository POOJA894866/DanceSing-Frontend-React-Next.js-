'use client';

import React from 'react';

// Icons for audience cards
const HomeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const WorkplacesIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <rect x="3" y="14" width="18" height="4" rx="1"></rect>
  </svg>
);

const GroupsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <path d="M12 21v-2a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v2"></path>
    <circle cx="6" cy="7" r="4"></circle>
  </svg>
);

const getIcon = (iconName) => {
  switch (iconName) {
    case 'home': return <HomeIcon />;
    case 'workplace': return <WorkplacesIcon />;
    case 'groups': return <GroupsIcon />;
    default: return <HomeIcon />;
  }
};

const LifestyleConsultation = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'GET STARTED';
  const heading = data.heading || "Find the right Lifestyle plan for you";
  const body = data.body || "Whether you're joining as an individual, bringing Lifestyle to a workplace team, or rolling it out across a multi-site organisation — we'll help you find the right fit.";
  const image = data.image;
  const cta = data.cta || { label: 'Book a Consultation →', href: '#contact', style: 'primary' };

  const steps = data.steps?.length > 0 ? data.steps : [
    {
      number: '01',
      title: 'Tell Us About Your Goals',
      description: "Individual wellbeing, workplace health, community groups — we'll ask what you're hoping to achieve.",
    },
    {
      number: '02',
      title: 'We Walk You Through The Platform',
      description: 'A live overview of the six disciplines, the On Air radio, and the content most relevant to you or your group.',
    },
    {
      number: '03',
      title: 'We Recommend The Right Plan',
      description: "Individual, Team, or Organisation — we'll find the best option and answer every question before you commit.",
    },
  ];

  const audience_heading = data.audience_heading || 'Is Lifestyle right for you?';
  const audience_body = data.audience_body || 'danceSing Lifestyle is for anyone who wants accessible, high-quality wellness content — at home, at work, or in the community.';
  const audience_cta = data.audience_cta || { label: 'View Lifestyle Pricing →', href: '#pricing', style: 'outline' };

  const audience_cards = data.audience_cards?.length > 0 ? data.audience_cards : [
    {
      icon: 'home',
      title: 'Individuals At Home',
      description: 'Older adults looking to improve fitness, reduce stress, or simply enjoy something uplifting each day.',
    },
    {
      icon: 'workplace',
      title: 'Workplaces & Organisations',
      description: 'Teams looking to support staff wellbeing, reduce burnout, and build a healthier, more connected workplace.',
    },
    {
      icon: 'groups',
      title: 'Community Groups & Clubs',
      description: 'Regular groups at a single venue — from weekly fitness classes to social wellbeing gatherings.',
    },
  ];

  return (
    <section style={{ background: '#F8FAF9', padding: '96px 5%' }}>
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
            fontWeight: '600',
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
            fontWeight: '400',
            color: '#426E53',
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
                boxShadow: '0 4px 4px rgba(0,0,0,0.1)',
              }}>
                <span style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '40px',
                  fontWeight: '700',
                  color: '#9cb5a6', // Light green
                  lineHeight: '1',
                }}>
                  {step.number}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1a1f3c',
                    margin: '0 0 8px 0',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    fontFamily: 'Roboto, sans-serif',
                    color: '#334155',
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
              background: '#426E53',
              color: 'white',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = '#2d5a3d';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = '#426E53';
            }}
          >
            {cta.label}
          </a>
        </div>

        {/* Right Side: Image Placeholder */}
        <div style={{ width: '94%', height: '93%', minHeight: '500px', position: 'relative' }}>
          {image?.src || true ? (
            <img
              src={image?.src || '/images/lifecon.png'}
              alt={image?.alt || 'Consultation'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '24px',
                display: 'block',
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              minHeight: '500px',
              background: '#e0e8e3',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: '#426E53', fontFamily: 'Sora, sans-serif', opacity: 0.5 }}>Image placeholder</span>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Half: Audience */}
      <div style={{ maxWidth: '1400px', margin: '96px auto 0 auto' }}>
        <h2 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 'clamp(32px, 4vw, 44px)',
          fontWeight: '700',
          color: '#426E53',
          lineHeight: '1.15',
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}>
          {audience_heading}
        </h2>

        <p style={{
          fontSize: '16px',
          fontFamily: 'Roboto, sans-serif',
          color: '#111827',
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
              borderTop: '8px solid #426E53',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 7  px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ color: '#111827', marginBottom: '24px' }}>
                {getIcon(card.icon)}
              </div>
              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '18px',
                fontWeight: '700',
                color: '#111827',
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
              color: '#426E53',
              border: '1px solid #426E53',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#e6efe9';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {audience_cta.label}
          </a>
        )}
      </div>
      <style>{`
        @media (max-width: 900px) {
          section > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LifestyleConsultation;
