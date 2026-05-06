'use client';

import React from 'react';
import { useLifestylePageData } from '../../hooks/useLifestylePageData';
import LifestyleHero from '../sections/LifestyleHero';
import LifestyleProgramme from '../sections/LifestyleProgramme';
import LifestyleDisciplines from '../sections/LifestyleDisciplines';
import LifestyleEvidence from '../sections/LifestyleEvidence';
import LifestyleRadio from '../sections/LifestyleRadio';
import LifestyleConsultation from '../sections/LifestyleConsultation';
import LifestyleTestimonials from '../sections/LifestyleTestimonials';
import LifestyleFaq from '../sections/LifestyleFaq';
import LifestyleContact from '../sections/LifestyleContact';

const componentMap = {
  'lifestyle-hero':        LifestyleHero,
  'lifestyle-programme':   LifestyleProgramme,
  'lifestyle-disciplines': LifestyleDisciplines,
  'lifestyle-evidence':    LifestyleEvidence,
  'lifestyle-radio':       LifestyleRadio,
  'lifestyle-consultation': LifestyleConsultation,
  'lifestyle-testimonials': LifestyleTestimonials,
  'lifestyle-faq':         LifestyleFaq,
  'lifestyle-contact':     LifestyleContact,
};

export default function LifestylePage() {
  const { data, loading, error } = useLifestylePageData();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #f0f6f2 0%, #ffffff 100%)',
          color: '#2d5a3d',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          {/* Spinner ring */}
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '3px solid rgba(45,90,61,0.15)',
              borderTop: '3px solid #2d5a3d',
              borderRadius: '50%',
              margin: '0 auto 20px',
              animation: 'spin 0.9s linear infinite',
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p
            style={{
              fontSize: '15px',
              letterSpacing: '0.05em',
              fontFamily: 'Sora, sans-serif',
              color: '#2d5a3d',
              margin: 0,
            }}
          >
            Loading Lifestyle...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0f6f2',
          color: '#8B2020',
        }}
      >
        <p style={{ fontSize: '1.1rem', fontFamily: 'Sora, sans-serif' }}>
          Connection error: {error.message}
        </p>
      </div>
    );
  }

  const sections = data?.sections || [];

  return (
    <main>
      {sections.map((sec, idx) => {
        const Component = componentMap[sec.type];
        if (!Component) {
          console.warn(`[LifestylePage] No component found for type: ${sec.type}`);
          return null;
        }
        try {
          return <Component key={sec.id || idx} data={sec} />;
        } catch (err) {
          console.error(`[LifestylePage] Error rendering section ${sec.type}:`, err);
          return null;
        }
      })}
    </main>
  );
}
