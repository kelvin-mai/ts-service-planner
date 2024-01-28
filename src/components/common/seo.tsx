import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title?: string;
};

export const Seo: FC<SeoProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title ? title + '| Service Planner' : 'Service Planner'}</title>
    </Helmet>
  );
};
