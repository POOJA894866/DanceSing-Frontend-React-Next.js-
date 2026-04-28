import React from 'react';
import Button from '../common/Button';
import '../../styles/sections/Hero.css';

/**
 * Hero — Section 1
 * Full-viewport dark image + stats row below content.
 * data: { tag, heading, body, image, stats[], ctas[] }
 */
const Hero = ({ data }) => {
  if (!data) return null;
  const { tag, heading, body, image, stats, ctas } = data;

  return (
    <section className="hero" id={data.id || 'hero'}>
      <div className="hero__image-fallback" />

      {image?.src && (
        <img
          src={image.src}
          alt={image.alt || 'DanceSing hero'}
          className="hero__bg"
          loading="eager"
        />
      )}

      <div className="hero__overlay" />

      <div className="hero__content">
        {tag && <p className="tag tag--light">{tag}</p>}

        <h1 className="hero__heading">
          {heading.split(/\n|\\n/).map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>

        <p className="hero__body">{body}</p>

        {ctas?.length > 0 && (
          <div className="hero__ctas">
            {ctas.map((cta, i) => (
              <Button key={i} label={cta.label} href={cta.href} style={cta.style} />
            ))}
          </div>
        )}
      </div>

      {stats?.length > 0 && (
        <div className="hero__stats">
          {stats.map((stat, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
