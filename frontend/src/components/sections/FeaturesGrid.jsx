import React from 'react';

/**
 * FeaturesGrid — Section 7 in reference
 * 3-col grid of cards with colored top borders.
 * data: { tag, heading, items[{ tag, heading, body, accentColor, ctas[] }] }
 */
const FeaturesGrid = ({ data }) => {
  if (!data || !data.items) return null;
  const { tag, heading, items } = data;

  const colorMap = {
    red: '#ef4444',
    green: '#22c55e',
    blue: '#3b82f6',
    gold: '#e8a020'
  };

  return (
    <section className="section features-grid" id={data.id || 'features-grid'} style={{ padding: '100px 0', background: '#ffffff' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>

        <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.15em', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
          {tag || "HOLISTIC APPROACH"}
        </span>

        <h2 style={{ fontSize: '44px', fontFamily: 'Sora', fontWeight: '700', color: '#283466', marginBottom: '24px', lineHeight: '1', letterSpacing: '-1px' }}>
          {heading || "Holistic Wellness Solutions"}
        </h2>

        <p style={{ fontSize: '17px', alignSelf: 'center', fontFamily: 'Roboto', color: '#5B6270', lineHeight: '1.5', maxWidth: '920px', margin: '0 auto 64px' }}>
          We offer comprehensive wellness services to enhance mental, physical, and emotional health. Our evidence-based programmes support individuals and caregivers with accessible, innovative resources.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', alignItems: 'stretch' }}>

          {/* Card 1: Care Sector */}
          <div style={{ background: 'white', borderRadius: '24px', border: '2px solid #993d3d', padding: '32px 24px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '480px', boxShadow: '0 10px 30px rgba(153,61,61,0.03)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#993d3d', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                CARE SECTOR
              </span>
              <h3 style={{ fontSize: '28px', fontFamily: 'Sora', fontWeight: '300', color: '#02020A', marginBottom: '16px', lineHeight: '1.3' }}>
                Elevate Your Care Community
              </h3>
              <p style={{ fontSize: '15px', fontFamily: "DM Sans", color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Empower your care community with danceSing&apos;s easy-to-use platform, offering tailored wellness resources that promote physical, emotional, and cognitive health. Foster a thriving, engaged environment for residents and caregivers alike.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px', marginTop: 'auto' }}>
                {["Easy-to-use platform", "Engaged community", "Staff time saved"].map((pill, idx) => (
                  <span key={idx} style={{ background: 'rgba(153,61,61,0.08)', color: '#993d3d', padding: '6px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '600' }}>
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <a href="#" style={{ background: '#993d3d', color: 'white', padding: '14px 28px', borderRadius: '12px', fontWeight: '700', fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: 'fit-content', boxShadow: '0 10px 20px rgba(153,61,61,0.15)' }}>
              Explore Care Resources →
            </a>
          </div>

          {/* Card 2: Lifestyle */}
          <div style={{ background: 'white', borderRadius: '24px', border: '2px solid #3b6b4c', padding: '32px 24px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '480px', boxShadow: '0 10px 30px rgba(59,107,76,0.03)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#3b6b4c', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                LIFESTYLE
              </span>
              <h3 style={{ fontSize: '28px', fontFamily: 'Sora', fontWeight: '300', color: '#02020A', marginBottom: '16px', lineHeight: '1.3' }}>
                Experience Wellness Anytime, Anywhere
              </h3>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Experience holistic wellness with danceSing&apos;s Lifestyle Platform offering Pilates, Yoga, Meditation, Nutrition, and more to support mind and body. Accessible anytime, anywhere for individuals and organisations.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px', marginTop: 'auto' }}>
                {["Anytime access", "Mind & body", "Pilates · Yoga · Nutrition"].map((pill, idx) => (
                  <span key={idx} style={{ background: 'rgba(59,107,76,0.08)', color: '#3b6b4c', padding: '6px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '600' }}>
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <a href="#" style={{ background: '#3b6b4c', color: 'white', padding: '14px 28px', borderRadius: '12px', fontWeight: '700', fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: 'fit-content', boxShadow: '0 10px 20px rgba(59,107,76,0.15)' }}>
              Explore Lifestyle →
            </a>
          </div>

          {/* Card 3: Training */}
          <div style={{ background: 'white', borderRadius: '24px', border: '2px solid #1c506b', padding: '32px 24px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '480px', boxShadow: '0 10px 30px rgba(28,80,107,0.03)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#1c506b', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                TRAINING
              </span>
              <h3 style={{ fontSize: '28px',fontFamily: 'Sora', fontWeight: '200', color: '#02020A', marginBottom: '16px', lineHeight: '1.3' }}>
                Training & Professional Support
              </h3>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                Build confidence and capability in your care team. Our practical training workshops help staff lead meaningful engagement sessions every day — improving outcomes for residents and job satisfaction for carers.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px', marginTop: 'auto' }}>
                {["CPD accredited", "Hands-on workshops", "Staff confidence"].map((pill, idx) => (
                  <span key={idx} style={{ background: 'rgba(28,80,107,0.08)', color: '#1c506b', padding: '6px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '600' }}>
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <a href="#" style={{ background: '#1c506b', color: 'white', padding: '14px 28px', borderRadius: '12px', fontWeight: '700', fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: 'fit-content', boxShadow: '0 10px 20px rgba(28,80,107,0.15)' }}>
              Explore Training →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
