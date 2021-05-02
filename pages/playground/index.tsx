import clsx from 'clsx'
import { CompiledCode } from 'components/code-editor'
import CodeExample from 'components/code-example'
import Unity, { UnityInstance } from 'components/unity'
import { getPlayground } from 'lib/components'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import style from './index.module.scss'

interface Component {
  order: number;
  title: string;
  id: string;
  contentHtml: string;
  component: string;
  code: string;
};

interface Props {
  code: string;
}

export default function Components({ code }: Props) {
  const [activeCode, setActiveCode] = useState<CompiledCode>();
  const setCompiledCode = useCallback((cc: CompiledCode) => {
    setActiveCode(cc);
  }, [setActiveCode]);

  const [unityRef, setUnityRef] = useState<UnityInstance>(null);

  const unityComponent = useMemo(() => <Unity sampleName="sample1" unityRef={setUnityRef}
    className={clsx(style.unityInstance)} />, [setUnityRef]);

  useLayoutEffect(() => {
    if (!(activeCode && unityRef)) return;
    if (activeCode.error) return;
    unityRef.SendMessage('ReactCanvas', 'SetScript', activeCode.compiledCode);
  }, [activeCode, unityRef]);

  return <>
    <Head>
      <title>Playground</title>
    </Head>

    <div className={style.host}>
      <CodeExample code={code} active={true} id={'playground'} className={style.codeExample}
        onChange={setCompiledCode} children={unityComponent} />
    </div>
  </>;
}

export const getStaticProps: GetStaticProps<{ code: string }> = async ({ params }) => {
  const code = await getPlayground();
  return {
    props: {
      code,
    },
  };
}
