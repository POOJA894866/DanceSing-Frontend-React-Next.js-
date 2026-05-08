'use client';

import React from 'react';
import Link from 'next/link';

const TrainingJourney = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'THE TRAINING JOURNEY';
  const heading = data.heading || 'A 12-month programme built for lasting impact';
  const body = data.body || "danceSing Training isn't a one-day event. It's a structured, year-long partnership that builds genuine capability in your team and delivers measurable improvements in resident outcomes.\n\nDelivered flexibly around your team's availability — predominantly online, with in-person options — our programme meets you where you are and grows with you over time.";
  
  const certificate = data.certificate || {
    title: 'danceSing Level 1 Facilitation Certificate',
    description: 'Awarded on completion • Enhances professional credentials • Supports regulatory compliance'
  };

  const steps = data.steps?.length > 0 ? data.steps : [
    { number: '01', title: 'Access & Technical Setup', description: 'Step-by-step onboarding covers device setup, connectors, and any technical configuration needed. Your team is confident and ready from day one.', duration: 'WEEK 1-2' },
    { number: '02', title: 'Facilitation Foundation Training', description: 'Online or in-person sessions introduce the platform, the evidence behind it, and the core facilitation skills needed to run engaging, person-centred sessions with confidence.', duration: 'MONTH 1' },
    { number: '03', title: 'Engagement Coaching & Check-ins', description: "Dedicated coaching sessions help staff tailor the programme to residents' abilities, troubleshoot challenges, and build consistency in delivery across the team.", duration: 'MONTHS 2-6' },
    { number: '04', title: 'Data Review & Impact Reporting', description: 'Regular reports with data on staff participation and resident engagement allow care managers to evidence the impact of the programme and align with regulatory requirements.', duration: 'QUARTERLY' },
    { number: '05', title: 'Certification & Ongoing Partnership', description: 'Staff earn the danceSing Level 1 Facilitation Certificate. The relationship continues — new resources, updated training, and long-term support to keep your programme thriving.', duration: 'MONTH 12+' }
  ];

  const ctas = data.ctas?.length > 0 ? data.ctas : [
    { label: 'Start your Journey →', href: '#consultation', style: 'primary' },
    { label: 'Talk to Our Team', href: '#contact', style: 'outline' }
  ];

  return (
    <section style={{
      background: 'white',
      padding: '100px 0',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: '100px',
        alignItems: 'start'
      }}>
        
        {/* Left Column - Content & Certificate */}
        <div>
          <span style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '700',
            fontFamily: 'Roboto, sans-serif',
            color: '#64748b',
            letterSpacing: '0.1em',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            {tag}
          </span>

          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '700',
            color: '#1a5e7b', // Teal
            lineHeight: '1.2',
            marginBottom: '32px',
            letterSpacing: '-1px'
          }}>
            {heading}
          </h2>

          <div style={{
            fontSize: '15px',
            fontFamily: 'Roboto, sans-serif',
            color: '#1e293b',
            lineHeight: '1.7',
            marginBottom: '40px'
          }}>
            {body.split('\n').map((para, i) => (
              <p key={i} style={{ marginBottom: i < body.split('\n').length - 1 ? '20px' : '0' }}>
                {para}
              </p>
            ))}
          </div>

          {/* Certificate Box */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            marginBottom: '40px'
          }}>
            <div style={{ color: '#1a5e7b', flexShrink: 0, marginTop: '2px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div>
              <h4 style={{
                fontSize: '15px',
                fontFamily: 'Sora, sans-serif',
                fontWeight: '700',
                color: '#02020a',
                marginBottom: '8px'
              }}>
                {certificate.title}
              </h4>
              <p style={{
                fontSize: '13px',
                fontFamily: 'Roboto, sans-serif',
                color: '#475569',
                lineHeight: '1.5',
                margin: 0
              }}>
                {certificate.description}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {ctas.map((cta, i) => {
              const isPrimary = cta.style === 'primary';
              return (
                <Link key={i} href={cta.href} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '14px',
                  fontFamily: 'Roboto, sans-serif',
                  textDecoration: 'none',
                  background: isPrimary ? '#1a5e7b' : 'transparent',
                  color: isPrimary ? 'white' : '#1a5e7b',
                  border: `1.5px solid ${isPrimary ? '#1a5e7b' : '#1a5e7b'}`,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  if (!isPrimary) {
                    e.currentTarget.style.background = 'rgba(26, 94, 123, 0.05)';
                  } else {
                    e.currentTarget.style.background = '#13475c';
                    e.currentTarget.style.borderColor = '#13475c';
                  }
                }}
                onMouseLeave={e => {
                  if (!isPrimary) {
                    e.currentTarget.style.background = 'transparent';
                  } else {
                    e.currentTarget.style.background = '#1a5e7b';
                    e.currentTarget.style.borderColor = '#1a5e7b';
                  }
                }}>
                  {cta.label}
                </Link>
              );
            })}
          </div>

        </div>

        {/* Right Column - Steps List */}
        <div style={{ position: 'sticky', top: '120px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '30px',
              paddingBottom: '40px',
              paddingTop: i > 0 ? '40px' : '0',
              borderBottom: i < steps.length - 1 ? '1px solid #e2e8f0' : 'none'
            }}>
              {/* Giant Number */}
              <div style={{
                fontSize: '64px',
                fontFamily: 'Sora, sans-serif',
                fontWeight: '800',
                color: '#a4c2d1', // Light grayish blue
                lineHeight: '1',
                flexShrink: 0,
                width: '80px'
              }}>
                {step.number}
              </div>

              {/* Step Content */}
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '700',
                  color: '#1a5e7b',
                  marginBottom: '12px'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  fontFamily: 'Roboto, sans-serif',
                  color: '#475569',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  {step.description}
                </p>
                {step.duration && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    fontFamily: 'Roboto, sans-serif',
                    color: '#1a5e7b',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}>
                    {step.duration}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrainingJourney;
