import React from 'react';
import { Helmet } from 'react-helmet-async';

import og from '@assets/data/og.json';

const SEO = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>

      {/* <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={og.site_name} />
      <meta property="og:description" content={og.description} />
      <meta property="og:image" content={og.imgsrc} /> */}

      {/* <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imgsrc} /> */}
    </Helmet>
  );
};

export default SEO;
