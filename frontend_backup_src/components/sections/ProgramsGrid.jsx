import React from 'react';
import Button from '../common/Button';
import '../../styles/sections/ProgramsGrid.css';

/**
 * ProgramsGrid — Section 2
 * 3-col cards: Body / Mind / Soul programs.
 * data: { tag, heading, subtitle, cards[{ tag, heading, body, image, cta }] }
 */
const ProgramsGrid = ({ data }) => {
  if (!data) return null;
  const { tag, heading, subtitle, cards } = data;

  return (
    <section className="section programs" id={data.id || 'programs'}>
      <div className="container">
        {tag && <p className="tag">{tag}</p>}
        <h2 className="section__heading">{heading}</h2>
        {subtitle && <p className="section__subtitle">{subtitle}</p>}

        <div className="cards-grid">
          {(cards || []).map((card, i) => (
            <article key={i} className="card">
              <div className="card__img-wrap">
                {card.image?.src && (
                  <img src={card.image.src} alt={card.image.alt || card.heading} loading="lazy" />
                )}
                {card.tag && <span className="card__tag">{card.tag}</span>}
              </div>
              <div className="card__body">
                <h3 className="card__heading">{card.heading}</h3>
                {card.body && <p className="card__text">{card.body}</p>}
                {card.cta && (
                  <Button label={card.cta.label} href={card.cta.href} style={card.cta.style} />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsGrid;
