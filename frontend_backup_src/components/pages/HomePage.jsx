import React from 'react';
import { useHomePageData } from '../../hooks/useHomePageData';

// Section components
import Hero         from '../sections/Hero';
import ProgramsGrid from '../sections/ProgramsGrid';
import CtaBanner    from '../sections/CtaBanner';
import AboutSplit   from '../sections/AboutSplit';
import StepsGrid    from '../sections/StepsGrid';
import FeatureList  from '../sections/FeatureList';
import PlansGrid    from '../sections/PlansGrid';
import FaqAccordion from '../sections/FaqAccordion';
import Newsletter   from '../sections/Newsletter';

/**
 * Map each section `type` value (from the API / content.json)
 * to the corresponding React component.
 */
const SECTION_COMPONENTS = {
  'hero':          Hero,
  'programs-grid': ProgramsGrid,
  'cta-banner':    CtaBanner,
  'about-split':   AboutSplit,
  'steps-grid':    StepsGrid,
  'feature-list':  FeatureList,
  'plans-grid':    PlansGrid,
  'faq-accordion': FaqAccordion,
  'newsletter':    Newsletter,
};

/**
 * HomePage
 *
 * Fetches content from the Wagtail API (with automatic fallback to
 * local content.json) then renders each section dynamically.
 */
const HomePage = () => {
  const { data, loading, error } = useHomePageData();

  if (loading) {
    return (
      <main className="homepage-loading">
        <div className="homepage-loading__spinner" aria-label="Loading content…" />
      </main>
    );
  }

  if (error || !data || !data.sections) {
    return (
      <main className="homepage-error">
        <p>Unable to load page content. Please try again later.</p>
      </main>
    );
  }

  return (
    <main>
      {data.sections.map((section, idx) => {
        const SectionComponent = SECTION_COMPONENTS[section.type];

        if (!SectionComponent) {
          console.warn(`[HomePage] Unknown section type: "${section.type}"`);
          return null;
        }

        return (
          <SectionComponent
            key={section.id || `section-${idx}`}
            data={section}
          />
        );
      })}
    </main>
  );
};

export default HomePage;
