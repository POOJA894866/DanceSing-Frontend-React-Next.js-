'use client';

import React from 'react';
import Link from 'next/link';

/* ── Audience Icons ── */
const AudienceIcon = ({ name }) => {
  const s = { width: 32, height: 32, color: '#02020a' };
  switch (name) {
    case 'nurse':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          {/* Hat / Cross detail */}
          <path d="M7 4h4" />
          <path d="M9 2v4" />
        </svg>
      );
    case 'activity':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
          {/* Lanyard/Whistle detail */}
          <path d="M12 11v4" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      );
    case 'manager':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
          {/* Badge detail */}
          <rect x="9" y="14" width="6" height="4" rx="1" />
        </svg>
      );
    default:
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
  }
};

const DEFAULT_STEPS = [
  {
    number: '01',
    title: 'Tell Us About Your Goals',
    description: 'We\'ll ask about your care setting, team size, current challenges, and what you\'re hoping to achieve.',
  },
  {
    number: '02',
    title: 'We Walk You Through The Programme',
    description: 'A tailored overview of the training journey, certification, and ongoing support most relevant to your team.',
  },
  {
    number: '03',
    title: 'We Recommend The Right Plan',
    description: 'We\'ll outline the best approach for your organisation — and answer every question before you commit to anything.',
  },
];

const DEFAULT_AUDIENCE_CARDS = [
  {
    icon: 'nurse',
    title: 'Care Home Staff & Caregivers',
    description: 'Front-line care workers who lead or support daily activity sessions with residents.',
  },
  {
    icon: 'activity',
    title: 'Activity Staff & Coordinator',
    description: 'Those responsible for planning and running the daily wellbeing programme across a single site or multiple locations.',
  },
  {
    icon: 'manager',
    title: 'Care Managers & Team Leaders',
    description: 'Leaders who want to evidence outcomes, support staff development, and raise care standards across their community.',
  },
];

const TrainingConsultation = ({ data }) => {
  if (!data) return null;

  // Top Section Data
  const tag     = data.tag     || 'GET STARTED';
  const heading = data.heading || "Let's talk about your team";
  const body    = data.body    || 'Every care setting is different. Our team will listen to your challenges and show you exactly how danceSing Training can build capability, reduce pressure, and raise standards across your community.';
  
  const hasValidSteps = data.steps && data.steps.length > 0 && data.steps[0]?.title;
  const steps = hasValidSteps ? data.steps : DEFAULT_STEPS;

  const ctaLabel = data.cta?.label || 'Book a Consultation →';
  const ctaHref  = data.cta?.link  || '#consultation';
  const image    = data.image      || '/images/lifecon.png';

  // Bottom Section Data
  const audienceHeading = data.audience_heading || 'Who is this Right for?';
  const audienceBody    = data.audience_body    || 'danceSing Training is built for anyone responsible for delivering or managing daily engagement in a care setting.';
  
  const hasValidAudience = data.audience_cards && data.audience_cards.length > 0 && data.audience_cards[0]?.title;
  const audienceCards = hasValidAudience ? data.audience_cards : DEFAULT_AUDIENCE_CARDS;

  const audCtaLabel = data.audience_cta?.label || 'View Lifestyle Pricing →';
  const audCtaHref  = data.audience_cta?.link  || '#pricing';

  return (
    <section style={{
      background: '#f8fafc', // light gray background from screenshot
      padding: '100px 0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── TOP SECTION: "Let's talk about your team" ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          marginBottom: '120px'
        }}>
          {/* Left: Text & Steps */}
          <div>
            <span style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '700',
              fontFamily: 'Roboto, sans-serif',
              color: '#64748b',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}>
              {tag}
            </span>

            <h2 style={{
              fontSize: 'clamp(36px, 4vw, 52px)',
              fontFamily: 'Sora, sans-serif',
              fontWeight: '700',
              color: '#1a5e7b',
              lineHeight: '1.1',
              letterSpacing: '-1px',
              marginBottom: '24px',
            }}>
              {heading}
            </h2>

            <p style={{
              fontSize: '15px',
              fontFamily: 'Roboto, sans-serif',
              color: '#1e293b',
              lineHeight: '1.7',
              marginBottom: '40px',
            }}>
              {body}
            </p>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {steps.map((step, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    fontSize: '36px',
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: '700',
                    color: '#94a3b8',
                    lineHeight: '1'
                  }}>
                    {step.number}
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '16px',
                      fontFamily: 'Sora, sans-serif',
                      fontWeight: '700',
                      color: '#02020a',
                      marginBottom: '8px',
                    }}>
                      {step.title}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      fontFamily: 'Roboto, sans-serif',
                      color: '#475569',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href={ctaHref} style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 28px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '15px',
              fontFamily: 'Roboto, sans-serif',
              textDecoration: 'none',
              background: '#1a5e7b',
              color: 'white',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#13475c'}
              onMouseLeave={e => e.currentTarget.style.background = '#1a5e7b'}
            >
              {ctaLabel}
            </Link>
          </div>

          {/* Right: Image */}
          <div>
            <img 
              src={image} 
              alt="Care team training" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '24px',
                minHeight: '600px',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        </div>

        {/* ── BOTTOM SECTION: "Who is this Right for?" ── */}
        <div>
          <h2 style={{
            fontSize: 'clamp(32px, 3.5vw, 44px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '700',
            color: '#1a5e7b',
            lineHeight: '1.2',
            letterSpacing: '-0.5px',
            marginBottom: '20px',
            maxWidth: '600px'
          }}>
            {audienceHeading}
          </h2>
          <p style={{
            fontSize: '15px',
            fontFamily: 'Roboto, sans-serif',
            color: '#1e293b',
            lineHeight: '1.6',
            marginBottom: '40px',
            maxWidth: '600px'
          }}>
            {audienceBody}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {audienceCards.map((card, idx) => (
              <div key={idx} style={{
                background: 'white',
                borderTop: '6px solid #1a5e7b',
                borderRadius: '12px',
                padding: '32px 24px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <AudienceIcon name={card.icon} />
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '700',
                  color: '#02020a',
                  marginBottom: '12px',
                  lineHeight: '1.3'
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  fontFamily: 'Roboto, sans-serif',
                  color: '#475569',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <Link href={audCtaHref} style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '14px',
            fontFamily: 'Roboto, sans-serif',
            textDecoration: 'none',
            background: 'transparent',
            color: '#1a5e7b',
            border: '1.5px solid #1a5e7b',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,94,123,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {audCtaLabel}
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TrainingConsultation;
