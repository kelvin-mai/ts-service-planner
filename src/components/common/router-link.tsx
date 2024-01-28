import { forwardRef, type Ref } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type RouterLinkProps = Omit<LinkProps, 'to'> & {
  href: string;
};

export const RouterLink = forwardRef(function RouterLink(
  { href, ...props }: RouterLinkProps,
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
