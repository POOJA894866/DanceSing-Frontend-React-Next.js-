'use client';
import React from 'react';
import { useTrainingPageData } from '../../hooks/useTrainingPageData';
import { useHomePageData } from '../../hooks/useHomePageData';
import TrainingHero from '../sections/TrainingHero';
import TrainingPlatform from '../sections/TrainingPlatform';
import TrainingJourney from '../sections/TrainingJourney';
// Importing other sections that might be added to the Training page via Wagtail
import CtaBanner from '../sections/CtaBanner';
import Testimonials from '../sections/Testimonials';
import FaqAccordion from '../sections/FaqAccordion';
import Newsletter from '../sections/Newsletter';
import ContactSection from '../sections/ContactSection';

export default function TrainingPage() {
  const { data, loading } = useTrainingPageData();
  const { loading: globalLoading } = useHomePageData();

  if (loading || globalLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6f8', color: '#1a5e7b' }}>
        <p style={{ fontSize: '1.2rem', fontFamily: 'Sora, sans-serif' }}>Loading Training...</p>
      </div>
    );
  }

  return (
    <main>
      {data?.sections?.map((sec, idx) => {
        if (sec.type === 'training-hero') {
          return <TrainingHero key={idx} data={sec} />;
        }
        if (sec.type === 'training-platform') {
          return <TrainingPlatform key={idx} data={sec} />;
        }
        if (sec.type === 'training-journey') {
          return <TrainingJourney key={idx} data={sec} />;
        }
        if (sec.type === 'cta-banner') {
          return <CtaBanner key={idx} data={sec} />;
        }
        if (sec.type === 'testimonials') {
          return <Testimonials key={idx} data={sec} />;
        }
        if (sec.type === 'faq-accordion') {
          return <FaqAccordion key={idx} data={sec} />;
        }
        if (sec.type === 'newsletter') {
          return <Newsletter key={idx} data={sec} />;
        }
        if (sec.type === 'contact-section') {
          return <ContactSection key={idx} data={sec} />;
        }
        return null;
      })}
    </main>
  );
}
