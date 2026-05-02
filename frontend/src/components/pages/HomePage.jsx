'use client';

import React from 'react';
import { useHomePageData } from '../../hooks/useHomePageData';

import Hero from '../sections/Hero';
import ProgramsGrid from '../sections/ProgramsGrid';
import CtaBanner from '../sections/CtaBanner';
import AboutSplit from '../sections/AboutSplit';
import StepsGrid from '../sections/StepsGrid';
import FeatureList from '../sections/FeatureList';
import FeaturesGrid from '../sections/FeaturesGrid';
import Testimonials from '../sections/Testimonials';
import FaqAccordion from '../sections/FaqAccordion';
import Newsletter from '../sections/Newsletter';

const componentMap = {
  'hero': Hero,
  'programs-grid': ProgramsGrid,
  'cards-grid': ProgramsGrid,
  'cta-banner': CtaBanner,
  'about-split': AboutSplit,
  'split-feature': AboutSplit,
  'steps-grid': StepsGrid,
  'feature-list': FeatureList,
  'features-grid': FeaturesGrid,
  'testimonials': Testimonials,
  'faq-accordion': FaqAccordion,
  'newsletter': Newsletter,
};

export default function HomePage() {
  const { data, loading, error } = useHomePageData();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a1128', color: '#ffffff' }}>
        <p style={{ fontSize: '1.2rem', letterSpacing: '0.05em' }}>Loading wellness experience...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a1128', color: '#ff4d4d' }}>
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
          console.warn(`[HomePage] No component found for type: ${sec.type}`);
          return null;
        }
        try {
          return <Component key={sec.id || idx} data={sec} />;
        } catch (err) {
          console.error(`[HomePage] Error rendering section ${sec.type}:`, err);
          return null;
        }
      })}
    </main>
  );
}
