'use client';

import React from 'react';

const CalendarHero = ({ data }) => {
  const tag = data?.tag || 'Start Your Journey';
  const heading = data?.heading || 'Book Your Free 30-Minute Demo';
  const body = data?.body || 'Pick a date that works for you. Our team will walk you through the platform, answer your questions, and help you find the right plan for your setting — no commitment, no pressure.';
  const image = data?.image;
  const ctas = data?.ctas?.length ? data.ctas : [
    { label: 'Explore our Programmes →', href: '#booking', style: 'solid-light' },
    { label: 'Talk to Our Team',          href: '/contact',  style: 'outline-light' },
  ];

  return (
    <section className="cal-hero">
      <div className="cal-hero__inner">
        <div className="cal-hero__copy">
          <p className="cal-hero__tag">{tag}</p>
          <h1 className="cal-hero__heading">{heading}</h1>
          <p className="cal-hero__body">{body}</p>

          <div className="cal-hero__ctas">
            {ctas.map((cta, i) => {
              const isSolid = (cta.style || (i === 0 ? 'solid-light' : 'outline-light')) === 'solid-light';
              return (
                <a
                  key={i}
                  href={cta.href || '#'}
                  className={`cal-hero__btn ${isSolid ? 'cal-hero__btn--solid' : 'cal-hero__btn--outline'}`}
                >
                  {cta.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="cal-hero__visual" aria-hidden={!image?.src}>
          <div className="cal-hero__laptop-frame">
            <img
              src={image?.src || '/images/calendar-macbook.png'}
              alt={image?.alt || 'danceSing platform on MacBook'}
              className="cal-hero__laptop-img"
            />
            <div className="cal-hero__brand-chip">
              <span className="cal-hero__brand-dot" aria-hidden="true" />
              danceSing
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cal-hero {
          background: #283466;
          color: #f6f8f9;
          padding: 90px 0 90px;
          position: relative;
          overflow: hidden;
        }
        .cal-hero__inner {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 64px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .cal-hero__copy {
          max-width: 720px;
          padding-right: 12px;
        }
        .cal-hero__tag {
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.5;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: rgba(246, 248, 249, 0.8);
          margin: 0 0 16px;
        }
        .cal-hero__heading {
          font-family: var(--font-serif);
          font-size: clamp(40px, 4.4vw, 60px);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -0.5px;
          color: #f6f8f9;
          margin: 0 0 22px;
          text-transform: capitalize;
        }
        .cal-hero__body {
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #f6f8f9;
          margin: 0 0 28px;
          max-width: 640px;
        }
        .cal-hero__ctas {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .cal-hero__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          padding: 0 20px;
          border-radius: 6px;
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.5;
          border: 1.5px solid #f6f8f9;
          transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
          text-decoration: none;
          white-space: nowrap;
        }
        .cal-hero__btn:hover { transform: translateY(-1px); }
        .cal-hero__btn--solid {
          background: #f6f8f9;
          color: #283466;
        }
        .cal-hero__btn--solid:hover { background: #e8ecf2; }
        .cal-hero__btn--outline {
          background: transparent;
          color: #f6f8f9;
          box-shadow: 0 1px 2px rgba(8, 3, 7, 0.05);
        }
        .cal-hero__btn--outline:hover { background: rgba(246, 248, 249, 0.08); }

        .cal-hero__visual {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 12px;
        }
        .cal-hero__laptop-frame {
          position: relative;
          width: 100%;
          max-width: 820px;
        }
        .cal-hero__laptop-img {
          display: block;
          width: 100%;
          height: auto;
          filter: drop-shadow(0 30px 50px rgba(0, 0, 0, 0.35));
        }
        .cal-hero__brand-chip {
          position: absolute;
          right: 11.5%;
          bottom: 14.5%;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: #f0f1ff;
          border-radius: 0 0 12px 12px;
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: 13px;
          color: #283466;
          letter-spacing: -0.01em;
          line-height: 1.6;
        }
        .cal-hero__brand-dot {
          width: 6px;
          height: 8px;
          background: #283466;
          border-radius: 1px;
          transform: skewX(-12deg);
        }

        @media (max-width: 1100px) {
          .cal-hero__inner {
            padding: 0 32px;
            gap: 32px;
          }
        }
        @media (max-width: 900px) {
          .cal-hero {
            padding: 72px 0 60px;
          }
          .cal-hero__inner {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 0 24px;
          }
          .cal-hero__heading {
            font-size: clamp(32px, 8vw, 44px);
          }
          .cal-hero__visual {
            padding: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default CalendarHero;
