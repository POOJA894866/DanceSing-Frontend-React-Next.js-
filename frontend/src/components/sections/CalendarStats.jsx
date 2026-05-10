'use client';

import React from 'react';

const DEFAULT_STATS = [
  { heading: '200+', label: 'Care Communities' },
  { heading: '4.9/5', label: 'of 49 Reviews' },
  { heading: '5+', label: 'Years of Research' },
  { heading: '30 mins', label: 'Free, no obligation' },
];

const CalendarStats = ({ data }) => {
  const stats = data?.stats?.length ? data.stats : DEFAULT_STATS;

  return (
    <section className="cal-stats">
      <div className="cal-stats__inner">
        {stats.map((s, i) => (
          <div key={i} className="cal-stats__item">
            <div className="cal-stats__value">{s.heading}</div>
            <div className="cal-stats__label">{s.label}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .cal-stats {
          background: var(--white);
          padding: 60px 0;
          border-top: 1px solid #eef0f3;
        }
        .cal-stats__inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 64px;
          display: grid;
          grid-template-columns: repeat(${stats.length}, 1fr);
          gap: 28px;
          text-align: center;
        }
        .cal-stats__value {
          font-family: var(--font-serif);
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 800;
          color: var(--navy);
          line-height: 1.1;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }
        .cal-stats__label {
          font-size: 15px;
          color: var(--muted);
        }
        @media (max-width: 760px) {
          .cal-stats__inner {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 24px;
            gap: 32px 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default CalendarStats;
