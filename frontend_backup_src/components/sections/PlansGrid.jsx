import React from 'react';
import Button from '../common/Button';
import '../../styles/sections/PlansGrid.css';

/**
 * PlansGrid — Section 7
 * 3 pricing cards on a dark background.
 * data: { tag, heading, subtitle, plans[{ name, price, period, featured, features[], cta }] }
 */
const PlansGrid = ({ data }) => {
  if (!data || !data.plans) return null;
  const { tag, heading, subtitle, plans } = data;

  return (
    <section className="section plans" id={data.id || 'pricing'}>
      <div className="container">
        {tag && <p className="tag tag--light">{tag}</p>}
        <h2 className="section__heading">{heading}</h2>
        {subtitle && <p className="section__subtitle">{subtitle}</p>}

        <div className="plans-grid">
          {plans.map((plan, i) => (
            <article key={i} className={`plan-card ${plan.featured ? 'plan-card--featured' : ''}`}>
              {plan.featured && <span className="plan-card__badge">Most Popular</span>}
              
              <div className="plan-card__header">
                <h3 className="plan-card__name">{plan.name}</h3>
                <div className="plan-card__price-wrap">
                  <span className="plan-card__price">{plan.price}</span>
                  {plan.period && <span className="plan-card__period">{plan.period}</span>}
                </div>
              </div>

              <ul className="plan-card__features">
                {(plan.features || []).map((feat, fi) => (
                  <li key={fi} className="plan-card__feature">{feat}</li>
                ))}
              </ul>

              {plan.cta && (
                <div className="plan-card__cta">
                  <Button 
                    label={plan.cta.label} 
                    href={plan.cta.href} 
                    style={plan.featured ? 'accent' : 'outline'} 
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansGrid;
