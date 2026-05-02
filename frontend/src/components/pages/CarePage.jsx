'use client';

import React from 'react';
import { useCarePageData } from '../../hooks/useCarePageData';

import CareHero from '../sections/CareHero';
import CarePlatform from '../sections/CarePlatform';
import CareEvidence from '../sections/CareEvidence';
import CareOutcomes from '../sections/CareOutcomes';
import CareConsultation from '../sections/CareConsultation';
import CareTestimonials from '../sections/CareTestimonials';
import CareFaq from '../sections/CareFaq';
import CareContact from '../sections/CareContact';

const componentMap = {
  'care-hero': CareHero,
  'care-platform': CarePlatform,
  'care-evidence': CareEvidence,
  'care-outcomes': CareOutcomes,
  'care-consultation': CareConsultation,
  'care-testimonials': CareTestimonials,
  'care-faq': CareFaq,
  'care-contact': CareContact,
};

export default function CarePage() {
  const { data, loading, error } = useCarePageData();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fdfaf8',
        color: '#283466',
      }}>
        <p style={{ fontSize: '1.2rem', letterSpacing: '0.05em', fontFamily: 'Sora, sans-serif' }}>
          Loading care resources...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fdfaf8',
        color: '#8B2020',
      }}>
        <p style={{ fontSize: '1.2rem' }}>Connection error: {error.message}</p>
      </div>
    );
  }

  const sections = data?.sections || [];

  return (
    <main>
      {sections.map((sec, idx) => {
        const Component = componentMap[sec.type];
        if (!Component) {
          console.warn(`[CarePage] No component found for type: ${sec.type}`);
          return null;
        }
        try {
          return <Component key={sec.id || idx} data={sec} />;
        } catch (err) {
          console.error(`[CarePage] Error rendering section ${sec.type}:`, err);
          return null;
        }
      })}
    </main>
  );
}
