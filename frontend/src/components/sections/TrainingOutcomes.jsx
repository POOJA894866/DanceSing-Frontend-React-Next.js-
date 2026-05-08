'use client';

import React from 'react';
import Link from 'next/link';

/* ── Icon renderer ── */
const OutcomeIcon = ({ name }) => {
  const s = { width: 28, height: 28, color: '#1a5e7b' };
  switch (name) {
    case 'morale':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case 'burnout':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'development':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
          <path d="M7 8l3 3 5-5" />
        </svg>
      );
    case 'resident':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      );
    case 'impact':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <polyline points="7 13 10 10 13 12 16 8" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case 'culture':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    default:
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
};

const DEFAULT_CARDS = [
  {
    icon: 'morale',
    title: 'Improved Staff Morale',
    description: 'Staff who feel skilled and supported report higher job satisfaction — leading to measurable improvements in team retention and engagement.',
  },
  {
    icon: 'burnout',
    title: 'Reduced burnout & absenteeism',
    description: 'A 21% reduction in staff stress when structured wellness tools replace daily decision fatigue — with less time planning and more time caring.',
  },
  {
    icon: 'development',
    title: 'Professional development',
    description: 'The danceSing Level 1 Facilitation Certificate enhances staff credentials, supports career progression, and signals quality to families and regulators.',
  },
  {
    icon: 'resident',
    title: 'Better resident outcomes',
    description: 'Consistent, confident facilitation drives real improvements in resident mood, social connection, physical mobility, and cognitive engagement.',
  },
  {
    icon: 'impact',
    title: 'Evidenced impact',
    description: 'Regular data reports measure participation and outcomes — giving care managers the evidence they need for audits, quality reviews, and regulatory returns.',
  },
  {
    icon: 'culture',
    title: 'Lasting cultural change',
    description: "Beyond skills, training embeds a positive wellbeing culture — one that attracts good staff, reassures families, and makes your community a better place to live and work.",
  },
];

const DEFAULT_COMPLIANCE = {
  title: 'Supports CAPA & regulatory frameworks',
  bullet_1: 'Staff earn the danceSing Level 1 Facilitation Certificate',
  bullet_2: 'Audit-ready documentation',
};

const TrainingOutcomes = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'WHAT TRAINING DELIVERS';
  const heading = data.heading || 'Real outcomes for staff and residents';
  const body1 = data.body_1 || 'danceSing Training is built on the evidence that better-supported, more confident care teams deliver better outcomes for the residents they care for. The data backs this up consistently.';
  const body2 = data.body_2 || 'Training also directly supports regulatory compliance — helping care homes align with frameworks like CAPA and ensuring staff are audit-ready with enhanced professional credentials.';

  const compliance = (data.compliance_box && data.compliance_box.title)
    ? data.compliance_box
    : DEFAULT_COMPLIANCE;

  const cta1Label = data.cta_1_label || 'Book a Consultation →';
  const cta1Href = data.cta_1_href || '#consultation';
  const cta2Label = data.cta_2_label || 'View Training Price →';
  const cta2Href = data.cta_2_href || '#pricing';

  const hasValidCards = data.outcome_cards && data.outcome_cards.length > 0 && data.outcome_cards[0]?.title;
  const cards = hasValidCards ? data.outcome_cards : DEFAULT_CARDS;

  return (
    <section style={{
      background: '#fff',
      padding: '100px 0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: '80px',
        alignItems: 'start',
      }}>

        {/* ── LEFT COLUMN ── */}
        <div>

          {/* Tag */}
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

          {/* Heading */}
          <h2 style={{
            fontSize: 'clamp(30px, 3.5vw, 44px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '700',
            color: '#1A5E7A',
            lineHeight: '1.2',
            letterSpacing: '-0.5px',
            marginBottom: '28px',
          }}>
            {heading}
          </h2>

          {/* Body paragraphs */}
          <p style={{
            fontSize: '15px',
            fontFamily: 'Roboto, sans-serif',
            color: '#475569',
            lineHeight: '1.7',
            marginBottom: '20px',
          }}>
            {body1}
          </p>
          <p style={{
            fontSize: '15px',
            fontFamily: 'Roboto, sans-serif',
            color: '#475569',
            lineHeight: '1.7',
            marginBottom: '32px',
          }}>
            {body2}
          </p>

          {/* Compliance box */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px 20px 20px 16px',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start',
            marginBottom: '36px',
          }}>
            {/* Shield icon */}
            <div style={{ color: '#1a5e7b', flexShrink: 0, marginTop: '2px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p style={{
                fontSize: '14px',
                fontFamily: 'Sora, sans-serif',
                fontWeight: '700',
                color: '#02020a',
                marginBottom: '10px',
                lineHeight: '1.4',
              }}>
                {compliance.title}
              </p>
              {[compliance.bullet_1, compliance.bullet_2].filter(Boolean).map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#1a5e7b', fontSize: '13px', marginTop: '1px' }}>·</span>
                  <span style={{ fontSize: '13px', fontFamily: 'Roboto, sans-serif', color: '#475569', lineHeight: '1.5' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href={cta1Href} style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '14px',
              fontFamily: 'Roboto, sans-serif',
              textDecoration: 'none',
              background: '#1a5e7b',
              color: 'white',
              border: '1.5px solid #1a5e7b',
              transition: 'background 0.2s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#13475c'}
              onMouseLeave={e => e.currentTarget.style.background = '#1a5e7b'}
            >
              {cta1Label}
            </Link>
            <Link href={cta2Href} style={{
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
              cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,94,123,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {cta2Label}
            </Link>
          </div>
        </div>

        {/* ── RIGHT COLUMN — 2-column card grid ── */}
        <div style={{
          position: 'sticky',
          top: '120px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}>
          {cards.map((card, idx) => (
            <div key={idx} style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              transition: 'box-shadow 0.2s, transform 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,94,123,0.10)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Icon */}
              <div style={{ color: '#1a5e7b' }}>
                <OutcomeIcon name={card.icon} />
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '17px',
                fontFamily: 'Sora, sans-serif',
                fontWeight: '700',
                color: '#1a5e7b',
                lineHeight: '1.35',
                margin: 0,
              }}>
                {card.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                fontFamily: 'Roboto, sans-serif',
                color: '#475569',
                lineHeight: '1.65',
                margin: 0,
              }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrainingOutcomes;
