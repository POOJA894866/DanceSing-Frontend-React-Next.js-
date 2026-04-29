import React from 'react';

/**
 * StepsGrid — Section 5
 * 3 photo cards with step number overlay.
 * data: { tag, heading, subtitle, steps[{ number, heading, sub, image, cta }] }
 */
const StepsGrid = ({ data }) => {
  if (!data) return null;
  const { tag, heading, subtitle, steps } = data;

  return (
    <section className={`section steps bg-${data.background || 'white'}`} id={data.id || 'steps'} style={{ padding: '100px 0', background: '#f8fafc' }}>
      <div style={{ width: '100%', maxWidth: '1350px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>

        <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.15em', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
          EVIDENCE
        </span>

        <h2 style={{ fontSize: '44px', fontFamily: 'Sora', fontWeight: '300', color: '#283466', marginBottom: '24px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
          Why danceSing Works
        </h2>

        <p style={{ fontSize: '17px', fontWeight: '400', textAlign: 'center', fontFamily: 'Roboto, sans-serif', color: '#64748b', lineHeight: '1.7', maxWidth: '820px', margin: '0 auto 64px' }}>
          Our platform is based on research and real-world experience. Through ongoing evaluation, our programmes have consistently demonstrated positive outcomes for resident wellbeing, engagement, and quality of life.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', alignItems: 'stretch' }}>

          {/* Card 1: The Problem */}
          <div style={{ background: 'white', borderRadius: '20px', borderTop: '8px solid #1e2445', padding: '50px 40px', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1)', position: 'relative', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '500px' }}>
            <div>
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 60 60" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M29.8565 3.125H30.1435C35.9145 3.12498 40.437 3.12495 43.9657 3.59938C47.5775 4.08498 50.4277 5.09833 52.6647 7.33535C54.9017 9.57237 55.915 12.4224 56.4007 16.0343C56.875 19.563 56.875 24.0856 56.875 29.8565V30.1435C56.875 35.9145 56.875 40.437 56.4007 43.9657C55.915 47.5775 54.9017 50.4277 52.6647 52.6647C50.4277 54.9017 47.5775 55.915 43.9657 56.4007C40.437 56.875 35.9145 56.875 30.1435 56.875H29.8565C24.0856 56.875 19.563 56.875 16.0343 56.4007C12.4224 55.915 9.57237 54.9017 7.33535 52.6647C5.09833 50.4277 4.08498 47.5775 3.59938 43.9657C3.12495 40.437 3.12498 35.9145 3.125 30.1435V29.8565C3.12498 24.0856 3.12495 19.563 3.59938 16.0343C4.08498 12.4224 5.09833 9.57237 7.33535 7.33535C9.57237 5.09833 12.4224 4.08498 16.0343 3.59938C19.563 3.12495 24.0856 3.12498 29.8565 3.125ZM16.5339 7.31592C13.3379 7.74562 11.4111 8.56285 9.987 9.987C8.56285 11.4111 7.74562 13.3379 7.31592 16.5339C6.87897 19.7839 6.875 24.0544 6.875 30C6.875 35.9455 6.87897 40.216 7.31592 43.466C7.74562 46.662 8.56285 48.5887 9.987 50.013C11.4111 51.4372 13.3379 52.2545 16.5339 52.684C19.7839 53.121 24.0544 53.125 30 53.125C35.9455 53.125 40.216 53.121 43.466 52.684C46.662 52.2545 48.5887 51.4372 50.013 50.013C51.4372 48.5887 52.2545 46.662 52.684 43.466C53.121 40.216 53.125 35.9455 53.125 30C53.125 24.0544 53.121 19.7839 52.684 16.5339C52.2545 13.3379 51.4372 11.4111 50.013 9.987C48.5887 8.56285 46.662 7.74562 43.466 7.31592C40.216 6.87897 35.9455 6.875 30 6.875C24.0544 6.875 19.7839 6.87897 16.5339 7.31592ZM18.5 21.375C19.1213 20.5466 20.2966 20.3787 21.125 21L26.125 24.75C26.5972 25.104 26.875 25.6597 26.875 26.25C26.875 26.8402 26.5972 27.396 26.125 27.75L21.125 31.5C20.2966 32.1212 19.1213 31.9535 18.5 31.125C17.8787 30.2965 18.0466 29.1212 18.875 28.5L21.875 26.25L18.875 24C18.0466 23.3787 17.8787 22.2034 18.5 21.375ZM41.5 21.375C42.1212 22.2034 41.9535 23.3787 41.125 24L38.125 26.25L41.125 28.5C41.9535 29.1212 42.1212 30.2965 41.5 31.125C40.8787 31.9535 39.7035 32.1212 38.875 31.5L33.875 27.75C33.4027 27.396 33.125 26.8402 33.125 26.25C33.125 25.6597 33.4027 25.104 33.875 24.75L38.875 21C39.7035 20.3787 40.8787 20.5466 41.5 21.375ZM21.1742 38.6742L23.6742 36.1742C24.4064 35.442 25.5935 35.442 26.3257 36.1742L27.5 37.3482L28.6742 36.1742C29.4065 35.442 30.5935 35.442 31.3257 36.1742L32.5 37.3482L33.6742 36.1742C34.4065 35.442 35.5935 35.442 36.3257 36.1742L38.8257 38.6742C39.558 39.4065 39.558 40.5935 38.8257 41.3257C38.0935 42.058 36.9065 42.058 36.1742 41.3257L35 40.1517L33.8257 41.3257C33.0935 42.058 31.9065 42.058 31.1742 41.3257L30 40.1517L28.8257 41.3257C28.0935 42.058 26.9065 42.058 26.1742 41.3257L25 40.1517L23.8258 41.3257C23.0936 42.058 21.9064 42.058 21.1742 41.3257C20.4419 40.5935 20.4419 39.4065 21.1742 38.6742Z" fill="#283466" />
                </svg>
              </div>
              <h3 style={{ fontSize: '25px', fontFamily: 'Sora', fontWeight: '300', color: '#283466', marginBottom: '24px' }}>The Problem</h3>

              <ul style={{ padding: 0, fontSize: '30px', margin: 0, listStyle: 'none', fontFamily: 'Roboto, sans-serif' }}>
                {[
                  "Care teams are working incredibly hard, often under increasing pressure.",
                  "Older adults often need more variety and stimulation in daily activities.",
                  "Traditional activities are limited by time, resources, or shifting interests."
                ].map((text, idx, arr) => (
                  <li key={idx} style={{ display: 'flex', gap: '12px', paddingBottom: idx === arr.length - 1 ? 0 : '16px', marginBottom: idx === arr.length - 1 ? 0 : '16px', borderBottom: idx === arr.length - 1 ? 'none' : '1px solid #e2e8f0', fontSize: '15px', color: '#475569', lineHeight: '1.5' }}>
                    <span style={{ color: '#64748b', fontWeight: 'bold' }}>→</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span style={{ fontSize: '72px', fontWeight: '900', color: '#c7ccd2ff', position: 'absolute', bottom: '20px', right: '32px', zIndex: 1 }}>01</span>
          </div>

          {/* Card 2: The Solutions */}
          <div style={{ background: 'white', fontFamily: 'Sora', borderRadius: '20px', borderTop: '8px solid #1e2445', padding: '50px 40px', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1)', position: 'relative', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '500px' }}>
            <div>
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 60 60" fill="none">
                  <path d="M47.25 22.8559L54.6562 21.6934" stroke="#283466" strokeWidth="3" />
                  <path d="M44.9375 16.0406L49.5687 13.3125" stroke="#283466" strokeWidth="3" />
                  <path d="M40.2109 10.9973L43.3234 4.22852" stroke="#283466" strokeWidth="3" />
                  <path d="M31.3578 10.0223L31.3203 4.65039" stroke="#283466" strokeWidth="3" />
                  <path d="M22.7687 11.3348L20.2656 4.22852" stroke="#283466" strokeWidth="3" />
                  <path d="M16.8641 15.9652L12.1484 13.3965" stroke="#283466" strokeWidth="3" />
                  <path d="M14.7969 22.4723L7.53125 21.2441" stroke="#283466" strokeWidth="3" />
                  <path d="M24.5812 42.6281C24.5812 37.7906 21.5906 33.7312 19.9781 30.7312C19.0823 29.0654 18.6121 27.204 18.6094 25.3125C18.6094 18.9469 24.4312 13.7812 30.7969 13.7812" stroke="#283466" strokeWidth="3" />
                  <path d="M37.0125 42.6281C37.0125 37.7906 40.0031 33.7312 41.6156 30.7312C42.5115 29.0654 42.9817 27.204 42.9844 25.3125C42.9844 18.9469 37.1625 13.7812 30.7969 13.7812" stroke="#283466" strokeWidth="3" />
                  <path d="M37.9156 42.3652H24.1438C23.0461 42.3652 22.1562 43.2551 22.1562 44.3527V44.3621C22.1562 45.4598 23.0461 46.3496 24.1438 46.3496H37.9156C39.0133 46.3496 39.9031 45.4598 39.9031 44.3621V44.3527C39.9031 43.2551 39.0133 42.3652 37.9156 42.3652Z" stroke="#283466" strokeWidth="3" />
                  <path d="M36.8266 46.3398H25.2297C24.132 46.3398 23.2422 47.2297 23.2422 48.3273V48.3367C23.2422 49.4344 24.132 50.3242 25.2297 50.3242H36.8266C37.9242 50.3242 38.8141 49.4344 38.8141 48.3367V48.3273C38.8141 47.2297 37.9242 46.3398 36.8266 46.3398Z" stroke="#283466" strokeWidth="3" />
                  <path d="M34.0469 50.3242V51.1117C34.0797 51.5281 34.0261 51.9469 33.8892 52.3416C33.7524 52.7362 33.5354 53.0984 33.2519 53.4051C32.9684 53.7119 32.6245 53.9567 32.2418 54.1241C31.8591 54.2915 31.4458 54.3779 31.0281 54.3779C30.6104 54.3779 30.1972 54.2915 29.8145 54.1241C29.4318 53.9567 29.0879 53.7119 28.8043 53.4051C28.5208 53.0984 28.3038 52.7362 28.167 52.3416C28.0302 51.9469 27.9765 51.5281 28.0094 51.1117V50.3242" stroke="#283466" strokeWidth="3" />
                  <path d="M23.0312 24.6087C23.0781 23.6858 23.3063 22.7811 23.7031 21.9465C24.0998 21.1118 24.6571 20.3636 25.3432 19.7445C26.0294 19.1254 26.8308 18.6477 27.7017 18.3386C28.5726 18.0295 29.4959 17.8951 30.4188 17.9431" stroke="#283466" strokeWidth="3" />
                </svg>
              </div>
              <h3 style={{ fontSize: '24px', fontFamily: 'Sora', fontWeight: '300', color: '#283466', marginBottom: '24px' }}>The Solutions</h3>

              <ul style={{ padding: 0, margin: 0, listStyle: 'none', fontFamily: 'Roboto, sans-serif' }}>
                {[
                  "An easy-to-use digital platform with fun activities for older people in care.",
                  "Music, movement, and mindfulness to boost health and happiness.",
                  "Staff have access to training and resources to support their care efforts."
                ].map((text, idx, arr) => (
                  <li key={idx} style={{ display: 'flex', gap: '12px', paddingBottom: idx === arr.length - 1 ? 0 : '16px', marginBottom: idx === arr.length - 1 ? 0 : '16px', borderBottom: idx === arr.length - 1 ? 'none' : '1px solid #e2e8f0', fontSize: '15px', color: '#475569', lineHeight: '1.5' }}>
                    <span style={{ color: '#1e2445', fontWeight: 'bold' }}>✓</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span style={{ fontSize: '72px', fontFamily: 'Sora', fontWeight: '900', color: '#c7ccd2ff', position: 'absolute', bottom: '20px', right: '32px', zIndex: 1 }}>02</span>
          </div>

          {/* Card 3: The Impact */}
          <div style={{ background: 'white', borderRadius: '20px', borderTop: '8px solid #1e2445', padding: '50px 40px', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1)', position: 'relative', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '500px' }}>
            <div>
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 60 60" fill="none">
                  <path d="M52.5 52.5H15.5C12.6997 52.5 11.2996 52.5 10.2301 51.955C9.28923 51.4757 8.52432 50.7108 8.04497 49.77C7.5 48.7005 7.5 47.3002 7.5 44.5V7.5M17.5 37.5L30 22.5L40 32.5L52.5 17.5" stroke="#283466" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontSize: '24px', fontFamily: 'Sora', fontWeight: '300', color: '#283466', marginBottom: '12px' }}>The Impact</h3>
              <p style={{ fontSize: '14px', fontWeight: '100px', fontFamily: 'Roboto, sans-serif', color: '#64748b', marginBottom: '20px', lineHeight: '1.4' }}>An easy-to-use digital platform with fun activities for older people in care.</p>

              <div style={{ display: 'grid', fontWeight:'100px', color: '#283466', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px 16px' }}>
                {[
                  { label: 'Depression', value: '49%↓' },
                  { label: 'Anxiety', value: '34%↓' },
                  { label: 'Staff stress', value: '21%↓' },
                  { label: 'Loneliness', value: '29%↓' },
                  { label: 'Stress', value: '28%↓' },
                  { label: 'Job satisfaction', value: '12%↑' },
                  { label: 'Sleep quality', value: '25%↑' },
                  { label: 'DHEA immunity', value: '62%↑' }
                ].map((stat, idx) => (
                  <div key={idx} style={{ paddingLeft: '16px', borderLeft: '3px solid #1e2445', borderTop: '3px solid transparent', borderBottom: '3px solid transparent', borderRadius: '16px 0 0 16px', textAlign: 'left' }}>
                    <strong style={{ fontSize: '26px', fontFamily: 'Sora', fontWeight: '800', color: '#1e2445', display: 'block', lineHeight: '1.1' }}>
                      {stat.value.slice(0, -1)}
                      <span style={{ fontSize: '18px' }}>{stat.value.slice(-1)}</span>
                    </strong>
                    <span style={{ fontSize: '13px', fontFamily: 'Roboto, sans-serif', color: '#64748b', fontWeight: '400', display: 'block', marginTop: '6px' }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <span style={{ fontSize: '72px', fontFamily: 'Sora', fontWeight: '900', color: '#c7ccd2ff', position: 'absolute', bottom: '20px', right: '32px', zIndex: 1 }}>03</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsGrid;
