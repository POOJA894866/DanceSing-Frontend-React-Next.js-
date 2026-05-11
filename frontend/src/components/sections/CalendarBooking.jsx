'use client';

import React, { useMemo, useState } from 'react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DEFAULT_FORM_FIELDS = [
  { label: 'Full Name', name: 'full_name', placeholder: 'Jane Smith', field_type: 'text', required: true, options: [] },
  { label: 'Work email address', name: 'email', placeholder: 'jane@carehome.co.uk', field_type: 'email', required: true, options: [] },
  { label: 'Phone number', name: 'phone', placeholder: '+44 7700 000000', field_type: 'tel', required: false, options: [] },
  { label: 'Organisation name', name: 'organisation', placeholder: 'Elmhurst Care Home', field_type: 'text', required: true, options: [] },
  { label: 'Which product are you interested in?', name: 'product', placeholder: 'Select a product...', field_type: 'select', required: true, options: ['danceSing Care', 'danceSing Lifestyle', 'danceSing Training', 'Not sure yet'] },
  { label: "Anything you'd like us to know?", name: 'message', placeholder: 'Tell us a bit about your setting or any specific questions...', field_type: 'textarea', required: false, options: [] },
];

function pad(n) { return n < 10 ? `0${n}` : String(n); }
function isoFor(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}`; }
function todayIso() {
  const d = new Date();
  return isoFor(d.getFullYear(), d.getMonth(), d.getDate());
}

function buildMonthCells(year, monthIndex) {
  const firstDayWeekday = new Date(year, monthIndex, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const prevMonthDays = new Date(year, monthIndex, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDayWeekday; i++) {
    const day = prevMonthDays - firstDayWeekday + 1 + i;
    cells.push({ day, inMonth: false, iso: isoFor(year, monthIndex - 1, day) });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, inMonth: true, iso: isoFor(year, monthIndex, day) });
  }
  while (cells.length % 7 !== 0) {
    const day = cells.length - (firstDayWeekday + daysInMonth) + 1;
    cells.push({ day, inMonth: false, iso: isoFor(year, monthIndex + 1, day) });
  }
  return cells;
}

function formatLongDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const ord = (n) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const month = date.toLocaleDateString('en-GB', { month: 'long' });
  return `${month} ${d}${ord(d)}, ${weekday}`;
}

const CalendarBooking = ({ data }) => {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const cells = useMemo(() => buildMonthCells(viewYear, viewMonth), [viewYear, viewMonth]);
  const todayStr = todayIso();

  const cfg = data || {};
  const datesHeading = cfg.dates_heading || 'Select your dates';
  const datesSubtitle = cfg.dates_subtitle || 'Pick any available slot from the calendar below';
  const legendAvailable = cfg.legend_available || 'Available';
  const legendNotAvailable = cfg.legend_not_available || 'Not Available';
  const legendToday = cfg.legend_today || 'Today';
  const timezoneText = cfg.timezone_text || 'All times shown in UK time (GMT+1) · British Summer Time';
  const slotSubtitle = cfg.slot_section_subtitle || 'Select a 30-minute window for your demo';
  const timeSlots = cfg.default_time_slots?.length
    ? cfg.default_time_slots
    : ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00'];

  const detailsHeading = cfg.details_heading || 'Enter your details';
  const detailsSubtitle = cfg.details_subtitle || "We'll confirm your booking by email within a few minutes.";
  const dateConfirmedLabel = cfg.date_confirmed_label || 'DATE CONFIRMED';
  const timeConfirmedLabel = cfg.time_confirmed_label || 'UK TIME CONFIRMED';
  const requiredNote = cfg.required_note || 'Fields marked * are required';
  const submitLabel = cfg.submit_label || 'Request this slot →';
  const formFields = cfg.form_fields?.length ? cfg.form_fields : DEFAULT_FORM_FIELDS;

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else setViewMonth(viewMonth - 1);
  };
  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else setViewMonth(viewMonth + 1);
  };

  const handleSelectDay = (cell) => {
    if (!cell.inMonth) return;
    if (cell.iso < todayStr) return;
    setSelectedDate(cell.iso);
    setSelectedSlot(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleFieldChange = (name, value) => {
    setFormValues((v) => ({ ...v, [name]: value }));
  };

  const showConfirmedBar = selectedDate && selectedSlot;

  return (
    <section className="cal-booking" id="booking">
      <div className="cal-booking__inner">
        {/* LEFT — Calendar + Time slots */}
        <div className="cal-booking__left">
          <header className="cal-booking__header">
            <h2 className="cal-booking__heading">{datesHeading}</h2>
            <p className="cal-booking__subtitle">{datesSubtitle}</p>
          </header>

          <div className="cal-card">
            <div className="cal-card__nav">
              <button type="button" onClick={goPrev} aria-label="Previous month" className="cal-icon-btn">‹</button>
              <div className="cal-card__title">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </div>
              <button type="button" onClick={goNext} aria-label="Next month" className="cal-icon-btn">›</button>
            </div>

            <div className="cal-card__weekdays">
              {WEEKDAY_LABELS.map((lbl) => (
                <div key={lbl} className="cal-card__weekday">{lbl}</div>
              ))}
            </div>

            <div className="cal-card__grid">
              {cells.map((cell, i) => {
                const isPast = cell.iso < todayStr;
                const isSelected = cell.iso === selectedDate;
                const isToday = cell.iso === todayStr;
                const isAvailable = cell.inMonth && !isPast;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectDay(cell)}
                    disabled={!isAvailable}
                    className={[
                      'cal-day',
                      isSelected ? 'cal-day--selected' : '',
                      isToday && !isSelected ? 'cal-day--today' : '',
                      !cell.inMonth ? 'cal-day--out' : '',
                      isPast && cell.inMonth ? 'cal-day--past' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>

            <div className="cal-legend">
              <span><i className="cal-swatch cal-swatch--avail" />{legendAvailable}</span>
              <span><i className="cal-swatch cal-swatch--na" />{legendNotAvailable}</span>
              <span><i className="cal-swatch cal-swatch--today" />{legendToday}</span>
            </div>
            <div className="cal-tz">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{timezoneText}</span>
            </div>
          </div>

          <div className="cal-slots">
            <h3 className="cal-slots__heading">
              {selectedDate ? formatLongDate(selectedDate) : 'Select a date'}
            </h3>
            <p className="cal-slots__sub">{slotSubtitle}</p>
            <div className="cal-slots__grid">
              {timeSlots.map((t) => {
                const active = selectedSlot === t;
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={!selectedDate}
                    onClick={() => setSelectedSlot(t)}
                    className={`cal-slot ${active ? 'cal-slot--active' : ''}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT — Details form */}
        <div className="cal-booking__right">
          <header className="cal-booking__header">
            <h2 className="cal-booking__heading">{detailsHeading}</h2>
            <p className="cal-booking__subtitle">{detailsSubtitle}</p>
          </header>

          <form className="cal-form" onSubmit={handleSubmit} noValidate>
            {showConfirmedBar && (
              <div className="cal-confirmed">
                <div className="cal-confirmed__col">
                  <span className="cal-confirmed__icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>
                  <div>
                    <div className="cal-confirmed__label">{dateConfirmedLabel}</div>
                    <div className="cal-confirmed__value">{formatLongDate(selectedDate)}</div>
                  </div>
                </div>
                <div className="cal-confirmed__divider" />
                <div className="cal-confirmed__col">
                  <span className="cal-confirmed__icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <div>
                    <div className="cal-confirmed__label">{timeConfirmedLabel}</div>
                    <div className="cal-confirmed__value">{selectedSlot}</div>
                  </div>
                </div>
              </div>
            )}

            <p className="cal-form__required">{requiredNote}</p>

            {formFields.map((f) => {
              const labelTxt = f.required ? `${f.label} *` : f.label;
              if (f.field_type === 'textarea') {
                return (
                  <div key={f.name} className="cal-field">
                    <label className="cal-field__label">{labelTxt}</label>
                    <textarea
                      name={f.name}
                      placeholder={f.placeholder}
                      required={f.required}
                      rows={4}
                      value={formValues[f.name] || ''}
                      onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      className="cal-field__textarea"
                    />
                  </div>
                );
              }
              if (f.field_type === 'select') {
                return (
                  <div key={f.name} className="cal-field">
                    <label className="cal-field__label">{labelTxt}</label>
                    <select
                      name={f.name}
                      required={f.required}
                      value={formValues[f.name] || ''}
                      onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      className="cal-field__input"
                    >
                      <option value="" disabled>{f.placeholder || 'Select...'}</option>
                      {(f.options || []).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                );
              }
              return (
                <div key={f.name} className="cal-field">
                  <label className="cal-field__label">{labelTxt}</label>
                  <input
                    type={f.field_type || 'text'}
                    name={f.name}
                    placeholder={f.placeholder}
                    required={f.required}
                    value={formValues[f.name] || ''}
                    onChange={(e) => handleFieldChange(f.name, e.target.value)}
                    className="cal-field__input"
                  />
                </div>
              );
            })}

            <button type="submit" className="cal-form__submit">
              {submitLabel}
            </button>

            {submitted && (
              <p className="cal-form__success" role="status">
                Thanks — we&apos;ve received your request and will confirm by email shortly.
              </p>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .cal-booking {
          background: #f4f6f8;
          padding: 90px 0 100px;
          color: var(--text);
        }
        .cal-booking__inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 64px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: flex-start;
        }
        .cal-booking__header { margin-bottom: 28px; }
        .cal-booking__heading {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.2;
          margin: 0 0 8px;
        }
        .cal-booking__subtitle {
          color: var(--muted);
          font-size: 15px;
          margin: 0;
        }
        .cal-card {
          background: var(--white);
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
          margin-bottom: 28px;
        }
        .cal-card__nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 4px 14px;
        }
        .cal-card__title {
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--navy);
          font-size: 16px;
        }
        .cal-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: var(--white);
          color: var(--navy);
          font-size: 22px;
          cursor: pointer;
          line-height: 1;
        }
        .cal-icon-btn:hover { background: #f8fafc; }
        .cal-card__weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          padding: 6px 0;
        }
        .cal-card__weekday {
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: var(--muted);
          letter-spacing: 0.04em;
        }
        .cal-card__grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          padding: 6px 0 12px;
        }
        .cal-day {
          aspect-ratio: 1 / 1;
          border: none;
          background: transparent;
          color: var(--text);
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .cal-day:hover:not(:disabled):not(.cal-day--selected) {
          background: rgba(40, 52, 102, 0.08);
        }
        .cal-day:disabled { cursor: default; }
        .cal-day--out { color: #cbd5e1; }
        .cal-day--past { color: #cbd5e1; }
        .cal-day--today {
          color: var(--navy);
          font-weight: 700;
          background: rgba(40, 52, 102, 0.06);
        }
        .cal-day--selected {
          background: var(--navy);
          color: var(--white);
          font-weight: 700;
        }
        .cal-legend {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          padding: 14px 12px 8px;
          border-top: 1px solid #f1f5f9;
          font-size: 13px;
          color: var(--text);
        }
        .cal-legend span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .cal-swatch {
          display: inline-block;
          width: 14px;
          height: 14px;
          border-radius: 3px;
        }
        .cal-swatch--avail { background: #1a1f3c; }
        .cal-swatch--na { background: #cbd5e1; }
        .cal-swatch--today { background: var(--navy); }
        .cal-tz {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          font-size: 13px;
          color: var(--muted);
          background: #f8fafc;
          border-radius: 0 0 12px 12px;
          margin: 6px -16px -16px;
        }
        .cal-tz svg { color: var(--navy); flex-shrink: 0; }

        .cal-slots {
          background: var(--white);
          border-radius: 14px;
          padding: 24px;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
        }
        .cal-slots__heading {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 4px;
        }
        .cal-slots__sub {
          font-size: 13px;
          color: var(--muted);
          margin: 0 0 18px;
        }
        .cal-slots__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .cal-slot {
          padding: 10px 0;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          cursor: pointer;
          font-family: inherit;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .cal-slot:hover:not(:disabled) {
          border-color: var(--navy);
          color: var(--navy);
        }
        .cal-slot:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .cal-slot--active {
          background: var(--navy);
          border-color: var(--navy);
          color: var(--white);
        }

        .cal-form {
          background: var(--white);
          border-radius: 14px;
          padding: 28px;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
        }
        .cal-confirmed {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px 18px;
          margin-bottom: 18px;
        }
        .cal-confirmed__col {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }
        .cal-confirmed__icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--navy);
          color: var(--white);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cal-confirmed__divider {
          width: 1px;
          height: 36px;
          background: #e2e8f0;
        }
        .cal-confirmed__label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--muted);
          margin-bottom: 2px;
        }
        .cal-confirmed__value {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--navy);
        }
        .cal-form__required {
          color: var(--muted);
          font-size: 14px;
          margin: 0 0 16px;
        }
        .cal-field { margin-bottom: 16px; }
        .cal-field__label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 6px;
        }
        .cal-field__input,
        .cal-field__textarea {
          width: 100%;
          padding: 12px 14px;
          font-size: 14px;
          font-family: inherit;
          color: var(--text);
          border: 1px solid #d9dde3;
          border-radius: 8px;
          background: var(--white);
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .cal-field__input:focus,
        .cal-field__textarea:focus {
          outline: none;
          border-color: var(--navy);
          box-shadow: 0 0 0 3px rgba(40, 52, 102, 0.12);
        }
        .cal-field__textarea { resize: vertical; min-height: 96px; }
        .cal-form__submit {
          width: 100%;
          background: var(--navy);
          color: var(--white);
          border: none;
          padding: 14px 16px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          margin-top: 6px;
          transition: background 0.2s;
        }
        .cal-form__submit:hover { background: #1f2954; }
        .cal-form__success {
          margin-top: 14px;
          color: #15803d;
          font-size: 14px;
          font-weight: 600;
        }
        @media (max-width: 960px) {
          .cal-booking__inner {
            grid-template-columns: 1fr;
            padding: 0 24px;
            gap: 36px;
          }
          .cal-booking__heading { font-size: 26px; }
          .cal-confirmed { flex-direction: column; align-items: stretch; gap: 12px; }
          .cal-confirmed__divider { display: none; }
        }
      `}</style>
    </section>
  );
};

export default CalendarBooking;
