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
  fullSize?: boolean;
}

export function Header({ className, fullSize }: Props) {
  return <header className={clsx(className, style.host, fullSize && style.fullSize)}>
    <div className={style.content}>
      <Link href="/">
        <a className={clsx(style.link, style.homeLink)}>
          <img src="/images/logo.png" className={utilStyles.borderCircle} height={48} width={48} alt={name} />

          {name}
        </a>
      </Link>

      <span className={utilStyles.spacer}></span>

      <ActiveLink href={'/components'}>
        Components
      </ActiveLink>

      <ActiveLink href={'/styling'}>
        Styling
      </ActiveLink>

      <ActiveLink href={'/playground'}>
        Playground
      </ActiveLink>

      <a href="https://github.com/ReactUnity/core" aria-label="Github" className={style.githubLink}
        target="_blank" rel="noopener noreferrer" />
    </div>
  </header>;
}
