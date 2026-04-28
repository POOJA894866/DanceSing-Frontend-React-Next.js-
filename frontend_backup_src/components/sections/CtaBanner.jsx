import React from 'react';
import Button from '../common/Button';
import '../../styles/sections/CtaBanner.css';

/**
 * CtaBanner — Section 3
 * Dark navy strip: text left / video thumbnail right.
 * data: { heading, subtitle, image, ctas[] }
 */
const CtaBanner = ({ data }) => {
  if (!data) return null;
  const { heading, subtitle, image, ctas } = data;

  return (
    <section className="cta-banner" id={data.id || 'cta-banner'}>
      <div className="container cta-banner__inner">

        <div className="cta-banner__text">
          <h2 className="cta-banner__heading">{heading}</h2>
          {subtitle && <p className="cta-banner__body">{subtitle}</p>}
          {ctas?.length > 0 && (
            <div className="cta-banner__ctas">
              {ctas.map((cta, i) => (
                <Button key={i} label={cta.label} href={cta.href} style={cta.style} />
              ))}
            </div>
          )}
        </div>

        {image?.src && (
          <div className="cta-banner__media">
            <img src={image.src} alt={image.alt || 'Online class'} loading="lazy" />
            <div className="cta-banner__play" aria-label="Play video">▶</div>
          </div>
        )}

      </div>
    </section>
  );
};

export default CtaBanner;
