import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const ActiveLink = ({ children, className, activeClassName, ...props }: React.PropsWithChildren<LinkProps> & { className?: string; activeClassName?: string }) => {
  const { asPath } = useRouter();

  const resolvedClass = asPath === props.href || asPath === props.as
    ? clsx(activeClassName || 'active', className)
    : className;

  return <Link {...props}>
    <a className={resolvedClass}>{children}</a>
  </Link>;
};
