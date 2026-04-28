import React from 'react';

/**
 * Button — reusable button renderer for all DanceSing CTA styles.
 *
 * Props:
 *   label     string   — button text
 *   href      string   — link destination (default '#')
 *   style     string   — 'primary' | 'outline' | 'outline-dark' | 'accent' | 'text-arrow'
 *   size      string   — 'sm' for compact variant
 *   className string   — extra CSS classes
 *   onClick   function — if provided renders as <button> instead of <a>
 */
const Button = ({
  label,
  href = '#',
  style = 'primary',
  size = '',
  className = '',
  onClick = null,
}) => {
  const styleMap = {
    'primary':      'btn--primary',
    'outline':      'btn--outline',
    'outline-dark': 'btn--outline-dark',
    'accent':       'btn--accent',
    'text-arrow':   'btn--text-arrow',
  };

  const baseClass = styleMap[style] || styleMap['primary'];
  const sizeClass = size === 'sm' ? 'btn--sm' : '';

  // text-arrow has no .btn base wrapper
  const classes = style === 'text-arrow'
    ? `${baseClass} ${sizeClass} ${className}`.trim()
    : `btn ${baseClass} ${sizeClass} ${className}`.trim();

  const handleClick = (e) => {
    if (onClick) { onClick(e); return; }
    if (href.startsWith('#') && href.length > 1) {
      const el = document.getElementById(href.substring(1));
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', href);
      }
    }
  };

  if (onClick) {
    return <button className={classes} onClick={onClick}>{label}</button>;
  }

  return <a href={href} className={classes} onClick={handleClick}>{label}</a>;
};

export default Button;
