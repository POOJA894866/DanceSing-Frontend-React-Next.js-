import React from 'react';
import Button from '../common/Button';
import '../../styles/sections/AboutSplit.css';

/**
 * AboutSplit — Section 4
 * 2-col split: text + stats one side, image other side.
 * data: { tag, heading, body, imagePosition, image, stats[], ctas[] }
 */
const AboutSplit = ({ data }) => {
  if (!data) return null;
  const { tag, heading, body, imagePosition, image, stats, ctas } = data;
  const reverse = imagePosition === 'left';

  return (
    <section className="section about" id={data.id || 'about'}>
      <div className={`container split-grid${reverse ? ' split-grid--reverse' : ''}`}>

        <div className="split-grid__text">
          {tag && <p className="tag">{tag}</p>}
          <h2 className="section__heading">{heading}</h2>
          {body && <p className="section__body">{body}</p>}

          {stats?.length > 0 && (
            <div className="stats-row">
              {stats.map((stat, i) => (
                <div key={i} className="stat">
                  <span className="stat__value">{stat.value}</span>
                  <span className="stat__label">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {ctas?.length > 0 && (
            <div className="cta-row">
              {ctas.map((cta, i) => (
                <Button key={i} label={cta.label} href={cta.href} style={cta.style} />
              ))}
            </div>
          )}
        </div>

        {image?.src && (
          <div className="split-grid__image">
            <img src={image.src} alt={image.alt || heading} loading="lazy" />
          </div>
        )}

      </div>
    </section>
  );
};

export default AboutSplit;
