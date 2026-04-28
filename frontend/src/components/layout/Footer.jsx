import React from 'react';

const Footer = ({ data }) => {
  return (
    <footer style={{ background: '#283466', padding: '80px 0 40px 0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Main Columns Container (Border removed to match design) */}
        <div style={{ padding: '48px 40px', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr', gap: '40px', alignItems: 'start', marginBottom: '40px' }}>
          
          {/* Brand Column */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              {/* Logo SVG */}
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 12.5C14.5 12.5 16 11 16 9C16 7 14.5 5.5 12.5 5.5C10.5 5.5 9 7 9 9C9 11 10.5 12.5 12.5 12.5Z" fill="white"/>
                <path d="M28 10C28 10 24 8 20 8C16 8 12 10 12 10C12 10 9 13 8 17C7 21 8 27 8 27C8 27 10 29 14 29C18 29 22 29 22 29C26 29 28 27 28 27C28 27 30 21 30 17C30 13 28 10 28 10Z" fill="white" fillOpacity="0.4"/>
                <path d="M10 15C10 15 14 13 18 13C22 13 26 15 26 15C26 15 28 18 28 22C28 26 26 32 26 32C26 32 24 34 20 34C16 34 12 34 12 34C8 34 6 32 6 32C6 32 4 26 4 22C4 18 6 15 10 15Z" fill="white"/>
                <path d="M14 34L11 38H17L19 34H14Z" fill="white"/>
                <path d="M24 34L27 38H21L19 34H24Z" fill="white"/>
              </svg>
              <div>
                <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em', color: 'white', lineHeight: '1.1', display: 'block' }}>
                  danceSing
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', textTransform: 'none', letterSpacing: '0.05em', fontWeight: '400' }}>
                  Enriching Lives
                </span>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '24px' }}>
              Transforming Later Life Wellbeing through Music, Movement and Mindfulness. Registered with the Information Commissioner's Office (ICO), Reg. No. ZA754451.
            </p>
            
            {/* Socials */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {['f', 'X', 'y', 'i', 'in'].map((social, i) => (
                <span key={i} style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#cbd5e1', letterSpacing: '0.1em', marginBottom: '20px' }}>QUICK LINKS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Home', 'About Us', 'Care', 'Training', 'On Air', 'Lifestyle'].map((item, i) => (
                <a key={i} href="#" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}>{item}</a>
              ))}
            </div>
          </div>

          {/* Information */}
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#cbd5e1', letterSpacing: '0.1em', marginBottom: '20px' }}>INFORMATION</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Contact', 'Research Hub', 'Case Studies', 'Academic Papers'].map((item, i) => (
                <a key={i} href="#" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}>{item}</a>
              ))}
            </div>
          </div>

          {/* Support */}
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#cbd5e1', letterSpacing: '0.1em', marginBottom: '20px' }}>SUPPORT</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Get Help', 'support@dancesing.online', 'Plans & Pricing', 'Organisation Plans', 'Team Plans'].map((item, i) => (
                <a key={i} href="#" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}>{item}</a>
              ))}
            </div>
          </div>

          {/* Important */}
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#cbd5e1', letterSpacing: '0.1em', marginBottom: '20px' }}>IMPORTANT</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Privacy Policy', 'Terms of Use', 'Cookie Settings', 'Accessibility', 'Shop'].map((item, i) => (
                <a key={i} href="#" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}>{item}</a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Copyright © 2026 by danceSing · Registered with ICO No. ZA754451 · Website redesigned with care
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy', 'Cookies', 'Accessibility', 'Contact'].map((item, i) => (
              <a key={i} href="#" style={{ color: '#64748b', fontSize: '13px', textDecoration: 'none' }}>{item}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
