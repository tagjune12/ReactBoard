import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>

      {/* <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imgsrc} /> */}
    </Helmet>
  );
};

export default SEO;
