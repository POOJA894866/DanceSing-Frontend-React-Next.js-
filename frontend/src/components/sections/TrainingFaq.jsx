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

const TrainingFaq = ({ data }) => {
  const [openIndexes, setOpenIndexes] = useState({ 0: true, 2: true, 4: true, 6: true }); // Open some by default to match screenshot

  const toggleIndex = (i) => {
    setOpenIndexes(prev => ({
      ...prev,
      [i]: !prev[i]
    }));
  };

  if (!data) return null;

  const tag = data.tag || 'SUPPORT';
  const heading = data.heading || 'Everything you need to know about Care'; // matching screenshot literally
  const subtitle = data.subtitle || 'Answers to the questions care managers, activities coordinators, and team leaders ask us most before getting started.';
  const support_box_text = data.support_box_text || "Can't find what you're looking for? Our team responds within 48 hours.";
  const support_email = data.support_email || 'support@dancesing.online';

  const hasValidItems = data.items && data.items.length > 0 && data.items[0]?.question;
  const items = hasValidItems ? data.items : [
    {
      question: 'Who is this training for?',
      answer: 'The training is designed for care home staff — including caregivers, activity coordinators, and managers — who want to enhance resident wellbeing and boost staff engagement. It is accessible to anyone regardless of prior experience in wellness or activities facilitation.',
    },
    {
      question: 'How long does the training take?',
      answer: 'The core online training module can be completed in just a few hours. We also offer extended live sessions (both remote and in-person) tailored to your team\'s schedule and needs.',
    },
    {
      question: 'What qualifications will staff receive?',
      answer: 'On completion, staff earn the danceSing Level 1 Facilitation Certificate, which enhances their professional credentials, supports career development, and demonstrates a commitment to quality care. The certificate also supports regulatory compliance and can be referenced in CQC or care inspectorate documentation.',
    },
    {
      question: 'Is the training available remotely, or does it have to be in-person?',
      answer: 'The training is highly flexible and available fully remotely through interactive video sessions, or it can be delivered in-person at your facility depending on your preference.',
    },
    {
      question: "Can the training be customised to our care home's specific needs?",
      answer: "Yes. The training is flexible and can be tailored to your care home's specific resident profile, operational workflows, and team structure. During the initial consultation, we discuss your setting in detail to ensure the programme is relevant and practical from the very first session.",
    },
    {
      question: 'What support is available after training?',
      answer: 'We provide comprehensive ongoing support including access to our resource library, regular check-in calls with our coaching team, and a dedicated support email that responds within 48 hours.',
    },
    {
      question: 'Will training improve staff retention?',
      answer: 'Yes — and the evidence supports this. Training boosts staff morale and job satisfaction by giving care workers the skills, confidence, and tools to do their jobs well. Our data shows a 21% reduction in staff stress and a 12% increase in job satisfaction among teams using the platform consistently. Better-supported staff stay longer.',
    },
    {
      question: 'How do we track the effectiveness of the training?',
      answer: 'We provide detailed monthly and quarterly data reports showing staff participation rates, resident engagement metrics, and overall programme impact to help you track ROI and support compliance audits.',
    },
    {
      question: 'How does training support regulatory compliance?',
      answer: 'The training and subsequent certification provide robust, audit-ready evidence of continuous professional development (CPD) and commitment to person-centred care, directly supporting CAPA and CQC frameworks.',
    },
    {
      question: 'Are there additional costs for training beyond the subscription?',
      answer: 'No hidden costs. Our core remote training and onboarding are fully included in the Team and Organisation subscription plans. Bespoke in-person full-day workshops may incur additional travel or facilitation fees.',
    },
  ];

  return (
    <section style={{ 
      background: '#f8fafc', 
      padding: '100px 5%',
      borderTop: '20px solid #1a5e7b', // Dark teal top border
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: '80px',
        alignItems: 'start'
      }}>

        {/* Left: Intro */}
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
            fontSize: 'clamp(32px, 3.5vw, 44px)',
            fontWeight: '700',
            color: '#1a5e7b',
            lineHeight: '1.2',
            marginBottom: '24px',
            letterSpacing: '-0.5px',
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
            {subtitle}
          </p>

          {/* Support box */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #e2e8f0',
          }}>
            <p style={{
              fontSize: '14px',
              fontFamily: 'Roboto, sans-serif',
              color: '#475569',
              margin: '0 0 16px 0',
              lineHeight: '1.6',
            }}>
              {support_box_text}
            </p>
            <a
              href={`mailto:${support_email}`}
              style={{
                fontSize: '16px',
                fontFamily: 'Sora, sans-serif',
                fontWeight: '600',
                color: '#1a5e7b',
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

        {/* Right: Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item, i) => {
            // Check if openIndexes[i] exists, otherwise fall back to item.defaultOpen
            const isOpen = openIndexes[i] !== undefined ? openIndexes[i] : item.defaultOpen;
            
            return (
              <div
                key={i}
                style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                <button
                  onClick={() => toggleIndex(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px',
                    background: '#f8fafc',
                    border: 'none',
                    cursor: 'pointer',
                    gap: '24px',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#02020a',
                    lineHeight: '1.4',
                    flex: 1,
                  }}>
                    {item.question}
                  </span>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOpen ? '#cbd5e1' : '#1a5e7b',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background 0.2s ease, transform 0.2s ease',
                  }}>
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 24px 24px',
                    borderTop: '1px solid #e2e8f0',
                  }}>
                    <p style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '14px',
                      color: '#334155',
                      lineHeight: '1.7',
                      margin: '20px 0 0 0',
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

export default TrainingFaq;
