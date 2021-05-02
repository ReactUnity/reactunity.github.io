import Layout, { siteTitle } from 'components/layout'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
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
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>
        <Link href={`/components`}>
          Components
        </Link>
      </h2>

      <h2 className={utilStyles.headingLg}>
        <Link href={`/styling`}>
          Styling
        </Link>
      </h2>

      <h2 className={utilStyles.headingLg}>
        <Link href={`/playground`}>
          Playground
        </Link>
      </h2>
    </section>
  </Layout>;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
    }
  };
}
