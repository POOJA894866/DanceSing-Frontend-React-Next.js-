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

  return (
    <section className="section programs" style={{ background: '#fcfbf9', padding: '100px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.1em', color: '#64748b', textTransform: 'uppercase', marginBottom: '16px' }}>
            Our Programmes
          </p>
          <h2 style={{ fontSize: '52px', fontFamily: 'Sora', fontWeight: '300', color: '#283466', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Wellness that Moves You — <br /> Body, Mind & Soul
          </h2>
 
          {/* Icon Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {[
              { label: 'Older adults', imgSrc: '/images/heart.png' },
              { label: 'Care professionals', imgSrc: '/images/care2.png' },
              { label: 'Independent living', imgSrc: '/images/ind.png' },
              { label: 'Music therapy', imgSrc: '/images/muc.png' },
              { label: 'Mindfulness', imgSrc: '/images/mind.png' }
            ].map((tab, i) => (
              <button key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', border: '1px solid #02020A33', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', color: '#1e2445', fontFamily: 'Roboto', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <img src={tab.imgSrc} alt={tab.label} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                {tab.label}
              </button>
            ))}
          </div>

          <p style={{ maxWidth: '800px',textAlign: 'center', margin: '0 auto', fontSize: '18px', color: '#5B6270', lineHeight: '1.7', fontFamily: 'Roboto' }}>
            We combine <strong style={{ fontWeight: 700, color:'black' }}>Movement, Music, and Mindfulness</strong> to power joy, connection, and fun, flexible, and accessible to all — helping older adults move more, smile more, and feel more connected.
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {(cards || []).map((card, i) => {
            const tagText = (card.tag || "").toLowerCase();
            const isCare = tagText.includes('care');
            const isLifestyle = tagText.includes('lifestyle');
            const isOnAir = tagText.includes('air');
            const color = isCare ? '#964B4B' : isLifestyle ? '#416650' : '#CC8A4D';
            const categoryLabel = isCare ? 'CARE SECTOR' : isLifestyle ? 'LIFESTYLE' : 'ON AIR RADIO';
            const customIconSrc = isCare ? '/images/heart.png' : isLifestyle ? '/images/plant.png' : '/images/radio.png';

            return (
              <div key={i} style={{ background: 'white', borderRadius: '32px', overflow: 'hidden', border: `1px solid ${isCare ? '#eedddd' : isLifestyle ? '#e1ebe5' : '#eadacc'}`, boxShadow: '0 20px 40px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
                {/* Card Header */}
                <div style={{ padding: '30px 32px 24px', display: 'flex', alignItems: 'center', gap: '12px', background: isCare ? '#F8F3F3' : isLifestyle ? '#F0F5F2' : '#F6F0EA' }}>
                  <div style={{ width: '44px', height: '44px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
                    <img src={customIconSrc} alt={categoryLabel} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: color, letterSpacing: '0.05em' }}>{categoryLabel}</span>
                    <h3 style={{ fontSize: '20px', fontFamily: 'Sora', fontWeight: '300', color: '#1e2445', whiteSpace: 'nowrap' }}>{card.tag}</h3>
                  </div>
                </div>

                {/* Card Image Slot */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: isCare ? '#964B4B' : isLifestyle ? '#416650' : '#CC8A4D',
                  padding: '15px 10px', // Properly aligned with 32px left/right, and 24px top/bottom spacing
                }}>
                  <div style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/10', border: 'none' }}>
                    <img src={card.image?.src || '/placeholder.jpg'} alt={card.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ fontFamily: 'Roboto, sans-serif', padding: '24px 32px 32px', flex: 1, background: 'white', display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px', minHeight: '145px' }}>{card.body}</p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', flex: 1 }}>
                    {(card.features || []).map((f, fi) => (
                      <li key={fi} style={{ position: 'relative', paddingLeft: '20px', fontSize: '14px', color: '#1e2445', fontWeight: '500', marginBottom: '10px' }}>
                        <span style={{ position: 'absolute', left: 0, top: '8px', width: '6px', height: '6px', borderRadius: '50%', background: color }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: color, fontWeight: '700', fontSize: '15px', textDecoration: 'none', marginTop: 'auto' }}>
                    Explore danceSing  {card.tag.replace('danceSing ', '')} →
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
