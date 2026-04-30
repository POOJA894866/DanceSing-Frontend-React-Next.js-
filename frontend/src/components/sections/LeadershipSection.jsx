'use client';
import React from 'react';

const LeadershipSection = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'LEADERSHIP';
  const heading = data.heading || 'The two people who started it all';
  const subtitle = data.subtitle || 'Led by two passionate founders and supported by a dedicated team, danceSing is redefining wellness in care — both in the UK and internationally.';
  const members = data.members?.length > 0 ? data.members : [
    {
      name: 'Natalie Garry',
      role: 'CHIEF EXECUTIVE OFFICER · CO-FOUNDER',
      bio: 'Natalie is the visionary behind danceSing, bringing her passion for wellness, music, and community to every aspect of the platform. She leads the company\'s strategic direction, partnerships, and mission to enrich the lives of older adults through evidence-based programmes.\n\nHer commitment to accessible, dignified, and joyful care has shaped danceSing into a platform trusted by hundreds of care communities across the UK and beyond.',
      linkedin: '#',
      image: { src: '/images/nat.jpg' }
    },
    {
      name: 'Claire Hunt',
      role: 'CHIEF OPERATING OFFICER · CO-FOUNDER',
      bio: 'Claire drives the operational excellence that keeps danceSing growing at scale. With a sharp focus on delivery, partnerships, and the real-world needs of care settings, she ensures that every programme reaches the people who need it most — reliably and effectively.\n\nHer background in health and care operations means she brings both practical expertise and genuine empathy to every challenge the team faces.',
      linkedin: '#',
      image: { src: '/images/cla.jpg' }
    }
  ];

  return (
    <section style={{
      background: 'white',
      padding: '90px 5% 90px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '700px', margin: '0 auto 60px' }}>
        <span style={{
          fontSize: '13px',
          fontFamily: 'Sora, sans-serif',
          fontWeight: '300',
          color: '#02020A',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '16px',
        }}>
          {tag}
        </span>
        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 40px)',
          fontFamily: 'Sora, sans-serif',
          fontWeight: '90',
          color: '#283466',
          lineHeight: '1.2',
          marginBottom: '20px',
        }}>
          {heading}
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#02020A',
          lineHeight: '1.65',
          maxWidth: '900px',
          textAlign: 'center',
          margin: '0 auto',
        }}>
          {subtitle}
        </p>
      </div>

      {/* Cards */}
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '55px',
      }}>
        {members.map((member, i) => (
          <div key={i} style={{
            background: 'white',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1.5px solid #e2e8f0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(40, 52, 102, 0.05)',
          }}>
            {/* Top Navy Section */}
            <div style={{
              background: '#283466',
              padding: '24px',
              color: 'white',
            }}>
              {/* Image with Padding */}
              <div style={{
                width: '100%',
                aspectRatio: '1/1',
                background: member.image?.src ? 'transparent' : 'rgba(255,255,255,0.08)',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '24px',
              }}>
                {member.image?.src ? (
                  <img
                    src={member.image.src}
                    alt={member.image.alt || member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Name & Role Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px',
              }}>
                <div>
                  <h3 style={{
                    fontSize: '30px',
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: '100',
                    color: 'white',
                    margin: '0 0 8px',
                    lineHeight: '1.1',
                  }}>
                    {member.name}
                  </h3>
                  <p style={{
                    fontSize: '12.5px',
                    fontWeight: '400',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}>
                    {member.role}
                  </p>
                </div>
                {/* LinkedIn Icon */}
                <a href={member.linkedin || '#'} target="_blank" rel="noopener noreferrer" style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  textDecoration: 'none',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#283466">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Bottom Bio Section */}
            <div style={{
              padding: '30px 24px',
              flexGrow: 1,
              background: '#f8fafc',
            }}>
              {member.bio.split('\n').map((para, idx) => (
                para.trim() && (
                  <p key={idx} style={{
                    fontSize: '14.5px',
                    fontFamily: 'Roboto',
                    textAlign: 'justify',
                    color: 'black',
                    lineHeight: '1.65',
                    margin: idx === 0 ? '0 0 16px' : '16px 0 0',
                  }}>
                    {para}
                  </p>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeadershipSection;
