'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_ENDPOINT = `${API_BASE_URL}/api/lifestylepage/`;

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

  const listFields = ['items', 'cards', 'steps', 'plans', 'sections', 'features', 'images', 'info_cards'];
  for (const field of listFields) {
    if (Array.isArray(fixed[field])) {
      fixed[field] = fixed[field].map(fixSectionImages);
    }
  }

  return fixed;
}

export const useLifestylePageData = () => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timestamp = new Date().getTime();
        const urlWithCacheBuster = `${API_ENDPOINT}?t=${timestamp}`;
        console.log('[useLifestylePageData] fetching from:', urlWithCacheBuster);

        const response = await fetch(urlWithCacheBuster, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new TypeError('Lifestyle page not found in CMS — using defaults');
          }
          throw new Error(`API status ${response.status}`);
        }

        const apiData = await response.json();
        const rawSections = apiData.sections || [];
        const sections = rawSections.map(fixSectionImages);

        if (!sections.length) {
          throw new Error('API returned 0 sections — CMS may have no published page');
        }

        console.log('[useLifestylePageData] Success — loaded from Wagtail API');
        setData({
          sections,
          navigation: fixSectionImages(apiData.navigation),
          footer: fixSectionImages(apiData.footer),
        });
        setError(null);
      } catch (err) {
        const isNetworkError = err instanceof TypeError;
        const isEmptyCms     = err.message.includes('0 sections');

        console.warn('[useLifestylePageData] Using default data. Reason:', err.message);

        if (!isNetworkError && !isEmptyCms) {
          console.error('[useLifestylePageData] Non-recoverable API error:', err.message);
          setError(err);
          setLoading(false);
          return;
        }

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
      type: 'lifestyle-hero',
      tag: 'Wellness for Every Stage of Life',
      heading: 'Holistic Wellness,\nAccessible Anytime,\nAnywhere',
      body: 'Experience the full spectrum of wellness — Pilates, Yoga, Dance Fitness, Meditation, Singing, and Nutrition. Designed to help older adults live healthier, happier, more independent lives.',
      image: null,
      info_cards: [
        {
          position: 'top',
          heading: 'Six Wellness Disciplines',
          text: 'Pilates, Yoga, Dance Fitness, Meditation, Singing, and Nutrition — a complete library of content covering every dimension of wellbeing.',
        },
        {
          position: 'right',
          heading: '24/7 Wellbeing Radio',
          text: 'Continuous motivation and emotional support — lift your mood and feel connected, any time of day or night, without needing to plan a session.',
        },
        {
          position: 'bottom',
          heading: 'University of Stirling backed',
          text: 'Research-validated outcomes — proven benefits for stress reduction, mental resilience, and long-term physical and emotional health.',
        },
      ],
      ctas: [
        { label: 'Join Now',       href: '#join',    style: 'primary' },
        { label: 'View Pricing →', href: '#pricing', style: 'outline' },
      ],
    },
    {
      type: 'lifestyle-programme',
      tag: 'THE PROGRAMME',
      heading: 'Wellness For Every Stage\nOf Life',
      subtitle: "danceSing's Lifestyle Programme brings a full spectrum of wellness resources to support physical and mental well-being — helping older adults live healthier, happier, more independent lives, at their own pace.",
      image: null,
      cards: [
        {
          title: 'Accessibility',
          body:  'Accessible anytime, anywhere on any device, at home, in the community, or on the go. No gym membership, no commute, no barriers.',
          image: { src: '/images/life21.jpg' },
        },
        {
          title: 'Research-backed',
          body:  'University of Stirling studies demonstrate real benefits for stress reduction, mobility, and long-term health outcomes.',
          image: { src: '/images/life22.jpg' },
        },
        {
          title: 'Designed for Elderly',
          body:  'Every class is created with the needs, pace, and preferences of the over-50s in mind. Gentle, joyful, and genuinely effective.',
          image: { src: '/images/life23.jpg' },
        },
        {
          title: '24/7 Wellbeing Radio',
          body:  "Continuous background support for motivation, mood, and emotional connection — available even when you're not in a session.",
          image: { src: '/images/life34.jpg' },
        },
      ],
      ctas: [
        { label: 'Join Now →',  href: '#join',  style: 'primary' },
        { label: 'Our Story',   href: '/about', style: 'outline' },
      ],
    },
    {
      type: 'lifestyle-disciplines',
      tag: 'SIX DISCIPLINES, ONE PLATFORM',
      heading: 'Every dimension of wellbeing, in one place',
      subtitle: 'From physical movement to emotional calm — our six wellness disciplines cover every aspect of a healthy, connected, independent life.',
      cards: [
        {
          icon_name: 'pilates',
          title: 'Pilates',
          description: 'Gentle core-strengthening and postural alignment sessions designed for older adults — improving stability, reducing back pain, and building lasting physical confidence.',
        },
        {
          icon_name: 'yoga',
          title: 'Yoga',
          description: 'Chair-based and standing yoga adapted for all ability levels — increasing flexibility, improving balance, and bringing a sense of calm and inner stillness to each day.',
        },
        {
          icon_name: 'dance',
          title: 'Dance Fitness',
          description: 'Joyful, music-led movement sessions that get the heart pumping, lift the mood, and bring the irreplaceable energy of dancing together into everyday life.',
        },
        {
          icon_name: 'meditation',
          title: 'Meditation',
          description: 'Guided mindfulness and meditation practices that reduce stress and anxiety, support emotional resilience, and help you find quiet, grounded moments in a busy world.',
        },
        {
          icon_name: 'singing',
          title: 'Singing',
          description: 'Vocal sessions that build confidence, support respiratory health, and create the kind of joyful social connection that is uniquely powerful for older adults\' wellbeing.',
        },
        {
          icon_name: 'nutrition',
          title: 'Nutrition',
          description: 'Accessible, practical nutrition guidance tailored to the needs of older adults — supporting energy, immunity, and independence through the power of everyday food choices.',
        },
      ],
    },
    {
      type: 'lifestyle-evidence',
      tag: 'EVIDENCE',
      heading: 'Why Care Resource Works',
      body: 'Our platform is based on research and real-life experience. Through ongoing evaluation, our programmes have consistently demonstrated positive outcomes for resident wellbeing, engagement, and quality of life.',
      cards: [
        {
          icon: 'individual',
          tag: 'INDIVIDUAL',
          title: 'Personal Wellbeing At Home',
          items: [
            { text: 'Improving personal wellbeing, fitness, or mindfulness.' },
            { text: 'Self-led lifestyle goals and daily wellness routines.' },
            { text: 'Premium wellbeing content accessible from any device at home.' },
            { text: 'From £16.67/month on the annual plan.' },
          ],
        },
        {
          icon: 'workspace',
          tag: 'WORKSPACE TEAMS',
          title: 'Staff Wellness & Team Wellbeing',
          items: [
            { text: 'Workplace teams at a single office or site.' },
            { text: 'Reducing staff stress and supporting employee mental health.' },
            { text: 'Unlimited logins with single-site reporting and usage tracking.' },
            { text: 'Optional live group sessions and custom training (add-ons).' },
          ],
        },
        {
          icon: 'community',
          tag: 'COMMUNITY GROUPS',
          title: 'Groups Meeting At One Venue',
          items: [
            { text: 'Weekly fitness, wellbeing, or social clubs at a regular venue.' },
            { text: 'Clubs and small organisations based at one location.' },
            { text: 'Accessible facilitation for group leaders — no prior experience needed.' },
            { text: 'Engagement reporting to track group participation.' },
          ],
        },
        {
          icon: 'organisation',
          tag: 'ORGANISATIONS',
          title: 'Multi-Site & National Programmes',
          items: [
            { text: 'Organisations with multiple offices or service locations.' },
            { text: 'National or regional lifestyle and wellbeing programmes.' },
            { text: 'Unlimited logins across all sites with multi-site reporting.' },
            { text: 'Dedicated account support, quarterly reviews, custom onboarding.' },
          ],
        },
      ],
    },
    {
      type: 'lifestyle-radio',
      tag: 'SIX DISCIPLINES, ONE PLATFORM',
      heading: '24/7 Well-being Radio —\nmotivation, anytime',
      body1: 'Included with every Lifestyle plan — danceSing On Air is a 24/7 commercial-free radio station with uplifting music, mindfulness programming, and mood-boosting content curated specifically for older adults.',
      body2: 'No session to plan. No video to follow. Just switch it on and let it lift the room.',
      badge_title: 'University of Stirling & Partner Institutions',
      badge_text: 'Proven stress reduction and long-term health benefits · 5+ years',
      image: null,
      now_playing_label: 'NOW PLAYING · DANCESING ON AIR',
      track_title: 'Moods of the Morning — Classical Favourites',
      station_name: 'danceSing Wellness Radio · Daily programme',
      ctas: [
        { label: 'Listen Live', href: '#radio', style: 'primary' },
        { label: 'Learn More',  href: '#more',  style: 'outline' },
      ],
    },
    {
      type: 'lifestyle-consultation',
      tag: 'GET STARTED',
      heading: 'Find the right Lifestyle plan for you',
      body: 'Whether you\'re joining as an individual, bringing Lifestyle to a workplace team, or rolling it out across a multi-site organisation — we\'ll help you find the right fit.',
      image: null,
      cta: { label: 'Book a Consultation →', href: '#contact', style: 'primary' },
      steps: [
        {
          number: '01',
          title: 'Tell Us About Your Goals',
          description: 'Individual wellbeing, workplace health, community groups — we\'ll ask what you\'re hoping to achieve.',
        },
        {
          number: '02',
          title: 'We Walk You Through The Platform',
          description: 'A live overview of the six disciplines, the On Air radio, and the content most relevant to you or your group.',
        },
        {
          number: '03',
          title: 'We Recommend The Right Plan',
          description: 'Individual, Team, or Organisation — we\'ll find the best option and answer every question before you commit.',
        },
      ],
      audience_heading: 'Is Lifestyle right for you?',
      audience_body: 'danceSing Lifestyle is for anyone who wants accessible, high-quality wellness content — at home, at work, or in the community.',
      audience_cta: { label: 'View Lifestyle Pricing →', href: '#pricing', style: 'outline' },
      audience_cards: [
        {
          icon: 'home',
          title: 'Individuals At Home',
          description: 'Older adults looking to improve fitness, reduce stress, or simply enjoy something uplifting each day.',
        },
        {
          icon: 'workplace',
          title: 'Workplaces & Organisations',
          description: 'Teams looking to support staff wellbeing, reduce burnout, and build a healthier, more connected workplace.',
        },
        {
          icon: 'groups',
          title: 'Community Groups & Clubs',
          description: 'Regular groups at a single venue — from weekly fitness classes to social wellbeing gatherings.',
        },
      ],
    },
    {
      type: 'lifestyle-testimonials',
      tag: 'WHAT CARE TEAMS SAY',
      heading: 'Heard directly from\nthe communities we serve',
      subtitle: 'Real feedback from care managers, activities coordinators, researchers, and residents\' families across the UK.',
      items: [
        {
          pill_text: 'CARE',
          quote: 'We could clearly see the enjoyment and joy people experienced when using the resources.',
          author: 'Resident Impact',
        },
        {
          pill_text: 'CARE',
          quote: 'We could clearly see the enjoyment and joy people experienced when using the resources.',
          author: 'Resident Impact',
        },
        {
          pill_text: 'CARE',
          quote: 'We could clearly see the enjoyment and joy people experienced when using the resources.',
          author: 'Resident Impact',
        },
        {
          pill_text: 'CARE',
          quote: 'We could clearly see the enjoyment and joy people experienced when using the resources.',
          author: 'Resident Impact',
        },
        {
          pill_text: 'CARE',
          quote: 'We could clearly see the enjoyment and joy people experienced when using the resources.',
          author: 'Resident Impact',
        },
      ],
    },
    {
      type: 'lifestyle-faq',
      tag: 'SUPPORT',
      heading: 'Everything you need\nto know about Care',
      subtitle: 'Answers to the questions care managers, activities coordinators, and team leaders ask us most before getting started.',
      footer_body: "Can't find what you're looking for? Our team responds within 48 hours.",
      footer_link_text: "support@dancesing.online →",
      footer_link_url: "mailto:support@dancesing.online",
      items: [
        {
          question: "What is included in the danceSing Lifestyle platform?",
          answer: "danceSing Lifestyle includes a comprehensive library of on-demand content across six disciplines: Pilates, Yoga, Dance Fitness, Meditation, Singing, and Nutrition. All plans also include access to danceSing On Air — our 24/7 commercial-free wellbeing radio. Team and Organisation plans include additional reporting, onboarding support, and optional live group sessions."
        },
        {
          question: "Who is the Lifestyle platform designed for?",
          answer: "danceSing Lifestyle is for anyone who wants accessible, high-quality wellness content — at home, at work, or in the community."
        },
        {
          question: "Do I need any special equipment to take part?",
          answer: "No special equipment is required for the majority of sessions. A comfortable, supportive chair is all you need for most Yoga and Pilates classes. Meditation and Singing require nothing at all — just a quiet space. The platform is accessible via any internet-connected device: tablet, laptop, smart TV, or smartphone."
        },
        {
          question: "What's the difference between Individual, Team, and Organisation plans?",
          answer: "Individual is for single users. Team covers all staff at a single site with usage reporting. Organisation provides multi-site coverage with dedicated support."
        },
        {
          question: "Can I use Lifestyle for a workplace wellbeing programme?",
          answer: "Yes — the Team plan is ideal for workplace wellbeing. It covers all staff at a single site with unlimited logins, concurrent streaming (so multiple people can access at the same time), usage reporting to track engagement, and optional live group sessions for team activities. For organisations with multiple offices, the Organisation plan provides multi-site coverage with dedicated support."
        },
        {
          question: "Can I share my account with others?",
          answer: "No. Individual accounts are for personal use only and cannot be shared. For shared access, please upgrade to a Team or Organisation Plan."
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes — all plans include a free trial period so you can explore the platform and try sessions before committing. Start your trial directly on the join page, or book a consultation first if you'd prefer a guided walkthrough from our team."
        },
        {
          question: "Is there evidence that Lifestyle actually works?",
          answer: "Yes, our programmes are based on research and real-life experience. Through ongoing evaluation, our programmes have consistently demonstrated positive outcomes for wellbeing, engagement, and quality of life."
        }
      ]
    },
    {
      type: 'lifestyle-contact',
      tag: 'GET STARTED',
      heading: 'Ready to bring danceSing Care to your community?',
      body: 'Book a free consultation and let\'s talk through how Music, Movement, and Mindfulness can transform daily life for your residents and team.',
      email: 'support@dancesing.online',
      response_time: 'We respond within 48 hours.',
      rating_text: '4.9 out of 5 Stars from Reviews',
      form_heading: 'Get in touch with us',
      form_subtext: 'We respond within 48 hours',
      ctas: [
        { label: 'Book a Consultation →', href: '#contact', style: 'white' },
        { label: 'View Pricing', href: '#pricing', style: 'outline-white' },
      ],
    },
  ];
}

export default useLifestylePageData;
