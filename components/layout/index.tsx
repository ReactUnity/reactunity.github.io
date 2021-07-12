import clsx from 'clsx'
import Head from 'next/head'
import React from 'react'
import { Header } from '../header'
import styles from './index.module.scss'

const name = 'React Unity'
export const siteTitle = 'React Unity'

interface Props {
  children: React.ReactNode;
  fullSize?: boolean;
}

export default function Layout({ children, fullSize }: Props) {
  return <div className={clsx(styles.container, fullSize && styles.fullSize)}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Learn how to build a personal website using Next.js"
      />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(siteTitle)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>

    <Header />

    <main className={styles.main}>{children}</main>
  </div>;
}
