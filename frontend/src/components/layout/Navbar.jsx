'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = ({ data }) => {
  const links = (data?.links && data.links.length > 0) ? data.links : [
    { label: 'About Us', href: '/about' },
    { label: 'Resources', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blogs', href: '#blog' },
    { label: 'Contact Us', href: '#newsletter' },
  ];

  // Resolve href: internal paths use Next.js Link, same-page hashes use <a>
  const resolveHref = (label, href) => {
    if (label === 'About Us') return '/about';
    return href || '#';
  };

  return (
    <nav className="nav">
      <div className="nav__inner">
        <Link href="/" className="nav__logo">
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
        </Link>

        <div className="nav__links">
          {links.map((link, idx) => {
            const href = resolveHref(link.label, link.href);
            const isInternal = href.startsWith('/');
            return isInternal ? (
              <Link key={idx} href={href} className="nav__link">
                {link.label}
              </Link>
            ) : (
              <a key={idx} href={href} className="nav__link">
                {link.label}
                {link.label === 'Resources' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                )}
              </a>
            );
          })}
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
