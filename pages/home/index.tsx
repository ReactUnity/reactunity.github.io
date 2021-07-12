import { ActiveLink } from 'components/active-link';
import Layout, { siteTitle } from 'components/layout';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import style from './index.module.scss';

interface Props {
}

export default function Home({ }: Props) {
  return <Layout fullSize>
    <Head>
      <title>{siteTitle}</title>
    </Head>

    <section className={style.jumbo}>
      <div className={style.jumboContent}>
        <div className={style.leftPart}>
          <h1>React Unity</h1>

          <p>
            React adapter for building user interfaces in Unity
          </p>

          <div>
            <ActiveLink href={'/components'} className={style.getStartedButton}>
              Get Started
            </ActiveLink>
          </div>
        </div>

        <div className={style.logoPart}>

          <img src="/images/logo.png" className={style.logo} height={240} width={240} alt="React Unity Logo" />
        </div>
      </div>
    </section>
  </Layout>;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
    },
  };
};
