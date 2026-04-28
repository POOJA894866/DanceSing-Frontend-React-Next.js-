import React from 'react';
import '../../styles/sections/StepsGrid.css';

/**
 * StepsGrid — Section 5
 * 3 photo cards with step number overlay.
 * data: { tag, heading, subtitle, steps[{ number, heading, sub, image, cta }] }
 */
const StepsGrid = ({ data }) => {
  if (!data) return null;
  const { tag, heading, subtitle, steps } = data;

  return (
    <section className="section steps" id={data.id || 'how-it-works'}>
      <div className="container">
        {tag && <p className="tag">{tag}</p>}
        <h2 className="section__heading">{heading}</h2>
        {subtitle && <p className="section__subtitle">{subtitle}</p>}

        <div className="steps-grid">
          {(steps || []).map((step, i) => (
            <article key={i} className="step-card">
              <div className="step-card__img-wrap">
                {step.image?.src && (
                  <img src={step.image.src} alt={step.image.alt || step.heading} loading="lazy" />
                )}
                <div className="step-card__overlay">
                  <span className="step-card__number">{step.number}</span>
                  <h3 className="step-card__heading">{step.heading}</h3>
                  {step.sub && <p className="step-card__sub">{step.sub}</p>}
                  {step.cta && (
                    <a href={step.cta.href} className="step-card__link">
                      {step.cta.label || 'Learn More'} →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsGrid;
