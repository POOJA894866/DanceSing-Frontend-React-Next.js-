import React from 'react';

/**
 * Testimonials — Section 8 in reference
 * Row of feedback cards with star ratings.
 * data: { tag, heading, items[{ stars, text, author, role, image }] }
 */
const Testimonials = ({ data }) => {
  if (!data || !data.items) return null;
  const { tag, heading, items } = data;

  const Star = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#e8a020">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  return (
    <section className="section testimonials" id={data.id || 'testimonials'} style={{ background: '#283466', padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        
        <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.15em', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
          REAL VOICES
        </span>
        
        <h2 style={{ fontSize: '44px', fontWeight: '800', color: '#ffffff', marginBottom: '24px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
          Our Experience Is Your Advantage
        </h2>

        {/* Rating Summary Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 24px', borderRadius: '12px', marginBottom: '64px' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[...Array(5)].map((_, i) => <Star key={i} />)}
          </div>
          <span style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600' }}>
            4.9 out of 5 Stars <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '400', marginLeft: '4px' }}>from 47 verified reviews</span>
          </span>
        </div>

        {/* Testimonials Cards Row (Scrollable horizontally or Flex wrap safely) */}
        <div className="testimonials-scroll" style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '24px', paddingLeft: '4px', paddingRight: '4px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {[
            {
              tag: "TRAINING",
              tagColor: "#38bdf8",
              tagBg: "rgba(56, 189, 248, 0.1)",
              text: "Since the training workshop, staff have grown in confidence, leading singing and dancing sessions with the people we support. A simple log-in quickly turned into 30 minutes of movement and laughter — residents loved it!",
              author: "Naomi",
              role: "Co-Production Leader, Capability Scotland",
              initials: "NC"
            },
            {
              tag: "CARE",
              tagColor: "#f472b6",
              tagBg: "rgba(244, 114, 182, 0.1)",
              text: "danceSing Care is a win-win for our short-stay centre. The sessions are enjoyable, easy to follow, and thoughtfully delivered. Our customers, many with dementia, love the chair-based exercises, Calm Fitness, and music resources.",
              author: "Karen",
              role: "Elmhurst Short Stay Centre",
              initials: "KE"
            },
            {
              tag: "LIFESTYLE",
              tagColor: "#4ade80",
              tagBg: "rgba(74, 222, 128, 0.1)",
              text: "Am so glad I signed up for danceSing. Lindsay and Natalie are fabulous and so encouraging. Lindsay's singing sessions are like a gathering of friends for a social evening of singing and blethering.",
              author: "Kathryn",
              role: "Lifestyle Member",
              initials: "KT"
            },
            {
              tag: "RESEARCH",
              tagColor: "#c084fc",
              tagBg: "rgba(192, 132, 252, 0.1)",
              text: "danceSing Care resources support care home staff in providing meaningful engagement, physical exercise, social interaction, and fun — improving resident wellbeing during and beyond the pandemic.",
              author: "Dr Joanna Marshall",
              role: "NHS Foundation Trust",
              initials: "JM"
            },
            {
              tag: "LIFESTYLE",
              tagColor: "#4ade80",
              tagBg: "rgba(74, 222, 128, 0.1)",
              text: "danceSing has an amazing feel-good factor. I always wake up feeling tired but a dose of danceSing fixes that! The leaders are incredibly motivating and hold the classes feel as if they are right there in the room.",
              author: "Sheila",
              role: "Lifestyle Member",
              initials: "SH"
            }
          ].map((item, i) => (
            <div key={i} style={{ background: 'white', padding: '40px 32px', borderRadius: '20px', textAlign: 'left', minWidth: '340px', maxWidth: '340px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, si) => <Star key={si} />)}
                  </div>
                  <span style={{ color: item.tagColor, background: item.tagBg, padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', letterSpacing: '0.05em' }}>
                    {item.tag}
                  </span>
                </div>

                <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', marginBottom: '32px' }}>
                  "{item.text}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: 'auto' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#1e2445', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700' }}>
                  {item.initials}
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1e2445', margin: 0 }}>{item.author}</h4>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0', lineHeight: '1.3' }}>{item.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
