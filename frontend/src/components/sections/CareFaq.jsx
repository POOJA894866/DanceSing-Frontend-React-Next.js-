'use client';

import React, { useState } from 'react';

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CareFaq = ({ data }) => {
  const [openIndexes, setOpenIndexes] = useState({});

  const toggleIndex = (i) => {
    setOpenIndexes(prev => ({
      ...prev,
      [i]: !prev[i]
    }));
  };

  if (!data) return null;

  const tag = data.tag || 'SUPPORT';
  const heading = data.heading || 'Everything you need to know about Care';
  const subtitle = data.subtitle || 'Answers to the questions care managers, activities coordinators, and team leaders ask us most before getting started.';
  const support_box_text = data.support_box_text || "Can't find what you're looking for? Our team responds within 48 hours.";
  const support_email = data.support_email || 'support@dancesing.online';

  const items = data.items?.length > 0 ? data.items : [
    {
      question: 'What does danceSing Care actually include?',
      answer: 'danceSing Care includes a comprehensive library of music sessions, chair-based movement classes, mindfulness practices, and dementia-inclusive activities — all designed specifically for older adults. Team and Organisation plans also include access to the danceSing On Air 24/7 wellbeing radio, facilitation guides, staff onboarding materials, and usage reporting.',
    },
    {
      question: 'Do residents need any special equipment or technology?',
      answer: 'No specialist equipment is needed. All you need is a screen (TV, tablet, or laptop) and an internet connection. Sessions are designed to be easy for staff to run without any technical expertise.',
    },
    {
      question: 'Is danceSing suitable for residents living with dementia?',
      answer: "Yes — dementia-inclusive design is central to every danceSing Care programme. Sessions use familiar music, simple repetitive movements, and sensory engagement to reach residents at any stage of cognitive decline. The format is calm, non-pressured, and designed to meet residents where they are. Our programmes are co-designed with specialists in dementia care and music therapy.",
    },
    {
      question: "What's the difference between Individual, Team, and Organisation plans?",
      answer: 'Individual plans are for solo practitioners. Team plans support up to 10 staff members at a single location. Organisation plans are for multi-site providers and include centralised administration, custom reporting, and dedicated support.',
    },
    {
      question: 'Can I share my account with colleagues?',
      answer: "Individual accounts are strictly for personal use and cannot be shared. If you're leading sessions with a team or at a care home, you'll need a Team or Organisation plan. These allow unlimited logins for all team members at your site, including concurrent streaming — so multiple sessions can run at the same time across different rooms or wards.",
    },
    {
      question: 'How quickly will we see results?',
      answer: 'Many care homes report noticeable improvements in resident mood and engagement within the first 2–4 weeks. Our University of Stirling research shows measurable clinical outcomes — including reductions in depression and anxiety — within 12 weeks of consistent use.',
    },
    {
      question: 'Is there a free trial available?',
      answer: "Yes — all plans include a free trial period so you can explore the platform, run a few sessions with residents, and see the response before committing. You can start your trial directly on our join page, or book a consultation first if you'd like a guided walkthrough from our team.",
    },
  ];

  return (
    <section style={{ background: '#F6F8F9', padding: '96px 5%' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '380px 1fr',
        gap: '80px',
      }}>

        {/* Left: Intro */}
        <div>
          <div>
          <span style={{
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#64748b',
            display: 'block',
            marginBottom: '20px',
            fontFamily: 'Roboto, sans-serif',
          }}>
            {tag}
          </span>

          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: '700',
            color: '#964B4B',
            lineHeight: '1.2',
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}>
            {heading}
          </h2>

          <p style={{
            fontSize: '15px',
            fontFamily: 'Roboto, sans-serif',
            color: '#334155',
            lineHeight: '1.7',
            marginBottom: '32px',
          }}>
            {subtitle}
          </p>

          {/* Support box */}
          <div style={{
            background: '#F6F8F9',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #94a3b8',
          }}>
            <p style={{
              fontSize: '14px',
              fontFamily: 'Roboto, sans-serif',
              color: '#64748b',
              margin: '0 0 12px 0',
              lineHeight: '1.5',
            }}>
              {support_box_text}
            </p>
            <a
              href={`mailto:${support_email}`}
              style={{
                fontSize: '15px',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: '600',
                color: '#964B4B',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'gap 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.gap = '8px'}
              onMouseLeave={e => e.currentTarget.style.gap = '4px'}
            >
              {support_email} →
            </a>
          </div>
          </div>
        </div>

        {/* Right: Accordion */}
        <div style={{ 
          display: 'block',
        }}>
          {items.map((item, i) => {
            const isOpen = !!openIndexes[i];
            return (
              <div
                key={i}
                style={{
                  background: '#F6F8F9',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  overflow: 'hidden',
                  border: '1px solid #94a3b8',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  onClick={() => toggleIndex(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    background: '#F6F8F9',
                    border: 'none',
                    cursor: 'pointer',
                    gap: '16px',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#1a1f3c',
                    lineHeight: '1.4',
                    flex: 1,
                  }}>
                    {item.question}
                  </span>
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isOpen ? '#e2e8f0' : '#964B4B',
                    color: isOpen ? '#64748b' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background 0.25s ease, color 0.25s ease',
                  }}>
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 24px 24px',
                    borderTop: '1px solid #94a3b8',
                  }}>
                    <p style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '15px',
                      color: '#334155',
                      lineHeight: '1.75',
                      margin: '16px 0 0 0',
                    }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CareFaq;
