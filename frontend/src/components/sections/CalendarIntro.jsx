'use client';

import React from 'react';

const CalendarIntro = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || '';
  const heading = data.heading || '';
  const body = data.body || '';
  const bulletItems = data.bullet_items || [];
  const image = data.image;

  if (!heading && !body && !bulletItems.length) return null;

  return (
    <section style={{ background: 'var(--off-white)', padding: '80px 0' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'grid',
        gridTemplateColumns: image?.src ? '1fr 1fr' : '1fr',
        gap: '64px',
        alignItems: 'center',
      }}>
        <div>
          {tag && (
            <span style={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              background: 'rgba(232, 160, 32, 0.12)',
              borderRadius: '99px',
              padding: '4px 14px',
              marginBottom: '16px',
            }}>
              {tag}
            </span>
          )}

          {heading && (
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              fontWeight: 700,
              color: 'var(--navy)',
              lineHeight: 1.2,
              marginBottom: '20px',
            }}>
              {heading}
            </h2>
          )}

          {body && (
            <p style={{
              fontSize: '16px',
              color: 'var(--muted)',
              lineHeight: 1.75,
              marginBottom: bulletItems.length ? '28px' : 0,
            }}>
              {body}
            </p>
          )}

          {bulletItems.length > 0 && (
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0 }}>
              {bulletItems.map((item, i) => (
                <li key={i} style={{
                  position: 'relative',
                  paddingLeft: '28px',
                  fontSize: '15px',
                  color: 'var(--text)',
                  lineHeight: 1.6,
                }}>
                  <span aria-hidden="true" style={{
                    position: 'absolute',
                    left: 0,
                    top: '6px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {image?.src && (
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            aspectRatio: '4/3',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <img
              src={image.src}
              alt={image.alt || heading}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CalendarIntro;
