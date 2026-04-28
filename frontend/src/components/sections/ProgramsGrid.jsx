import React from 'react';
import Button from '../common/Button';

/**
 * ProgramsGrid — Section 2
 * 3-col cards: Body / Mind / Soul programs.
 * data: { tag, heading, subtitle, categoryTags, cards }
 */
const ProgramsGrid = ({ data }) => {
  if (!data) return null;
  const { tag, heading, subtitle, categoryTags, cards } = data;

  const iconMap = {
    heart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 3a3.2 3.2 0 0 0-4 2c0-1.2-1.6-2-4-2a2.73 2.73 0 0 0-2.5 2.8c0 1.1.8 2 1.5 2.7L12 13Z"/></svg>,
    leaf: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.8 11.1a7 7 0 0 1-9.8 6.9z"/><path d="M12.1 12.1c.4-1.3.4-3.1 0-4.1"/><path d="M9.4 14.3c-.4-1.3-.4-3.1 0-4.1"/></svg>,
    radio: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>,
    activity: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    users: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    music: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  };

  return (
    <section className="section programs" style={{ background: '#fcfbf9', padding: '100px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.1em', color: '#64748b', textTransform: 'uppercase', marginBottom: '16px' }}>
            Our Programmes
          </p>
          <h2 style={{ fontSize: '52px', fontWeight: '800', color: '#1e2445', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Wellness that Moves You — <br/> Body, Mind & Soul
          </h2>
          
          {/* Icon Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {[
              { label: 'Older adults', icon: 'users' },
              { label: 'Care professionals', icon: 'heart' },
              { label: 'Independent living', icon: 'leaf' },
              { label: 'Music therapy', icon: 'music' },
              { label: 'Mindfulness', icon: 'activity' }
            ].map((tab, i) => (
              <button key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', border: '1px solid #e2e8f0', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', color: '#1e2445', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <span style={{ color: '#e8a020' }}>{iconMap[tab.icon]}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <p style={{ maxWidth: '780px', margin: '0 auto', fontSize: '17px', color: '#64748b', lineHeight: '1.7' }}>
            We combine <strong>Movement, Music, and Mindfulness</strong> to power joy, connection, and fun, flexible, and accessible to all — helping older adults move more, smile more, and feel more connected.
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {(cards || []).map((card, i) => {
            const tagText = (card.tag || "").toLowerCase();
            const isCare = tagText.includes('care');
            const isLifestyle = tagText.includes('lifestyle');
            const isOnAir = tagText.includes('air');
            const color = isCare ? '#dc2626' : isLifestyle ? '#16a34a' : '#ea580c';
            const categoryLabel = isCare ? 'CARE SECTOR' : isLifestyle ? 'LIFESTYLE' : 'ON AIR RADIO';
            const iconKey = isCare ? 'heart' : isLifestyle ? 'leaf' : 'radio';
            const isIconUrl = card.icon && (card.icon.includes('/') || card.icon.includes('.') || card.icon.startsWith('http'));
            const iconStyle = isIconUrl 
              ? { width: '36px', height: '36px', flexShrink: 0, background: `url(${card.icon}) lightgray 50% / cover no-repeat`, borderRadius: '8px' }
              : { width: '36px', height: '36px', borderRadius: '8px', background: `${color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, flexShrink: 0 };

            return (
              <div key={i} style={{ background: 'white', borderRadius: '32px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
                {/* Card Header */}
                <div style={{ padding: '32px 32px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={iconStyle}>
                    {!isIconUrl && iconMap[card.icon && iconMap[card.icon] ? card.icon : iconKey]}
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: color, letterSpacing: '0.05em' }}>{categoryLabel}</span>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1e2445', whiteSpace: 'nowrap' }}>{card.tag}</h3>
                  </div>
                </div>

                {/* Card Image Slot */}
                <div style={{ padding: '24px 32px' }}>
                  <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/10', border: '1px solid #f1f5f9' }}>
                    <img src={card.image?.src || '/placeholder.jpg'} alt={card.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '0 32px 32px', flex: 1 }}>
                  <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>{card.body}</p>
                  
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                    {(card.features || []).map((f, fi) => (
                      <li key={fi} style={{ position: 'relative', paddingLeft: '20px', fontSize: '14px', color: '#1e2445', fontWeight: '500', marginBottom: '10px' }}>
                        <span style={{ position: 'absolute', left: 0, top: '8px', width: '6px', height: '6px', borderRadius: '50%', background: color }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: color, fontWeight: '700', fontSize: '15px', textDecoration: 'none' }}>
                    Explore {card.tag.replace('danceSing ', '')} →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramsGrid;
