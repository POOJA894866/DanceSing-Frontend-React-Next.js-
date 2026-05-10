'use client';

import React, { useMemo } from 'react';
import Button from '../common/Button';

const CATEGORY_COLORS = {
  workshop:    { bg: '#fff7ed', fg: '#ea580c' },
  performance: { bg: '#fef2f2', fg: '#dc2626' },
  community:   { bg: '#f0fdf4', fg: '#16a34a' },
  training:    { bg: '#eff6ff', fg: '#1d4ed8' },
};

function formatDateLong(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
}

function dateBadgeParts(iso) {
  if (!iso) return { day: '', month: '' };
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return {
    day: String(date.getDate()),
    month: date.toLocaleDateString(undefined, { month: 'short' }).toUpperCase(),
  };
}

const EventList = ({ events = [], selectedDate }) => {
  const visible = useMemo(() => {
    if (selectedDate) {
      return events.filter((e) => e.date === selectedDate);
    }
    return events.slice(0, 8);
  }, [events, selectedDate]);

  return (
    <section style={{ background: 'var(--off-white)', padding: '80px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 700,
            color: 'var(--navy)',
            margin: 0,
          }}>
            {selectedDate ? `Events on ${formatDateLong(selectedDate)}` : 'Upcoming Events'}
          </h2>
          <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
            {visible.length} {visible.length === 1 ? 'event' : 'events'}
          </span>
        </header>

        {visible.length === 0 ? (
          <div style={{
            background: 'var(--white)',
            border: '1px dashed #cbd5e1',
            borderRadius: 'var(--radius-lg)',
            padding: '48px 24px',
            textAlign: 'center',
            color: 'var(--muted)',
          }}>
            {selectedDate
              ? 'No events scheduled on this day.'
              : 'No upcoming events. Check back soon.'}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {visible.map((event) => {
              const cat = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.community;
              const badge = dateBadgeParts(event.date);
              return (
                <article
                  key={event.id || event.slug || event.title}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid #e5e7eb',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform var(--transition), box-shadow var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {event.image?.src ? (
                    <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={event.image.src}
                        alt={event.image.alt || event.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'var(--white)',
                        borderRadius: '10px',
                        padding: '6px 10px',
                        fontFamily: 'var(--font-serif)',
                        textAlign: 'center',
                        boxShadow: 'var(--shadow)',
                        lineHeight: 1,
                      }}>
                        <span style={{ display: 'block', fontSize: '20px', fontWeight: 800, color: 'var(--navy)' }}>{badge.day}</span>
                        <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: 'var(--accent)', marginTop: '2px' }}>{badge.month}</span>
                      </span>
                    </div>
                  ) : (
                    <div style={{
                      padding: '20px 24px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-serif)',
                        background: 'var(--off-white)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        textAlign: 'center',
                        lineHeight: 1,
                        minWidth: '54px',
                      }}>
                        <span style={{ display: 'block', fontSize: '22px', fontWeight: 800, color: 'var(--navy)' }}>{badge.day}</span>
                        <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: 'var(--accent)', marginTop: '2px' }}>{badge.month}</span>
                      </span>
                    </div>
                  )}

                  <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{
                      display: 'inline-block',
                      alignSelf: 'flex-start',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: cat.fg,
                      background: cat.bg,
                      padding: '4px 10px',
                      borderRadius: '99px',
                      marginBottom: '12px',
                    }}>
                      {event.category || 'event'}
                    </span>

                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--navy)',
                      lineHeight: 1.25,
                      margin: '0 0 8px',
                    }}>
                      {event.title}
                    </h3>

                    <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 12px' }}>
                      {formatDateLong(event.date)}
                      {event.time ? ` · ${event.time}` : ''}
                    </p>

                    {event.location && (
                      <p style={{ fontSize: '13px', color: 'var(--text)', margin: '0 0 12px' }}>
                        📍 {event.location}
                      </p>
                    )}

                    {event.excerpt && (
                      <p style={{
                        fontSize: '14px',
                        color: 'var(--muted)',
                        lineHeight: 1.6,
                        margin: '0 0 20px',
                        flex: 1,
                      }}>
                        {event.excerpt}
                      </p>
                    )}

                    {event.cta?.label && (
                      <div style={{ marginTop: 'auto' }}>
                        <Button
                          label={event.cta.label}
                          href={event.cta.href || '#'}
                          style="primary"
                          size="sm"
                        />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventList;
