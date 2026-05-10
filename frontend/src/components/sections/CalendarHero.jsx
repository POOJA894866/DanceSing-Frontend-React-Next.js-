'use client';

import React from 'react';
import Button from '../common/Button';

const CalendarHero = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'START YOUR JOURNEY';
  const heading = data.heading || 'Book Your Free 30-Minute Demo';
  const body = data.body || '';
  const image = data.image;
  const ctas = data.ctas?.length ? data.ctas : [];

  return (
    <section className="cal-hero">
      <div className="cal-hero__inner">
        <div className="cal-hero__copy">
          {tag && <span className="cal-hero__tag">{tag}</span>}
          <h1 className="cal-hero__heading">{heading}</h1>
          {body && <p className="cal-hero__body">{body}</p>}

          {ctas.length > 0 && (
            <div className="cal-hero__ctas">
              {ctas.map((cta, i) => (
                <Button
                  key={i}
                  label={cta.label}
                  href={cta.href || '#'}
                  style={cta.style || (i === 0 ? 'outline-white' : 'text-arrow')}
                />
              ))}
            </div>
          )}
        </div>

        <div className="cal-hero__visual">
          {image?.src ? (
            <img src={image.src} alt={image.alt || heading} className="cal-hero__image" />
          ) : (
            <div className="cal-hero__laptop" aria-hidden="true">
              <div className="cal-hero__laptop-screen" />
              <div className="cal-hero__laptop-base" />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cal-hero {
          background: var(--navy);
          color: var(--white);
          padding: 120px 0 100px;
          position: relative;
          overflow: hidden;
        }
        .cal-hero__inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 64px;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .cal-hero__tag {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin-bottom: 18px;
        }
        .cal-hero__heading {
          font-family: var(--font-serif);
          font-size: clamp(36px, 4.6vw, 64px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.5px;
          color: var(--white);
          margin: 0 0 22px;
        }
        .cal-hero__body {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.78);
          max-width: 560px;
          margin: 0 0 30px;
        }
        .cal-hero__ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .cal-hero__visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cal-hero__image {
          width: 100%;
          max-width: 720px;
          height: auto;
          border-radius: 14px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
        }
        .cal-hero__laptop {
          width: 100%;
          max-width: 640px;
          aspect-ratio: 16 / 10;
          border-radius: 14px;
          background: linear-gradient(180deg, #f1f3f6 0%, #d8dde4 100%);
          position: relative;
          box-shadow: 0 30px 70px rgba(0,0,0,0.45);
          border: 8px solid #1a1f3c;
        }
        .cal-hero__laptop-base {
          position: absolute;
          left: -8%;
          right: -8%;
          bottom: -14px;
          height: 14px;
          background: #1a1f3c;
          border-radius: 0 0 14px 14px;
        }
        @media (max-width: 960px) {
          .cal-hero {
            padding: 90px 0 70px;
          }
          .cal-hero__inner {
            grid-template-columns: 1fr;
            padding: 0 24px;
            gap: 40px;
          }
          .cal-hero__heading {
            font-size: clamp(30px, 8vw, 44px);
          }
        }
      `}</style>
    </section>
  );
};

export default CalendarHero;
