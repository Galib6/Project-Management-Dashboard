'use client';
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface IMeta {
  title?: string;
  baseTitle?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  url?: string;
  keywords?: string[];
}

interface IProps extends IMeta {
  children: React.ReactNode;
}
const PageWrapper: React.FC<IProps> = ({ children, ...customMeta }) => {
  const router = useRouter();

  const meta: IMeta = {
    title: '',
    baseTitle: 'Uniclient Technologies',
    description: `UniClient Technologies is a trailblazing tech company leading the change in digital innovation, dedicated to solving complex industrial problems through cutting-edge digital products.`,
    image: 'https://uniclients.com/images/og-banner.jpg',
    url: `https://uniclients.com${router.asPath}`,
    type: 'website',
    keywords: ['uniclients', 'technologies', 'tech', 'saas', 'tech', 'automation', 'innovation', 'hrm', 'ams', 'dms'],
    ...customMeta,
  };

  const generatedTitle = `${meta.title}${meta.title ? ' | ' : ''}${meta.baseTitle}`;

  return (
    <React.Fragment>
      <Head>
        <title>{generatedTitle}</title>
        <link rel="canonical" href={meta.url} />
        <meta name="author" content="Uniclient Technologies" />
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        {meta.keywords && <meta name="keywords" content={meta.keywords?.join(', ')} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:site_name" content="Uniclient Technologies" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:title" content={generatedTitle} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:description" content={meta.description} />

        <meta name="twitter:title" content={generatedTitle} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {children}
    </React.Fragment>
  );
};

export default PageWrapper;
