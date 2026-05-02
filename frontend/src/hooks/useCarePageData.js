'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_ENDPOINT = `${API_BASE_URL}/api/carepage/`;

function fixImageUrl(src) {
  if (!src) return src;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return API_BASE_URL.replace(/\/$/, '') + '/' + src.replace(/^\//, '');
}

function fixSectionImages(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(fixSectionImages);

  const fixed = { ...obj };
  if (fixed.image && typeof fixed.image === 'object' && fixed.image.src) {
    fixed.image = { ...fixed.image, src: fixImageUrl(fixed.image.src) };
  }

  const listFields = ['items', 'cards', 'steps', 'plans', 'sections', 'features', 'images'];
  for (const field of listFields) {
    if (Array.isArray(fixed[field])) {
      fixed[field] = fixed[field].map(fixSectionImages);
    }
  }

  return fixed;
}

export const useCarePageData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timestamp = new Date().getTime();
        const urlWithCacheBuster = `${API_ENDPOINT}?t=${timestamp}`;
        console.log('[useCarePageData] fetching from:', urlWithCacheBuster);

        const response = await fetch(urlWithCacheBuster, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          // 404 means no Care page in CMS yet — use defaults
          if (response.status === 404) {
            throw new TypeError('Care page not found in CMS — using defaults');
          }
          throw new Error(`API status ${response.status}`);
        }

        const apiData = await response.json();

        const rawSections = apiData.sections || [];
        const sections = rawSections.map(fixSectionImages);

        if (!sections.length) {
          throw new Error('API returned 0 sections — CMS may have no published page');
        }

        console.log('[useCarePageData] Success — loaded from Wagtail API');
        setData({
          sections,
          navigation: fixSectionImages(apiData.navigation),
          footer: fixSectionImages(apiData.footer),
        });
        setError(null);
      } catch (err) {
        const isNetworkError = err instanceof TypeError;
        const isEmptyCms = err.message.includes('0 sections');

        console.warn('[useCarePageData] Using default data. Reason:', err.message);

        if (!isNetworkError && !isEmptyCms) {
          console.error('[useCarePageData] Non-recoverable API error:', err.message);
          setError(err);
          setLoading(false);
          return;
        }

        // Return default data
        setData({ sections: getDefaultSections(), navigation: null, footer: null });
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

function getDefaultSections() {
  return [
    {
      type: 'care-hero',
      tag: 'Trusted by 200+ communities',
      heading: 'Wellness That Enriches\nEvery Care Community',
      body: 'A trusted, comprehensive wellness platform that enriches lives, supports care teams, and strengthens your community\'s quality and compliance — making it an essential part of senior living.',
      image: null,
      features: [
        {
          icon: 'music',
          title: 'Music',
          description: 'Engages memory, lifts mood, and fosters social connection — especially powerful for residents living with dementia.',
        },
        {
          icon: 'movement',
          title: 'Movement',
          description: 'Improves physical mobility, balance, and confidence — reducing falls and increasing independence in daily activities.',
        },
        {
          icon: 'mindfulness',
          title: 'Mindfulness',
          description: 'Lowers stress and anxiety, supports emotional health, and helps residents and staff find daily calm and connection.',
        },
      ],
      ctas: [
        { label: 'Book a Demo', href: '#demo', style: 'primary' },
        { label: 'Choose Care Resources →', href: '#resources', style: 'outline-dark' },
      ],
    },
    {
      type: 'care-platform',
      tag: 'MORE THAN A PROGRAMME',
      heading: 'The Platform - The Heartbeat Of Your Community',
      body: 'danceSing is more than a wellness tool. It is a central hub for community life — bringing people together, supporting staff, and creating an atmosphere your residents will genuinely look forward to every single day.',
      cards: [
        {
          title: 'Connection',
          description: 'Builds real connection among residents and staff, actively reducing social isolation and loneliness across your community.',
          image: null,
        },
        {
          title: 'Science-Backed',
          description: 'Safe, science-backed resources for all abilities — developed and independently validated with three leading UK universities.',
          image: null,
        },
        {
          title: 'User Experience',
          description: 'Easy to implement — step-by-step facilitation guides, staff training materials, and an intuitive platform anyone can use from day one.',
          image: null,
        },
        {
          title: 'Great Atmosphere',
          description: 'Creates a positive culture — a joyful daily atmosphere that residents talk about, families notice, and staff are proud to deliver.',
          image: null,
        },
      ],
      ctas: [
        { label: 'Book a Demo', href: '#demo', style: 'primary' },
        { label: 'Choose Care Resources →', href: '#resources', style: 'outline' },
      ],
    },
    {
      type: 'care-evidence',
      tag: 'EVIDENCE',
      heading: 'Why Care Resource Works',
      body: 'Our platform is based on research and real-life experience. Through ongoing evaluation, our programmes have consistently demonstrated positive outcomes for resident wellbeing, engagement, and quality of life.',
      cards: [
        {
          icon: 'patient',
          tag: 'PATIENT',
          title: 'Wellbeing, Belonging & Independence.',
          items: [
            { title: 'Improved wellbeing', text: 'Music, movement, and mindfulness support mental, emotional, and physical health every day.' },
            { title: 'Greater confidence', text: 'Improved mobility reduces fear of falling and encourages daily participation.' },
            { title: 'Increased independence', text: 'Activities develop fine motor skills like the pincer grip, helping residents manage daily tasks — using cutlery, brushing teeth — with less reliance on staff.' },
            { title: 'Social engagement', text: 'Shared sessions foster friendship, connection, and inclusion across the community.' },
          ]
        },
        {
          icon: 'staff',
          tag: 'STAFF & CARE TEAMS',
          title: 'Confidence, Capability & Job Satisfaction.',
          items: [
            { title: 'Ready-to-use resources', text: 'Less preparation time means more meaningful moments with residents and less daily pressure.' },
            { title: 'Built-in facilitation guides', text: 'Step-by-step support so any team member can lead sessions with genuine confidence.' },
            { title: 'Better job satisfaction', text: '12% increase when teams feel skilled, supported, and purposeful in their daily roles.' },
            { title: 'Lower staff stress', text: 'Structured daily tools reduce decision fatigue and workload pressure by 21%.' },
          ]
        },
        {
          icon: 'leadership',
          tag: 'LEADERSHIP & MANAGEMENT',
          title: 'Compliance, Reporting & Strategic Value',
          items: [
            { title: 'Usage reporting', text: 'Team & Organisation plans include engagement dashboards to track and demonstrate activity levels.' },
            { title: 'Supports compliance', text: 'Evidence-based wellbeing activities align with regulatory frameworks and quality assurance standards.' },
            { title: 'Scalable across sites', text: 'Organisation plans support multi-site rollout with dedicated account management and custom onboarding.' },
            { title: 'Quarterly review sessions', text: 'Regular check-ins to ensure the platform is meeting your organisation\'s goals.' },
          ]
        },
        {
          icon: 'community',
          tag: 'COMMUNITY',
          title: 'Culture, Reputation & Cohesion',
          items: [
            { title: 'A stronger community identity', text: 'Shared daily rituals build a positive, distinctive culture residents and families notice.' },
            { title: 'Family reassurance', text: 'Families see and feel the difference, hence improving satisfaction, trust, and your community\'s reputation.' },
            { title: 'Dementia-inclusive by design', text: 'Every session is built to include residents at every cognitive level, leaving no one behind.' },
            { title: 'A healthier, happier home', text: 'The cumulative effect of daily joy creates an environment that attracts and retains great staff.' },
          ]
        }
      ]
    },
    {
      type: 'care-outcomes',
      tag: 'UNIVERSITY VALIDATED OUTCOMES',
      heading: 'Proven, research-backed results in 12 weeks',
      body: 'Backed by University of Stirling — a world-leading authority in ageing and dementia research — every danceSing programme is rigorously evaluated within care communities using recognised research methodologies.\n\nThe results speak for themselves. Implemented consistently, danceSing delivers measurable improvements to resident health, staff wellbeing, and community quality within three months.',
      partner_box_heading: 'University of Stirling & Partner Institutions',
      partner_box_text: 'Independently validated · 5+ year academic partnership',
      ctas: [
        { label: 'Start Free Trial', href: '#trial', style: 'primary' },
        { label: 'Book a Demo', href: '#demo', style: 'outline' },
      ],
      stats_tag: 'PROVEN IMPACT DATA',
      stats: [
        { label: 'Depression in participants', value: '49%', trend: 'down' },
        { label: 'Anxiety reported', value: '34%', trend: 'down' },
        { label: 'Loneliness experienced', value: '29%', trend: 'down' },
        { label: 'Fear of falling', value: '34%', trend: 'down' },
        { label: 'Stress', value: '25%', trend: 'down' },
        { label: 'Sleep satisfaction', value: '25%', trend: 'up' },
        { label: 'DHEA for immunity', value: '62%', trend: 'up' },
        { label: 'Staff stress levels', value: '21%', trend: 'down' },
      ]
    },
    {
      type: 'care-consultation',
      tag: 'BOOK A CONSULTATION',
      heading: "Let's talk about your care community",
      body: 'Every care setting is different. Our team will take the time to understand your community, your residents, and your team — and show you exactly how danceSing fits your needs.',
      steps: [
        {
          number: '01',
          title: 'Tell Us About Your Community',
          description: "We'll ask about your setting, your residents, and what you're currently doing for daily engagement.",
        },
        {
          number: '02',
          title: 'We Walk You Through The Platform',
          description: 'A live, tailored walkthrough of the resources, radio, and tools most relevant to your care setting.',
        },
        {
          number: '03',
          title: 'We Recommend The Right Plan',
          description: "We'll suggest the Individual, Team, or Organisation plan that fits — and answer every question you have.",
        },
      ],
      cta: { label: 'Book a Consultation →', href: '#contact', style: 'primary' },
      image: null,
      audience_heading: 'Who is this right for?',
      audience_body: 'danceSing Care is designed for every setting where older adults need daily engagement and wellbeing support.',
      audience_cards: [
        {
          icon: 'home-heart',
          title: 'Care Home & Residential Facilities',
          description: 'Full-time residential care, assisted living, dementia units, and nursing homes of any size.',
        },
        {
          icon: 'hospital',
          title: 'Hospital Trusts & NHS Wards',
          description: 'Older adult wards, rehabilitation units, and community health settings serving senior patients.',
        },
        {
          icon: 'clipboard-heart',
          title: 'Multi-Site Organizations',
          description: 'National and regional care providers, local councils, charities, and adult social care networks.',
        },
      ],
      audience_cta: { label: 'View Care Pricing →', href: '#pricing', style: 'outline' }
    },
    {
      type: 'care-testimonials',
      tag: 'WHAT CARE TEAMS SAY',
      heading: 'Heard directly from the communities we serve',
      subtitle: "Real feedback from care managers, activities coordinators, researchers, and residents' families across the UK.",
      items: [
        {
          badge: 'CARE',
          text: '"We could clearly see the enjoyment and joy people experienced when using the resources."',
          author: 'Resident Impact',
          role: 'Care Home Manager',
        },
        {
          badge: 'CARE',
          text: '"The change in our residents has been remarkable. They are more engaged, more social and more positive."',
          author: 'Activities Coordinator',
          role: 'NHS Partner',
        },
        {
          badge: 'CARE',
          text: '"danceSing has transformed our daily routine. Staff and residents love it equally."',
          author: 'Care Director',
          role: 'Multi-Site Organisation',
        },
        {
          badge: 'CARE',
          text: '"Our residents\' families have noticed a huge difference in their loved ones\' wellbeing and happiness."',
          author: 'Family Liaison',
          role: 'Residential Facility',
        },
        {
          badge: 'CARE',
          text: '"The platform is intuitive and the content is beautifully tailored for older adults."',
          author: 'Wellbeing Lead',
          role: 'Assisted Living Community',
        },
      ],
    },
    {
      type: 'care-stats',
      tag: 'OUR IMPACT',
      heading: 'Measurable Results for Care Communities',
      subtitle: 'Our platform is trusted across hundreds of care homes and supported living environments, delivering real, measurable outcomes.',
      stats: [
        { value: '200+', label: 'Care Communities' },
        { value: '49%', label: 'Reduction in Depression' },
        { value: '34%', label: 'Reduction in Anxiety' },
        { value: '98%', label: 'Staff Satisfaction Rate' },
      ],
    },
    {
      type: 'care-features',
      tag: 'WHAT WE OFFER',
      heading: 'A Complete Wellness Solution for Care',
      subtitle: 'Everything your care community needs to deliver meaningful wellness experiences — without the complexity.',
      items: [
        {
          icon: 'music',
          title: 'Music & Memory Programmes',
          description: 'Evidence-based music therapy sessions that engage residents with dementia, improving recall and emotional wellbeing.',
          color: '#964B4B',
        },
        {
          icon: 'movement',
          title: 'Chair-Based Movement',
          description: 'Safe, inclusive exercise sessions designed for all mobility levels, reducing fall risks and improving physical health.',
          color: '#283466',
        },
        {
          icon: 'mindfulness',
          title: 'Daily Mindfulness',
          description: 'Guided relaxation and mindfulness sessions that help residents and staff manage stress and find calm.',
          color: '#2f6d42',
        },
        {
          icon: 'training',
          title: 'Staff Training & Support',
          description: 'Comprehensive training programmes that build care staff confidence in delivering therapeutic activities.',
          color: '#e8a020',
        },
        {
          icon: 'radio',
          title: '24/7 Wellbeing Radio',
          description: 'Round-the-clock therapeutic audio content providing continuous ambient wellness for your community.',
          color: '#283466',
        },
        {
          icon: 'compliance',
          title: 'Compliance & Reporting',
          description: 'Easy-to-use reporting tools that help you demonstrate quality outcomes to CQC and other regulators.',
          color: '#964B4B',
        },
      ],
    },
    {
      type: 'care-faq',
      tag: 'SUPPORT',
      heading: 'Everything you need to know about Care',
      subtitle: 'Answers to the questions care managers, activities coordinators, and team leaders ask us most before getting started.',
      support_box_text: "Can't find what you're looking for? Our team responds within 48 hours.",
      support_email: 'support@dancesing.online',
      items: [
        {
          question: 'What does danceSing Care actually include?',
          answer: 'danceSing Care includes a comprehensive library of music sessions, chair-based movement classes, mindfulness practices, and dementia-inclusive activities — all designed specifically for older adults. Team and Organisation plans also include access to the danceSing On Air 24/7 wellbeing radio, facilitation guides, staff onboarding materials, and usage reporting.',
        },
        {
          question: 'Do residents need any special equipment or technology?',
          answer: 'No specialist equipment is needed. All you need is a screen (TV, tablet, or laptop) and an internet connection. Sessions are designed to be easy for staff to run without any technical expertise.',
        },
        {
          question: 'Is danceSing suitable for residents living with dementia?',
          answer: "Yes — dementia-inclusive design is central to every danceSing Care programme. Sessions use familiar music, simple repetitive movements, and sensory engagement to reach residents at any stage of cognitive decline. The format is calm, non-pressured, and designed to meet residents where they are.",
        },
        {
          question: "What's the difference between Individual, Team, and Organisation plans?",
          answer: 'Individual plans are for solo practitioners. Team plans support up to 10 staff members at a single location. Organisation plans are for multi-site providers and include centralised administration, custom reporting, and dedicated support.',
        },
        {
          question: 'Can I share my account with colleagues?',
          answer: "Individual accounts are strictly for personal use and cannot be shared. If you're leading sessions with a team or at a care home, you'll need a Team or Organisation plan.",
        },
        {
          question: 'How quickly will we see results?',
          answer: 'Many care homes report noticeable improvements in resident mood and engagement within the first 2–4 weeks. Our University of Stirling research shows measurable clinical outcomes within 12 weeks of consistent use.',
        },
        {
          question: 'Is there a free trial available?',
          answer: "Yes — all plans include a free trial period so you can explore the platform, run a few sessions with residents, and see the response before committing.",
        },
      ],
    },
    {
      type: 'care-contact',
      tag: 'GET STARTED',
      heading: 'Ready to bring danceSing Care to your community?',
      body: "Book a free consultation and let's talk through how Music, Movement, and Mindfulness can transform daily life for your residents and team.",
      email_label: 'Email ID:',
      email_address: 'support@dancesing.online',
      response_label: 'Response time:',
      response_text: 'We respond within 48 hours.',
      rating_label: 'Rating:',
      rating_text: '4.9 out of 5 Stars from Reviews',
      button_1_label: 'Book a Consultation →',
      button_1_link: '#book',
      button_2_label: 'View Pricing',
      button_2_link: '#pricing',
      form_heading: 'Get in touch with us',
      form_response_text: 'We respond within 48 hours',
      form_button_label: 'Send Message →',
    },
    {
      type: 'care-cta',
      heading: 'Ready to Enrich Your Care Community?',
      subtitle: 'Join 200+ care communities already delivering exceptional wellness experiences with danceSing.',
      ctas: [
        { label: 'Book a Free Demo', href: '#demo', style: 'white' },
        { label: 'Explore Resources', href: '#resources', style: 'outline-white' },
      ],
    },
  ];
}

export default useCarePageData;
