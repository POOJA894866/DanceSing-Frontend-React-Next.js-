'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_ENDPOINT = `${API_BASE_URL}/api/calendarpage/`;

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

  const listFields = ['items', 'cards', 'steps', 'plans', 'sections', 'features', 'images', 'events'];
  for (const field of listFields) {
    if (Array.isArray(fixed[field])) {
      fixed[field] = fixed[field].map(fixSectionImages);
    }
  }

  return fixed;
}

export const useCalendarPageData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timestamp = new Date().getTime();
        const urlWithCacheBuster = `${API_ENDPOINT}?t=${timestamp}`;
        console.log('[useCalendarPageData] fetching from:', urlWithCacheBuster);

        const response = await fetch(urlWithCacheBuster, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new TypeError('Calendar page not found in CMS — using defaults');
          }
          throw new Error(`API status ${response.status}`);
        }

        const apiData = await response.json();

        const rawSections = apiData.sections || [];
        const sections = rawSections.map(fixSectionImages);
        const events = (apiData.events || []).map(fixSectionImages);

        if (!sections.length && !events.length) {
          throw new Error('API returned 0 sections and 0 events — CMS may have no published page');
        }

        console.log('[useCalendarPageData] Success — loaded from Wagtail API');
        setData({
          sections,
          events,
          navigation: fixSectionImages(apiData.navigation),
          footer: fixSectionImages(apiData.footer),
        });
        setError(null);
      } catch (err) {
        const isNetworkError = err instanceof TypeError;
        const isEmptyCms = err.message.includes('0 sections');

        console.warn('[useCalendarPageData] Using default data. Reason:', err.message);

        if (!isNetworkError && !isEmptyCms) {
          console.error('[useCalendarPageData] Non-recoverable API error:', err.message);
          setError(err);
          setLoading(false);
          return;
        }

        setData({
          sections: getDefaultSections(),
          events: getDefaultEvents(),
          navigation: null,
          footer: null,
        });
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
      type: 'calendar-hero',
      tag: 'START YOUR JOURNEY',
      heading: 'Book Your Free 30-Minute Demo',
      body: 'Pick a date that works for you. Our team will walk you through the platform, answer your questions, and help you find the right plan for your setting — no commitment, no pressure.',
      image: null,
      ctas: [
        { label: 'Explore our Programmes →', href: '#programmes', style: 'outline-white' },
        { label: 'Talk to Our Team', href: '#contact', style: 'text-arrow' },
      ],
    },
    {
      type: 'calendar-booking',
      dates_heading: 'Select your dates',
      dates_subtitle: 'Pick any available slot from the calendar below',
      legend_available: 'Available',
      legend_not_available: 'Not Available',
      legend_today: 'Today',
      timezone_text: 'All times shown in UK time (GMT+1) · British Summer Time',
      slot_section_subtitle: 'Select a 30-minute window for your demo',
      default_time_slots: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00'],
      details_heading: 'Enter your details',
      details_subtitle: "We'll confirm your booking by email within a few minutes.",
      date_confirmed_label: 'DATE CONFIRMED',
      time_confirmed_label: 'UK TIME CONFIRMED',
      required_note: 'Fields marked * are required',
      form_fields: [],
      submit_label: 'Request this slot →',
    },
    {
      type: 'calendar-stats',
      stats: [
        { heading: '200+', label: 'Care Communities' },
        { heading: '4.9/5', label: 'of 49 Reviews' },
        { heading: '5+', label: 'Years of Research' },
        { heading: '30 mins', label: 'Free, no obligation' },
      ],
    },
  ];
}

function getDefaultEvents() {
  return [];
}

export default useCalendarPageData;
