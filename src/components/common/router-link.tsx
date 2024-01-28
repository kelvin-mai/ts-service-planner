import { forwardRef, type Ref } from 'react';
import { Link, type LinkProps } from '@tanstack/react-router';

export const RouterLink = forwardRef(function RouterLink(
  { href, ...props }: Omit<LinkProps, 'to'>,
  ref: Ref<HTMLAnchorElement> | undefined
) {
  return (
    <Link
      to={href}
      ref={ref}
      {...props}
    />
  );
});
