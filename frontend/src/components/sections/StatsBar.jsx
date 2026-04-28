import React from 'react';

/**
 * StatsBar - Clean 4-col bar showing key impact numbers
 * data: { stats: [{ value, label }] }
 */
const StatsBar = ({ data }) => {
  if (!data || !data.stats) return null;

  return (
    <section className="stats-bar" style={{ padding: '37px 187px 37px 186px', background: 'white' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '200px', textAlign: 'center' }}>
        {data.stats.map((stat, i) => (
          <div key={i} className="stat-item">
            <h3 className="stat-item__value" style={{ fontSize: '48px', fontWeight: '800', color: 'var(--navy)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              {stat.value}
            </h3>
            <p className="stat-item__label" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--muted)', letterSpacing: '0.05em' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
