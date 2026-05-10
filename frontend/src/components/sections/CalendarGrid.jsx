'use client';

import React, { useMemo, useState } from 'react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function pad(n) {
  return n < 10 ? `0${n}` : String(n);
}

function isoFor(year, monthIndex, day) {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}

function todayIso() {
  const d = new Date();
  return isoFor(d.getFullYear(), d.getMonth(), d.getDate());
}

function buildMonthGrid(viewYear, viewMonth) {
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const dayOfWeek = firstOfMonth.getDay();
  const mondayOffset = (dayOfWeek + 6) % 7;
  const startDate = new Date(viewYear, viewMonth, 1 - mondayOffset);

  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    cells.push({
      date: d,
      iso: isoFor(d.getFullYear(), d.getMonth(), d.getDate()),
      day: d.getDate(),
      inMonth: d.getMonth() === viewMonth,
    });
  }
  return cells;
}

const CalendarGrid = ({ events = [], selectedDate, onSelectDate }) => {
  const now = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const eventDates = useMemo(() => {
    const set = new Set();
    for (const e of events) {
      if (e?.date) set.add(e.date);
    }
    return set;
  }, [events]);

  const cells = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);
  const today = todayIso();

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const goToday = () => {
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    onSelectDate?.(null);
  };

  const handleCellClick = (cell) => {
    if (!onSelectDate) return;
    if (selectedDate === cell.iso) {
      onSelectDate(null);
    } else {
      onSelectDate(cell.iso);
    }
  };

  return (
    <section style={{ background: 'var(--white)', padding: '80px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 700,
            color: 'var(--navy)',
            margin: 0,
          }}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h2>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous month"
              style={navBtnStyle}
            >
              ←
            </button>
            <button
              type="button"
              onClick={goToday}
              style={{
                ...navBtnStyle,
                width: 'auto',
                padding: '0 16px',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              Today
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next month"
              style={navBtnStyle}
            >
              →
            </button>
          </div>
        </header>

        <div className="calendar-grid-wrap" style={{
          background: 'var(--off-white)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          border: '1px solid #e5e7eb',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
            marginBottom: '8px',
          }}>
            {WEEKDAY_LABELS.map((label) => (
              <div key={label} style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                textAlign: 'center',
                padding: '8px 0',
              }}>
                {label}
              </div>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '6px',
          }}>
            {cells.map((cell) => {
              const hasEvent = eventDates.has(cell.iso);
              const isToday = cell.iso === today;
              const isSelected = selectedDate === cell.iso;
              return (
                <button
                  key={cell.iso}
                  type="button"
                  onClick={() => handleCellClick(cell)}
                  disabled={!hasEvent}
                  aria-pressed={isSelected}
                  aria-label={`${cell.iso}${hasEvent ? ' — has events' : ''}`}
                  style={{
                    aspectRatio: '1 / 1',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--navy)' : (isToday ? 'var(--accent)' : 'transparent'),
                    background: isSelected ? 'var(--navy)' : 'var(--white)',
                    color: isSelected ? 'var(--white)' : (cell.inMonth ? 'var(--text)' : '#cbd5e1'),
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    cursor: hasEvent ? 'pointer' : 'default',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background var(--transition), border-color var(--transition), color var(--transition)',
                    opacity: cell.inMonth ? 1 : 0.5,
                  }}
                  onMouseEnter={(e) => {
                    if (hasEvent && !isSelected) {
                      e.currentTarget.style.background = 'rgba(40, 52, 102, 0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (hasEvent && !isSelected) {
                      e.currentTarget.style.background = 'var(--white)';
                    }
                  }}
                >
                  <span>{cell.day}</span>
                  {hasEvent && (
                    <span aria-hidden="true" style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: isSelected ? 'var(--white)' : 'var(--accent)',
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <p style={{
          marginTop: '16px',
          fontSize: '13px',
          color: 'var(--muted)',
          textAlign: 'center',
        }}>
          {selectedDate
            ? <>Showing events on <strong style={{ color: 'var(--navy)' }}>{selectedDate}</strong>. Tap the date again to clear.</>
            : 'Tap a highlighted date to see events for that day.'}
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .calendar-grid-wrap {
            padding: 12px !important;
          }
        }
      `}</style>
    </section>
  );
};

const navBtnStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '1px solid #e5e7eb',
  background: 'var(--white)',
  color: 'var(--navy)',
  fontSize: '18px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'inherit',
  transition: 'background var(--transition), border-color var(--transition)',
};

export default CalendarGrid;
