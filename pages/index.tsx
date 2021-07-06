import Layout, { siteTitle } from 'components/layout'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import utilStyles from 'styles/utils.module.scss'

interface Props {
}

export default function Home({ }: Props) {
  return <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>React Unity</p>
      <p>
        React adapter for building user interfaces in Unity
      </p>
    </section>
  </Layout>;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
    }
  };
}
