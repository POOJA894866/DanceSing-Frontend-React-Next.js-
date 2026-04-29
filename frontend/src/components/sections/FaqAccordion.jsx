import React, { useState } from 'react';
import Button from '../common/Button';

/**
 * FaqAccordion — Section 8
 * Toggle questions with pure React state.
 * data: { tag, heading, subtitle, items[{ question, answer, defaultOpen }], footerCta }
 */
const FaqAccordion = ({ data }) => {
  const [openIndices, setOpenIndices] = useState([0, 2, 4, 6]); // Default multiple open like reference

  if (!data || !data.items) return null;
  const { tag, heading, subtitle, items, footerCta } = data;

  const toggleIndex = (idx) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter(i => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  const faqData = [
    {
      q: "How do I know which plan I need?",
      a: "If you're using Care / Lifestyle / On Air for yourself or supporting one person, the Individual Plan is right for you. For a small team at one site, choose the Team Plan. For multiple locations, the Organisation Plan is required."
    },
    {
      q: "What is a 'single site'?",
      a: "A single site is one physical location or care facility. For multiple homes or venues, the Organisation tier allows segmented permissions."
    },
    {
      q: "Can I share my account or login with others?",
      a: "No. Individual accounts are for personal use only and cannot be shared. For shared access, please upgrade to a Team or Organisation Plan."
    },
    {
      q: "Does the trial automatically renew?",
      a: "Your subscription will move seamlessly to full billing at the end of the trial, ensuring uninterrupted platform capabilities."
    },
    {
      q: "How can I cancel my plan?",
      a: "If you signed up online via our self-service checkout, you can cancel at any time through your account settings. For Team or Organisation plans set up manually, contact support@dancesing.online and our team will assist you."
    },
    {
      q: "How do I pay?",
      a: "Organisations can clear invoices easily or process credit card subscriptions seamlessly inside checkout dashboards."
    },
    {
      q: "Is there a limit on devices or streams?",
      a: "You can log in from more than one device, but simultaneous streaming is restricted to fair use. For multiple users or concurrent sessions, a Team or Organisation Plan is required."
    }
  ];

  return (
    <section className="section faq" id={data.id || 'faq'} style={{ background: '#ffffff', padding: '100px 0' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', alignItems: 'start' }}>

        {/* Left Column */}
        <div>
          <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.15em', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            SUPPORT
          </span>
          <h2 style={{ fontSize: '44px', fontFamily: 'Sora', fontWeight: '300', color: '#283466', marginBottom: '24px', lineHeight: '1.2', letterSpacing: '-1px' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: '16px', fontFamily: 'Roboto', color: '#02020A', lineHeight: '1.7', marginBottom: '48px' }}>
            At danceSing, we make wellbeing simple for caregivers and residents. Explore clear answers to the most common questions about our programmes, plans, and support.
          </p>

          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #b8bbc0ff' }}>
            <p style={{ fontSize: '15px', fontFamily: 'Roboto', color: '#000000ff', marginBottom: '12px', lineHeight: '1.5' }}>
              Can&apos;t find what you&apos;re looking for? Our team responds within 48 hours.
            </p>
            <a href="mailto:support@dancesing.online" style={{ fontSize: '16px', fontWeight: '700', color: '#1e2445', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              support@dancesing.online →
            </a>
          </div>
        </div>

        {/* Right Column - Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqData.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div key={idx} style={{ background: 'white', borderRadius: '12px', border: '1px solid #b8bbc0ff', overflow: 'hidden' }}>
                <button
                  onClick={() => toggleIndex(idx)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#1e2445' }}>
                    {item.q}
                  </span>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#b8bbc0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e2445', fontSize: '16px', fontWeight: 'bold', flexShrink: 0 }}>
                    {isOpen ? '−' : '+'}
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 32px 24px 32px', borderTop: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', margin: '20px 0 0 0' }}>
                      {item.a}
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

export default FaqAccordion;
