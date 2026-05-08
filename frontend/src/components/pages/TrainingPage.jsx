'use client';
import React from 'react';
import { useTrainingPageData } from '../../hooks/useTrainingPageData';
import { useHomePageData } from '../../hooks/useHomePageData';
import TrainingHero from '../sections/TrainingHero';
import TrainingPlatform from '../sections/TrainingPlatform';
import TrainingJourney from '../sections/TrainingJourney';
import TrainingSupport from '../sections/TrainingSupport';
import TrainingOutcomes from '../sections/TrainingOutcomes';
import TrainingConsultation from '../sections/TrainingConsultation';
import TrainingBeyondCare from '../sections/TrainingBeyondCare';
import TrainingTestimonials from '../sections/TrainingTestimonials';
import TrainingFaq from '../sections/TrainingFaq';
import TrainingContact from '../sections/TrainingContact';
// Importing other sections that might be added to the Training page via Wagtail
import CtaBanner from '../sections/CtaBanner';
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
        if (sec.type === 'training-support') {
          return <TrainingSupport key={idx} data={sec} />;
        }
        if (sec.type === 'training-outcomes') {
          return <TrainingOutcomes key={idx} data={sec} />;
        }
        if (sec.type === 'training-consultation') {
          return <TrainingConsultation key={idx} data={sec} />;
        }
        if (sec.type === 'training-beyond-care') {
          return <TrainingBeyondCare key={idx} data={sec} />;
        }
        if (sec.type === 'cta-banner') {
          return <CtaBanner key={idx} data={sec} />;
        }
        if (sec.type === 'training-testimonials') {
          return <TrainingTestimonials key={idx} data={sec} />;
        }
        if (sec.type === 'training-faq') {
          return <TrainingFaq key={idx} data={sec} />;
        }
        if (sec.type === 'training-contact') {
          return <TrainingContact key={idx} data={sec} />;
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
