'use client';
import React from 'react';

const OurGallery = ({ data }) => {
  if (!data) return null;

  const tag = data.tag || 'OUR GALLERY';
  const heading = data.heading || 'Building Memories Together';
  const subtitle = data.subtitle || 'Discover how our wellbeing solutions bring movement, music, and connection to care environments and everyday life.';
  
  // We'll split the images into two rows to match the screenshot collage.
  const images = data.images || [];
  
  // Fill up to 8 images with placeholders if empty
  const galleryImages = Array.from({ length: 8 }).map((_, i) => images[i] || { src: '', alt: '' });

  // Define flex ratios to match the screenshot layout
  const topRowFlex = [1.3, 0.8, 1.8, 0.5]; // 4 images
  const bottomRowFlex = [1.1, 0.7, 1.1, 1.2]; // 4 images

  const topRow = galleryImages.slice(0, 4);
  const bottomRow = galleryImages.slice(4, 8);

  const renderImage = (img, flexRatio, idx) => (
    <div key={idx} style={{
      flex: flexRatio,
      height: '100%',
      minWidth: '150px',
      borderRadius: '20px',
      background: '#e2e8f0', // Placeholder color
      overflow: 'hidden',
      position: 'relative',
    }}>
      {img?.src ? (
        <img 
          src={img.src} 
          alt={img.alt || 'Gallery image'} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : null}
    </div>
  );

  return (
    <section style={{
      background: 'white',
      padding: '90px 0', // Full width for the gallery images
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative stars/diamonds background */}
      {[
        { top: '10%', left: '50%' }, { top: '5%', left: '60%' }, { top: '3%', left: '75%' },
        { top: '12%', left: '65%' }, { top: '8%', left: '85%' }, { top: '18%', left: '78%' },
        { top: '22%', left: '86%' }, { top: '20%', left: '94%' },
        { bottom: '15%', left: '5%' }, { bottom: '5%', left: '10%' }, { bottom: '10%', left: '20%' },
        { bottom: '2%', left: '30%' }, { bottom: '8%', left: '42%' }, { bottom: '4%', left: '55%' },
        { bottom: '12%', left: '68%' }, { bottom: '5%', left: '80%' }, { bottom: '15%', left: '90%' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos,
          width: '8px', height: '8px',
          border: '1px solid rgba(40, 52, 102, 0.15)',
          transform: 'rotate(45deg)',
          borderRadius: '1px',
        }} />
      ))}

      {/* Header Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 5%',
        marginBottom: '50px',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ maxWidth: '650px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#64748b',
            display: 'block',
            marginBottom: '16px',
          }}>
            {tag}
          </span>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 46px)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: '800',
            color: '#283466',
            lineHeight: '1.2',
            marginBottom: '16px',
          }}>
            {heading}
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#334155',
            lineHeight: '1.6',
          }}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* Gallery Collage Rows */}
      <div style={{ paddingLeft: '5%', overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          gap: '20px',
          height: '280px', // Top row height
          marginBottom: '20px',
          width: '120%', // Make it overflow the right side slightly to match screenshot
        }}>
          {topRow.map((img, i) => renderImage(img, topRowFlex[i], i))}
        </div>

        <div style={{
          display: 'flex',
          gap: '20px',
          height: '320px', // Bottom row is slightly taller
          width: '115%',
          transform: 'translateX(-2%)', // Slight offset for staggered look
        }}>
          {bottomRow.map((img, i) => renderImage(img, bottomRowFlex[i], i))}
        </div>
      </div>

    </section>
  );
};

export default OurGallery;
