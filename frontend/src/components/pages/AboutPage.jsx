'use client';
import React, { useEffect, useState } from 'react';
import AboutHero from '../sections/AboutHero';
import OurStory from '../sections/OurStory';
import LeadershipSection from '../sections/LeadershipSection';
import AcademicFoundation from '../sections/AcademicFoundation';
import OurMission from '../sections/OurMission';
import WhatDrivesUs from '../sections/WhatDrivesUs';
import GuidingPrinciples from '../sections/GuidingPrinciples';
import OurGallery from '../sections/OurGallery';
import ContactSection from '../sections/ContactSection';
import { useHomePageData } from '../../hooks/useHomePageData';

export default function AboutPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Use homepage data to get the global Navbar and Footer settings
  const { data: globalData, loading: globalLoading } = useHomePageData();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/aboutpage/');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          setData(getFallbackData());
        }
      } catch (err) {
        setData(getFallbackData());
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading || globalLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#283466', color: '#ffffff' }}>
        <p style={{ fontSize: '1.2rem' }}>Loading About Us...</p>
      </div>
    );
  }

  return (
    <main>
      {data?.sections?.map((sec, idx) => {
        if (sec.type === 'about-hero') {
          return <AboutHero key={idx} data={sec} />;
        }
        if (sec.type === 'our-story') {
          return <OurStory key={idx} data={sec} />;
        }
        if (sec.type === 'leadership') {
          return <LeadershipSection key={idx} data={sec} />;
        }
        if (sec.type === 'academic-foundation') {
          return <AcademicFoundation key={idx} data={sec} />;
        }
        if (sec.type === 'our-mission') {
          return <OurMission key={idx} data={sec} />;
        }
        if (sec.type === 'what-drives-us') {
          return <WhatDrivesUs key={idx} data={sec} />;
        }
        if (sec.type === 'guiding-principles') {
          return <GuidingPrinciples key={idx} data={sec} />;
        }
        if (sec.type === 'our-gallery') {
          return <OurGallery key={idx} data={sec} />;
        }
        if (sec.type === 'contact-section') {
          return <ContactSection key={idx} data={sec} />;
        }
        return null;
      })}
    </main>
  );
}

function getFallbackData() {
  return {
    sections: [
      {
        type: 'about-hero',
        tag: 'The People and Purpose Behind the Platform',
        heading: 'Founded On A Belief That Joy Is Medicine',
        body: 'We started danceSing because we saw what happened when older adults had access to music, movement, and real human connection every day — and we wanted every care community in the UK to feel that difference.',
        ctas: [
          { label: 'Explore Care →', href: '/care', style: 'accent' },
          { label: 'Explore Lifestyle →', href: '/lifestyle', style: 'green' },
          { label: 'Watch Demo', href: '#demo', style: 'outline-white' }
        ],
        bottom_bar: [
          'ICO Registered',
          'UK-based',
          'Established in 2019'
        ]
      },
      {
        type: 'our-story',
        tag: 'OUR STORY',
        heading: 'A Simple Idea That Grew Into Something Much Bigger',
        intro: 'danceSing began with a conviction: that older adults deserve more than passive entertainment — they deserve daily engagement that genuinely transforms their health and happiness.',
        body: 'Founded with a passion for creating meaningful, engaging, and evidence-based resources, we set out to build a platform rooted in research and driven by a deep commitment to the health and happiness of our communities. What started as a vision for better care activities has grown into a comprehensive platform serving over 200 care communities, thousands of residents, and independent adults across the UK — with international expansion now under way.\n\nEvery programme we build — from chair-based movement to our 24/7 wellbeing radio — is designed with the same care and purpose that started it all.',
        ctas: [
          { label: 'Explore our Programmes →', href: '#programs', style: 'primary' },
          { label: 'Learn more', href: '#more', style: 'outline' }
        ]
      },
      {
        type: 'leadership',
        tag: 'LEADERSHIP',
        heading: 'The two people who started it all',
        subtitle: 'Led by two passionate founders and supported by a dedicated team, danceSing is redefining wellness in care — both in the UK and internationally.',
        members: [
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
        ]
      },
      {
        type: 'academic-foundation',
        tag: 'ACADEMIC FOUNDATION',
        heading: 'Five Years Of Measurable Difference',
        body: "We don't ask you to take our word for it. Every programme on danceSing has been evaluated using recognised research methodologies, in partnership with three of the UK's leading academic institutions. danceSing enhances adult care with evidence-based programmes that improve health and well-being in 12 weeks.\n\nResults are consistent, reproducible, and independently validated — giving our care community partners the confidence that what they are implementing is genuinely good for their residents.",
        ctas: [
          { label: 'Explore our Programmes →', href: '#programs', style: 'primary' },
          { label: 'Talk to Our Team', href: '#contact', style: 'outline' }
        ],
        partners: [
          { number: '01', name: 'University of Stirling', description: 'A world-leading authority in ageing and dementia research. Our primary research partner for over five years, evaluating danceSing programmes within residential care settings across Scotland and beyond.', tags: ['5+ YEAR PARTNERSHIP', 'DEMENTIA & AGEING RESEARCH'] },
          { number: '02', name: 'Glasgow University', description: 'Collaborating on health sciences and wellbeing research, providing rigorous evaluation of the physical and psychological outcomes of our movement and mindfulness programmes.', tags: ['HEALTH SCIENCE', 'WELLBEING OUTCOMES'] },
          { number: '03', name: 'University of Plymouth', description: 'Collaborating on health sciences and wellbeing research, providing rigorous evaluation of the physical and psychological outcomes of our movement and mindfulness programmes.', tags: ['COMMUNITY CARE', 'MOVEMENT SCIENCE'] }
        ]
      },
      {
        type: 'our-mission',
        tag: 'OUR PURPOSE',
        heading: 'Our Mission',
        subtitle: 'Designed with older adults, by specialists who care about accessible wellness for all abilities',
        body: "We aim to empower older adults, caregivers, and care communities by providing accessible, fun, and research-backed wellness solutions.\n\nWhether through our innovative movement programmes, 24/7 Well-being Radio, or expert-led caregiver training, our mission is to enrich lives with joy, connection, and well-being.",
        features: [
          { icon: 'movement', title: 'Movement', description: 'Chair-based and adaptive routines for every ability, led by trained professionals.' },
          { icon: 'mindfulness', title: 'Mindfulness', description: 'Daily practices that reduce anxiety, improve sleep, and foster calm connection.' },
          { icon: 'music', title: 'Music', description: 'Clinically validated music therapy approaches that boost mood, memory and joy.' },
          { icon: 'training', title: 'Training', description: 'Expert-led workshops that build care staff confidence and capability.' }
        ],
        ctas: [
          { label: 'Explore Care Resources →', href: '/care', style: 'accent' },
          { label: 'Explore Lifestyle →', href: '/lifestyle', style: 'green' }
        ]
      },
      {
        type: 'what-drives-us',
        tag: 'WHAT DRIVES US',
        heading: 'Empowering Every Older Adult To Thrive',
        body: 'Our mission is to empower older adults, caregivers, and care communities by providing accessible, fun, and research-backed wellness solutions.\n\nWhether through our innovative movement programmes, 24/7 Well-being Radio, or expert-led caregiver training — everything we build is designed to enrich lives with joy, connection, and lasting wellbeing.',
        ctas: [
          { label: 'Explore Care Resources →', href: '/care', style: 'accent' },
          { label: 'Learn More', href: '#more', style: 'outline-white' }
        ],
        cards: [
          { icon: 'movement', accent: '#964B4B', title: 'Innovative Movement Programs', description: 'Chair-based and adaptive movement sessions designed for every ability level — professionally led, evidence-based, and genuinely fun to take part in.' },
          { icon: 'radio', accent: '#D48441', title: '24/7 Well-being Radio', description: 'A commercial-free, always-on radio station curated specifically for older adults — mood-lifting music, reminiscence content, and dementia-friendly programming around the clock.' },
          { icon: 'training', accent: '#1A5E7A', title: 'Expert-led Caregiving Training', description: 'CPD-accredited workshops that give care staff the skills, confidence, and tools to lead meaningful engagement sessions every day — with lasting results for residents and staff alike.' }
        ]
      },
      {
        type: 'guiding-principles',
        tag: 'WHAT WE STAND FOR',
        heading: 'The five principles\nthat guide everything we do',
        subtitle: 'These are not aspirational posters on a wall. They are the lens through which every product decision, partnership, and programme is made.',
        cards: [
          { icon: 'leaf', title: 'Enjoy the Journey', description: '**Wellness should be joyful, not a chore.** We design experiences people look forward to returning to — every single day.' },
          { icon: 'handshake', title: 'Act with Integrity', description: 'We do what we say, say what we mean, and hold ourselves to the highest standard in every relationship we build with our partners, care communities, and individuals alike.' },
          { icon: 'heartHand', title: 'Be compassionate', description: 'Every product, session, and interaction is designed with genuine care for the people we serve — especially the most vulnerable. Compassion is not a policy; it is who we are.' },
          { icon: 'elevate', title: 'Elevate Others', description: 'We exist to lift people. Whether it is a resident discovering movement for the first time, or a care worker gaining confidence — we are here to help people reach more than they thought possible.' },
          { icon: 'community', title: 'Believe in Community', description: 'Connection is medicine. Every product we build is designed to strengthen bonds, reduce isolation, and grow the communities of people who need each other most.' }
        ]
      },
      {
        type: 'our-gallery',
        tag: 'OUR GALLERY',
        heading: 'Building Memories Together',
        subtitle: 'Discover how our wellbeing solutions bring movement, music, and connection to care environments and everyday life.',
        images: []
      },
      {
        type: 'contact-section',
        tag: 'COME AND SAY HELLO',
        heading: "We'd love to hear from you",
        body: 'Whether you run a care home, work in an independent living community, or simply want to know more about what we do — our team is always happy to talk.',
        email: 'support@dancesing.online',
        response_time: 'We respond within 48 hours.',
        rating_text: '4.9 out of 5 Stars from Reviews',
        form_heading: 'Get in touch with us',
        form_subtext: 'We respond within 48 hours',
        ctas: [
          { label: 'Book a Demo →', href: '#demo', style: 'white' },
          { label: 'Contact Us', href: '#contact', style: 'outline-white' }
        ]
      }
    ]
  };
}
