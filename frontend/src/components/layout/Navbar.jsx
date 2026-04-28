'use client';

import React from 'react';

const Navbar = ({ data }) => {
  console.log('[Navbar] Received Data:', data);
  const logoText = data?.logo_text || 'danceSing';
  const links = (data?.links && data.links.length > 0) ? data.links : [
    { label: 'About Us', href: '#about' },
    { label: 'Resources', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blogs', href: '#blog' },
    { label: 'Contact Us', href: '#newsletter' },
  ];

  const LogoSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 20V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V20H4ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z" fill="#F2F4F3"/>
    </svg>
  );

  return (
    <nav className="nav">
      <div className="nav__inner">
        <a href="#hero" className="nav__logo">
          {data?.logo?.src ? (
            <img 
              src={data.logo.src} 
              alt={data.logo.alt || 'danceSing'} 
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
            />
          ) : (
            <>
              <div className="nav__logo-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 12.5C14.5 12.5 16 11 16 9C16 7 14.5 5.5 12.5 5.5C10.5 5.5 9 7 9 9C9 11 10.5 12.5 12.5 12.5Z" fill="white"/>
                  <path d="M28 10C28 10 24 8 20 8C16 8 12 10 12 10C12 10 9 13 8 17C7 21 8 27 8 27C8 27 10 29 14 29C18 29 22 29 22 29C26 29 28 27 28 27C28 27 30 21 30 17C30 13 28 10 28 10Z" fill="white" fillOpacity="0.4"/>
                  <path d="M10 15C10 15 14 13 18 13C22 13 26 15 26 15C26 15 28 18 28 22C28 26 26 32 26 32C26 32 24 34 20 34C16 34 12 34 12 34C8 34 6 32 6 32C6 32 4 26 4 22C4 18 6 15 10 15Z" fill="white"/>
                  <path d="M14 34L11 38H17L19 34H14Z" fill="white"/>
                  <path d="M24 34L27 38H21L19 34H24Z" fill="white"/>
                </svg>
              </div>
              <div className="nav__logo-text">
                <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em', color: 'white', lineHeight: '1.1' }}>
                  danceSing
                </span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', textTransform: 'none', letterSpacing: '0.02em', fontWeight: '400' }}>
                  Enriching Lives
                </span>
              </div>
            </>
          )}
        </a>

        <div className="nav__links">
          {links.map((link, idx) => (
            <a key={idx} href={link.href} className="nav__link">
              {link.label}
              {link.label === 'Resources' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              )}
            </a>
          ))}
        </div>

        <div className="nav__cta-group">
          <a href={data?.login_href || '#login'} className="nav__btn-outline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>
            </svg>
            {data?.login_label || 'Login'}
          </a>
          <a href={data?.cta_href || '#cta'} className="nav__btn-solid">
            {data?.cta_label || 'Book a Demo'}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
