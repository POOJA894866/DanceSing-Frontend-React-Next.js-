import React from 'react';

/**
 * StatsBar - Clean 4-col bar showing key impact numbers
 * data: { stats: [{ value, label }] }
 */
const StatsBar = ({ data }) => {
  if (!data || !data.stats) return null;

  return (
    <section className="stats-bar" style={{ padding: '40px 24px', background: 'white' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '32px', maxWidth: '1700px', margin: '0 auto', textAlign: 'center' }}>
        {data.stats.map((stat, i) => (
          <div key={i} className="stat-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 className="stat-item__value" style={{ fontSize: '40px', fontStyle: 'bold', fontWeight: '700', color: '#283466', marginBottom: '8px', fontFamily: 'Sora, sans-serif' }}>
              {stat.value}
            </h3>
            <p className="stat-item__label" style={{ fontSize: '15px', fontFamily: 'Roboto', fontWeight: '200', color: '#02020A', letterSpacing: '0.05em', whiteSpace: 'nowrap', margin: 0 }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
