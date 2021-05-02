import clsx from 'clsx'
import { CompiledCode } from 'components/code-editor'
import { InlineCodeExample } from 'components/code-example'
import Layout from 'components/layout'
import Markdown from 'components/markdown'
import Unity, { UnityInstance } from 'components/unity'
import { getAllComponents } from 'lib/components'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import utilStyles from 'styles/utils.module.scss'
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
  components: Component[];
}

export default function Components({ components }: Props) {
  const componentRefs = useRef<Record<string, HTMLDivElement>>({});
  const setComponentRef = useCallback((el: HTMLDivElement) => {
    if (!el) return;
    componentRefs.current[el.dataset.id] = el;
  }, [componentRefs]);

  const [compiledCodes, setCompiledCodes] = useState<Record<string, CompiledCode>>({});
  const setCompiledCode = useCallback((cc: CompiledCode, id: string) => {
    setCompiledCodes(x => ({ ...x, [id]: cc }));

    const firstCompile = !compiledCodes[id];
    if (!firstCompile) {
      setActiveComponent(id);
    }
  }, [setCompiledCodes, compiledCodes]);

  const [activeComponent, setActiveComponent] = useState<string>(components[0].id);
  const activeCode = compiledCodes[activeComponent];

  const [unityRef, setUnityRef] = useState<UnityInstance>(null);

  const [defaultContainer, setDefaultContainer] = useState<HTMLDivElement>(null);
  const unityContainer = componentRefs.current[activeComponent] || defaultContainer;

  const unityComponent = useMemo(() => <Unity sampleName="sample1" unityRef={setUnityRef}
    className={clsx(style.unityInstance)} />, [setUnityRef]);

  const [unityContainerWrapper, setUnityContainerWrapper] = useState<HTMLDivElement>();

  useEffect(() => {
    const el = document.createElement('div');
    el.className = style.unityContainerWrapper;
    setUnityContainerWrapper(el);
    return () => el.remove();
  }, [setUnityContainerWrapper])

  useLayoutEffect(() => {
    if (!unityContainerWrapper) return;
    if (unityContainer) unityContainer.appendChild(unityContainerWrapper);
    else unityContainerWrapper.remove();
  }, [unityContainerWrapper, unityContainer]);

  useLayoutEffect(() => {
    if (!(activeCode && unityRef)) return;
    if (activeCode.error) return;
    unityRef.SendMessage('ReactCanvas', 'SetScript', activeCode.compiledCode);
  }, [activeCode, unityRef]);

  useLayoutEffect(() => {
    setTimeout(() => {
      const keys = Object.keys(componentRefs.current);

      for (const key of keys) {
        const val = componentRefs.current[key];

        if (val.closest('section').matches(':target')) {
          setActiveComponent(key);
          return;
        }
      }
    }, 100);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Components</title>
      </Head>
      <article className={style.host}>
        {components.map((cmp, i) =>
          <section key={i} id={cmp.id} className={clsx(activeComponent === cmp.id && style.active)}>
            <h2 className={utilStyles.headingXl}>{cmp.title}</h2>

            <Markdown content={cmp.contentHtml} className={style.content} />

            <InlineCodeExample code={cmp.code} active={cmp.id === activeComponent} id={cmp.id} className={style.codeExample}
              unityContainerRef={setComponentRef}
              onChange={cc => setCompiledCode(cc, cmp.id)}
              onActivate={() => setActiveComponent(cmp.id)}
              error={compiledCodes[cmp.id]?.error} />
          </section>)}

        <div ref={setDefaultContainer} />
      </article>

      {!!unityContainerWrapper && createPortal(unityComponent, unityContainerWrapper, 'unity-instance')}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{ components: Component[] }> = async ({ params }) => {
  const components = await getAllComponents();
  return {
    props: {
      components,
    },
  };
}
