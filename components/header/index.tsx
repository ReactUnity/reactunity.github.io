import clsx from 'clsx';
import { ActiveLink } from 'components/active-link';
import Link from 'next/link';
import React from 'react';
import utilStyles from 'styles/utils.module.scss';
import style from './index.module.scss';

const name = 'React Unity'
export const siteTitle = 'React Unity'

interface Props {
  className?: string;
}

export function Header({ className }: Props) {
  return <header className={clsx(className, style.host)}>
    <div className={style.content}>
      <Link href="/">
        <a className={clsx(style.link, style.homeLink)}>
          <img
            src="/images/logo.png"
            className={utilStyles.borderCircle}
            height={108}
            width={108}
            alt={name}
          />

          {name}
        </a>
      </Link>

      <span className={utilStyles.spacer}></span>

      <ActiveLink href={`/components`}>
        Components
      </ActiveLink>

      <ActiveLink href={`/styling`}>
        Styling
      </ActiveLink>

      <ActiveLink href={`/playground`}>
        Playground
      </ActiveLink>
    </div>
  </header>;
}
