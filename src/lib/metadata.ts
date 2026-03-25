import { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from './utils';

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function generatePageMetadata({ title, description, path, keywords }: GenerateMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords: keywords?.join(', '),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
