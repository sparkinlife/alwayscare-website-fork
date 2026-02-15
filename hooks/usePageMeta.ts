import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
}

const DEFAULT_TITLE = 'Arham Animal Ambulance | Always Care';
const DEFAULT_DESC = 'Arham Animal Ambulance — 24/7 emergency rescue, treatment, and care for injured and stray animals. Always Care for every life.';
const BASE_URL = 'https://arhamanimalambulance.com';

export function usePageMeta({ title, description, canonical }: PageMeta) {
  useEffect(() => {
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    return () => {
      document.title = DEFAULT_TITLE;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', DEFAULT_DESC);
      if (link) link.href = BASE_URL + '/';
    };
  }, [title, description, canonical]);
}
