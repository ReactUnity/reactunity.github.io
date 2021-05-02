import Date from 'components/date'
import Layout from 'components/layout'
import Markdown from 'components/markdown'
import { getAllDocIds, getDocData } from 'lib/docs'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import utilStyles from 'styles/utils.module.scss'

interface Props {
  docData: {
    title: string;
    order: number;
    date: string;
    contentHtml: string;
  };
}

export default function Post({ docData }: Props) {
  return <Layout>
    <Head>
      <title>{docData.title}</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>{docData.title}</h1>
      {!!docData.date &&
        <div className={utilStyles.lightText}>
          <Date dateString={docData.date} />
        </div>}
      <Markdown content={docData.contentHtml} />
    </article>
  </Layout>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllDocIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const docData = await getDocData(params.id as string);
  return {
    props: {
      docData,
    },
  };
}
