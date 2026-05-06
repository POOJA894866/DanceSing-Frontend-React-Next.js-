'use client';

import React, { useState } from 'react';

const LifestyleFaq = ({ data }) => {
  const [openIndices, setOpenIndices] = useState([0, 2]); // Default multiple open like reference

  if (!data) return null;

  const tag = data.tag || 'SUPPORT';
  const heading = data.heading || 'Everything you need\nto know about Care';
  const subtitle = data.subtitle || 'Answers to the questions care managers, activities coordinators, and team leaders ask us most before getting started.';
  const footer_body = data.footer_body || "Can't find what you're looking for? Our team responds within 48 hours.";
  const footer_link_text = data.footer_link_text || "support@dancesing.online →";
  const footer_link_url = data.footer_link_url || "mailto:support@dancesing.online";

  const items = data.items?.length > 0 ? data.items : [
    {
      question: "What is included in the danceSing Lifestyle platform?",
      answer: "danceSing Lifestyle includes a comprehensive library of on-demand content across six disciplines: Pilates, Yoga, Dance Fitness, Meditation, Singing, and Nutrition. All plans also include access to danceSing On Air — our 24/7 commercial-free wellbeing radio. Team and Organisation plans include additional reporting, onboarding support, and optional live group sessions."
    },
    {
      question: "Who is the Lifestyle platform designed for?",
      answer: "danceSing Lifestyle is for anyone who wants accessible, high-quality wellness content — at home, at work, or in the community."
    },
    {
      question: "Do I need any special equipment to take part?",
      answer: "No special equipment is required for the majority of sessions. A comfortable, supportive chair is all you need for most Yoga and Pilates classes. Meditation and Singing require nothing at all — just a quiet space. The platform is accessible via any internet-connected device: tablet, laptop, smart TV, or smartphone."
    },
    {
      question: "What's the difference between Individual, Team, and Organisation plans?",
      answer: "Individual is for single users. Team covers all staff at a single site with usage reporting. Organisation provides multi-site coverage with dedicated support."
    },
    {
      question: "Can I use Lifestyle for a workplace wellbeing programme?",
      answer: "Yes — the Team plan is ideal for workplace wellbeing. It covers all staff at a single site with unlimited logins, concurrent streaming (so multiple people can access at the same time), usage reporting to track engagement, and optional live group sessions for team activities. For organisations with multiple offices, the Organisation plan provides multi-site coverage with dedicated support."
    },
    {
      question: "Can I share my account with others?",
      answer: "No. Individual accounts are for personal use only and cannot be shared. For shared access, please upgrade to a Team or Organisation Plan."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes — all plans include a free trial period so you can explore the platform and try sessions before committing. Start your trial directly on the join page, or book a consultation first if you'd prefer a guided walkthrough from our team."
    },
    {
      question: "Is there evidence that Lifestyle actually works?",
      answer: "Yes, our programmes are based on research and real-life experience. Through ongoing evaluation, our programmes have consistently demonstrated positive outcomes for wellbeing, engagement, and quality of life."
    }
  ];

  const toggleIndex = (idx) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter(i => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  const headingLines = heading.split('\n');

  return (
    <section style={{ background: '#F8FAF9', padding: '100px 0' }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 5%', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', alignItems: 'start' }}>

        {/* Left Column */}
        <div>
          <span style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            letterSpacing: '0.15em', 
            color: '#4b5563', 
            textTransform: 'uppercase', 
            display: 'block', 
            marginBottom: '16px',
            fontFamily: 'Roboto, sans-serif'
          }}>
            {tag}
          </span>
          <h2 style={{ 
            fontSize: 'clamp(32px, 4vw, 44px)', 
            fontFamily: 'Sora, sans-serif', 
            fontWeight: '700', 
            color: '#426E53', 
            marginBottom: '24px', 
            lineHeight: '1.15', 
            letterSpacing: '-0.02em' 
          }}>
            {headingLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p style={{ 
            fontSize: '15px', 
            fontFamily: 'Roboto, sans-serif', 
            color: '#111827', 
            lineHeight: '1.6', 
            marginBottom: '48px',
            maxWidth: '90%'
          }}>
            {subtitle}
          </p>

          <div style={{ 
            background: '#F8FAF9', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #d1d5db' 
          }}>
            <p style={{ 
              fontSize: '14px', 
              fontFamily: 'Roboto, sans-serif', 
              color: '#4b5563', 
              marginBottom: '16px', 
              lineHeight: '1.5' 
            }}>
              {footer_body}
            </p>
            <a href={footer_link_url} style={{ 
              fontSize: '16px', 
              fontWeight: '700', 
              color: '#426E53', 
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              fontFamily: 'Roboto, sans-serif'
            }}>
              {footer_link_text}
            </a>
          </div>
        </div>

        {/* Right Column - Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div key={idx} style={{ 
                background: '#F8FAF9', 
                borderRadius: '8px', 
                border: '1px solid #d1d5db', 
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}>
                <button
                  onClick={() => toggleIndex(idx)}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '24px', 
                    background: 'transparent', 
                    border: 'none', 
                    textAlign: 'left', 
                    cursor: 'pointer' 
                  }}
                >
                  <span style={{ 
                    fontSize: '15px', 
                    fontWeight: '700', 
                    color: '#111827',
                    fontFamily: 'Sora, sans-serif'
                  }}>
                    {item.question}
                  </span>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: isOpen ? '#9ca3af' : '#426E53', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'white', 
                    fontSize: '16px', 
                    fontWeight: 'normal', 
                    flexShrink: 0,
                    transition: 'background 0.3s ease'
                  }}>
                    {isOpen ? '−' : '+'}
                  </div>
                </button>

                {isOpen && (
                  <div style={{ 
                    padding: '0 24px 24px 24px', 
                    borderTop: '1px solid #e5e7eb' 
                  }}>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#374151', 
                      lineHeight: '1.6', 
                      margin: '20px 0 0 0',
                      fontFamily: 'Roboto, sans-serif'
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
      <style>{`
        @media (max-width: 900px) {
          section > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LifestyleFaq;
