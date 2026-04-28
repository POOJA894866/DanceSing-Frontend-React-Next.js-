import React, { useState } from 'react';
import '../../styles/sections/Newsletter.css';

/**
 * Newsletter — Section 9
 * Dark background email form.
 * data: { heading, subtitle, inputPlaceholder, submitLabel, disclaimer }
 */
const Newsletter = ({ data }) => {
  if (!data) return null;
  const { heading, subtitle, inputPlaceholder, submitLabel, disclaimer } = data;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future Wagtail forms integration point
    console.log('Subscribing email:', email);
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="newsletter" id={data.id || 'newsletter'}>
      <div className="container newsletter__inner">
        <h2 className="newsletter__heading">
          {heading.split(/\n|\\n/).map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>

        {subtitle && <p className="newsletter__subtitle">{subtitle}</p>}

        {status === 'success' ? (
          <p className="newsletter__success">Welcome to the community! Check your inbox soon.</p>
        ) : (
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter__input"
              placeholder={inputPlaceholder || 'Enter your email address'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn--accent">
              {submitLabel || 'Sign Up Free'}
            </button>
          </form>
        )}

        {disclaimer && <p className="newsletter__disclaimer">{disclaimer}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
