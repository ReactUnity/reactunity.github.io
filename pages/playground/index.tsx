import clsx from 'clsx'
import { CodeExample, CodeSpace, CompiledCode } from 'components/code-example'
import Unity, { UnityAPI } from 'components/unity'
import { getPlayground } from 'lib/components'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import style from './index.module.scss'

interface Props {
  code: CodeSpace;
}

export default function Components({ code }: Props) {
  const [activeCode, setActiveCode] = useState<CompiledCode>();
  const setCompiledCode = useCallback((cc: CompiledCode) => {
    setActiveCode(cc);
  }, [setActiveCode]);

  const [unityRef, setUnityRef] = useState<UnityAPI>(null);

  const unityComponent = useMemo(() => <Unity sampleName="sample1" unityRef={setUnityRef}
    className={clsx(style.unityInstance)} />, [setUnityRef]);

  useLayoutEffect(() => {
    if (!(activeCode && unityRef)) return;
    if (activeCode.error) return;
    unityRef.SetReactScript(activeCode.compiledCode, activeCode.style);
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

export const getStaticProps: GetStaticProps<{ code: CodeSpace }> = async ({ params }) => {
  const code = await getPlayground();
  return {
    props: {
      code,
    },
  };
}
