'use client';

import React from 'react';
import { useCalendarPageData } from '../../hooks/useCalendarPageData';
import { useHomePageData } from '../../hooks/useHomePageData';
import CalendarHero from '../sections/CalendarHero';
import CalendarBooking from '../sections/CalendarBooking';
import CalendarStats from '../sections/CalendarStats';
import CalendarIntro from '../sections/CalendarIntro';
import CtaBanner from '../sections/CtaBanner';
import FaqAccordion from '../sections/FaqAccordion';
import ContactSection from '../sections/ContactSection';
import Newsletter from '../sections/Newsletter';

const SECTION_RENDERERS = {
  'calendar-hero':    (sec, k) => <CalendarHero    key={k} data={sec} />,
  'calendar-booking': (sec, k) => <CalendarBooking key={k} data={sec} />,
  'calendar-stats':   (sec, k) => <CalendarStats   key={k} data={sec} />,
  'calendar-intro':   (sec, k) => <CalendarIntro   key={k} data={sec} />,
  'cta-banner':       (sec, k) => <CtaBanner       key={k} data={sec} />,
  'faq-accordion':    (sec, k) => <FaqAccordion    key={k} data={sec} />,
  'contact-section':  (sec, k) => <ContactSection  key={k} data={sec} />,
  'newsletter':       (sec, k) => <Newsletter      key={k} data={sec} />,
};

export default function CalendarPage() {
  const { data, loading } = useCalendarPageData();
  const { loading: globalLoading } = useHomePageData();

  if (loading || globalLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f4f6f8',
        color: '#1a5e7b',
      }}>
        <p style={{ fontSize: '1.2rem', fontFamily: 'Sora, sans-serif' }}>Loading Calendar...</p>
      </div>
    );
  }

  const sections = data?.sections || [];

  return (
    <main>
      {sections.map((sec, idx) => {
        const renderer = SECTION_RENDERERS[sec.type];
        return renderer ? renderer(sec, idx) : null;
      })}
    </main>
  );
}
