import { createLazyFileRoute } from '@tanstack/react-router';

import { PricingPage } from '@/pages/pricing';

export const Route = createLazyFileRoute('/pricing')({
  component: PricingPage,
});
