import React, { useState } from 'react';
import Button from '../common/Button';
import '../../styles/sections/FaqAccordion.css';

/**
 * FaqAccordion — Section 8
 * Toggle questions with pure React state.
 * data: { tag, heading, subtitle, items[{ question, answer, defaultOpen }], footerCta }
 */
const FaqAccordion = ({ data }) => {
  if (!data || !data.items) return null;
  const { tag, heading, subtitle, items, footerCta } = data;

  const [openIndex, setOpenIndex] = useState(
    items.findIndex(item => item.defaultOpen)
  );

  const toggleItem = (i) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <section className="section faq" id={data.id || 'faq'}>
      <div className="container container--narrow">
        {tag && <p className="tag">{tag}</p>}
        <h2 className="section__heading">{heading}</h2>
        {subtitle && <p className="section__subtitle">{subtitle}</p>}

        <div className="faq-list">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button className="faq-item__trigger" onClick={() => toggleItem(i)}>
                  <span className="faq-item__question">{item.question}</span>
                  <span className="faq-item__icon">{isOpen ? '−' : '+'}</span>
                </button>
                <div className="faq-item__content">
                  <p className="faq-item__answer">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {footerCta && (
          <div className="faq-footer">
            {footerCta.heading && <h3 className="faq-footer__heading">{footerCta.heading}</h3>}
            {footerCta.body && <p className="faq-footer__body">{footerCta.body}</p>}
            {footerCta.cta && (
              <Button label={footerCta.cta.label} href={footerCta.cta.href} style={footerCta.cta.style} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FaqAccordion;
