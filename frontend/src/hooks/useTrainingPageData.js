import { useState, useEffect } from 'react';

const FALLBACK_DATA = {
  sections: [
    {
      type: 'training-hero',
      tag: 'Empowering Care Teams',
      heading: 'Empowering Teams,\nElevating Care Standards',
      body: 'Our all-in-one training and support solution is designed to save time, lift care standards, and empower teams — making it an indispensable tool for senior living communities and care providers.',
      floating_cards: [
        {
          title: 'Live On-Demand Sessions',
          description: 'High-quality activities available anytime — helping teams deliver engaging experiences without needing extra staff or preparation time.'
        },
        {
          title: 'Facilitator Training',
          description: 'Builds staff confidence and consistency in activity delivery, raising care standards and earning the danceSing Level 1 Facilitation Certificate.'
        },
        {
          title: 'Dedicated Support',
          description: 'We handle all service support so your team can focus entirely on what matters — delivering excellent, person-centred care.'
        }
      ],
      ctas: [
        { label: 'Book a Consultation', href: '#consultation', style: 'primary' },
        { label: 'View Pricing →', href: '#pricing', style: 'outline' }
      ]
    },
    {
      type: 'training-platform',
      tag: 'THE PLATFORM',
      heading: 'More Than Training —\nA Comprehensive Care Hub',
      body: 'danceSing Training is more than a one-off workshop. It is a continuous support system that connects teams, reduces burnout, and creates the conditions for exceptional daily care delivery.',
      cards: [
        { title: 'Atmosphere', description: 'Connects teams and residents, fostering a consistently positive and engaging atmosphere across your care community.' },
        { title: 'Data Reporting', description: 'Detailed usage data and reporting on select plans, track staff participation and resident engagement to measure progress and outcomes.' },
        { title: 'Science -backed Tools', description: 'Easy-to-use, science-backed tools for all levels of care settings — practical resources designed with, and validated by, leading UK universities.' },
        { title: 'Reduced Admin Work', description: 'Reduces administrative burden — expert support and clear facilitation guides mean less time planning and more time caring.' }
      ],
      ctas: [
        { label: 'Book a Consultation →', href: '#consultation', style: 'primary' },
        { label: 'Explore Care Resources', href: '/care', style: 'outline' }
      ]
    },
    {
      type: 'training-journey',
      tag: 'THE TRAINING JOURNEY',
      heading: 'A 12-month programme built for lasting impact',
      body: "danceSing Training isn't a one-day event. It's a structured, year-long partnership that builds genuine capability in your team and delivers measurable improvements in resident outcomes.\n\nDelivered flexibly around your team's availability — predominantly online, with in-person options — our programme meets you where you are and grows with you over time.",
      certificate: {
        title: 'danceSing Level 1 Facilitation Certificate',
        description: 'Awarded on completion • Enhances professional credentials • Supports regulatory compliance'
      },
      steps: [
        { number: '01', title: 'Access & Technical Setup', description: 'Step-by-step onboarding covers device setup, connectors, and any technical configuration needed. Your team is confident and ready from day one.', duration: 'WEEK 1-2' },
        { number: '02', title: 'Facilitation Foundation Training', description: 'Online or in-person sessions introduce the platform, the evidence behind it, and the core facilitation skills needed to run engaging, person-centred sessions with confidence.', duration: 'MONTH 1' },
        { number: '03', title: 'Engagement Coaching & Check-ins', description: "Dedicated coaching sessions help staff tailor the programme to residents' abilities, troubleshoot challenges, and build consistency in delivery across the team.", duration: 'MONTHS 2-6' },
        { number: '04', title: 'Data Review & Impact Reporting', description: 'Regular reports with data on staff participation and resident engagement allow care managers to evidence the impact of the programme and align with regulatory requirements.', duration: 'QUARTERLY' },
        { number: '05', title: 'Certification & Ongoing Partnership', description: 'Staff earn the danceSing Level 1 Facilitation Certificate. The relationship continues — new resources, updated training, and long-term support to keep your programme thriving.', duration: 'MONTH 12+' }
      ],
      ctas: [
        { label: 'Start your Journey →', href: '#consultation', style: 'primary' },
        { label: 'Talk to Our Team', href: '#contact', style: 'outline' }
      ]
    }
  ]
};

export const useTrainingPageData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/trainingpage/');
        if (!response.ok) throw new Error('API fetch failed');
        const json = await response.json();
        
        // If API returns no sections or empty sections array, use fallback
        if (!json.sections || json.sections.length === 0) {
          setData(FALLBACK_DATA);
        } else {
          setData(json);
        }
      } catch (err) {
        console.error('Error fetching training page data, using fallback.', err);
        setData(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingData();
  }, []);

  return { data, loading };
};
