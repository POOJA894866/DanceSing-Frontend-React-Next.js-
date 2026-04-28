'use client';

import { useState, useEffect } from 'react';

// ── Configuration ─────────────────────────────────────────────────
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_ENDPOINT = `${API_BASE_URL}/api/homepage/`;

/**
 * fixImageUrl — ensures every image.src is an absolute URL pointing
 * at the Django backend so it works when React is on a different port.
 */
function fixImageUrl(src) {
  if (!src) return src;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return API_BASE_URL.replace(/\/$/, '') + '/' + src.replace(/^\//, '');
}

/**
 * fixSectionImages — recursively walk a section object and fix image.src fields.
 */
function fixSectionImages(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(fixSectionImages);

  const fixed = { ...obj };
  if (fixed.image && typeof fixed.image === 'object' && fixed.image.src) {
    fixed.image = { ...fixed.image, src: fixImageUrl(fixed.image.src) };
  }

  const listFields = ['items', 'cards', 'steps', 'plans', 'sections'];
  for (const field of listFields) {
    if (Array.isArray(fixed[field])) {
      fixed[field] = fixed[field].map(fixSectionImages);
    }
  }

  return fixed;
}

/**
 * useHomePageData
 *
 * Fetches from the Wagtail API. Falls back to local content.json
 * only on network errors or when the CMS has no published page yet.
 */
export const useHomePageData = () => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timestamp = new Date().getTime();
        const urlWithCacheBuster = `${API_ENDPOINT}?t=${timestamp}`;
        console.log('[useHomePageData] fetching from:', urlWithCacheBuster);
        
        const response = await fetch(urlWithCacheBuster, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`API status ${response.status}`);

        const apiData = await response.json();
        
        const rawSections = apiData.sections || [];
        const sections = rawSections.map(fixSectionImages);

        if (!sections.length) {
          throw new Error('API returned 0 sections — CMS may have no published page');
        }

        console.log('[useHomePageData] Success — loaded from Wagtail API');
        setData({
          sections,
          navigation: fixSectionImages(apiData.navigation),
          footer: fixSectionImages(apiData.footer)
        });
        setError(null);
      } catch (err) {
        const isNetworkError = err instanceof TypeError;
        const isEmptyCms     = err.message.includes('0 sections');

        console.warn('[useHomePageData] Falling back to content.json. Reason:', err.message);

        if (!isNetworkError && !isEmptyCms) {
          console.error('[useHomePageData] Non-recoverable API error:', err.message);
          setError(err);
          setLoading(false);
          return;
        }

        try {
          const localModule = await import('../Reference/content.json');
          const local = localModule.default;
          const sections = (local.sections || []).filter(
            (s) => !s._comment || typeof s.type === 'string',
          );
          setData({ sections, navigation: local.navigation, footer: local.footer });
          setError(null);
        } catch (localErr) {
          console.error('[useHomePageData] fallback also failed:', localErr);
          setError(localErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useHomePageData;
