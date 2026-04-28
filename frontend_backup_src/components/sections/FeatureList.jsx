import React from 'react';
import Button from '../common/Button';
import '../../styles/sections/FeatureList.css';

/**
 * FeatureList — Section 6
 * Alternating 2-col rows of image & text.
 * data: { tag, heading, items[{ tag, heading, body, image, ctas[] }] }
 */
const FeatureList = ({ data }) => {
  if (!data || !data.items) return null;
  const { tag, heading, items } = data;

  return (
    <section className="section features" id={data.id || 'features'}>
      <div className="container">
        {tag && <p className="tag">{tag}</p>}
        {heading && <h2 className="section__heading">{heading}</h2>}

        <div className="features-list">
          {items.map((item, i) => {
            const isEven = i % 2 === 1;
            return (
              <div key={i} className={`feature-row${isEven ? ' feature-row--reverse' : ''}`}>
                <div className="feature-row__text">
                  {item.tag && <span className="feature-row__tag">{item.tag}</span>}
                  <h3 className="feature-row__heading">{item.heading}</h3>
                  <p className="feature-row__body">{item.body}</p>
                  {item.ctas?.length > 0 && (
                    <div className="feature-row__ctas">
                      {item.ctas.map((cta, ci) => (
                        <Button key={ci} label={cta.label} href={cta.href} style={cta.style} />
                      ))}
                    </div>
                  )}
                </div>
                {item.image?.src && (
                  <div className="feature-row__image">
                    <img src={item.image.src} alt={item.image.alt || item.heading} loading="lazy" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureList;
