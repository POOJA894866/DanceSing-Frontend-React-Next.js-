import React from 'react';

const Footer = ({ data }) => {
  return (
    <footer style={{ background: '#283466', padding: '80px 0 40px 0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Main Columns Container (Border removed to match design) */}
        <div style={{ padding: '48px 40px', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr', gap: '40px', alignItems: 'start', marginBottom: '40px' }}>
          
          {/* Brand Column */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '20px' }}>
              <img src="/images/logo-footer.png" alt="danceSing" style={{ height: '56px', width: 'auto', display: 'block' }} />
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '24px' }}>
              Transforming Later Life Wellbeing through Music, Movement and Mindfulness. Registered with the Information Commissioner&apos;s Office (ICO), Reg. No. ZA754451.
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
