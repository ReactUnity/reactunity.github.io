import clsx from 'clsx'
import { CompiledCode, InlineCodeExample } from 'components/code-example'
import Layout from 'components/layout'
import Markdown from 'components/markdown'
import Unity, { UnityAPI } from 'components/unity'
import { getAllStyling, Styling } from 'lib/styling'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import utilStyles from 'styles/utils.module.scss'
import style from './index.module.scss'


interface Props {
  styling: Styling[];
}

export default function Components({ styling }: Props) {
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

  const [activeComponent, setActiveComponent] = useState<string>(styling[0].id);
  const activeCode = compiledCodes[activeComponent];

  const [unityRef, setUnityRef] = useState<UnityAPI>(null);

  const [defaultContainer, setDefaultContainer] = useState<HTMLDivElement>(null);
  const unityContainer = componentRefs.current[activeComponent] || defaultContainer;

  const unityComponent = useMemo(() => <Unity unityRef={setUnityRef} className={clsx(style.unityInstance)} />, [setUnityRef]);

  const [unityContainerWrapper, setUnityContainerWrapper] = useState<HTMLDivElement>();

  useEffect(() => {
    const el = document.createElement('div');
    el.className = style.unityContainerWrapper;
    setUnityContainerWrapper(el);
    return () => el.remove();
  }, [setUnityContainerWrapper])

  useEffect(() => {
    if (!unityContainerWrapper) return;
    if (unityContainer) unityContainer.appendChild(unityContainerWrapper);
    else unityContainerWrapper.remove();
  }, [unityContainerWrapper, unityContainer]);

  useEffect(() => {
    if (!(activeCode && unityRef)) return;
    if (activeCode.error) return;
    unityRef.SetReactScript(activeCode.compiledCode, activeCode.style);
  }, [activeCode, unityRef]);

  useEffect(() => {
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
        <title>Styling</title>
      </Head>
      <article className={style.host}>
        {styling.map((cmp, i) =>
          <section key={i} id={cmp.id} className={clsx(activeComponent === cmp.id && style.active)}>
            <h2 className={clsx(utilStyles.headingXl, style.heading)}>
              <span>{cmp.title}</span>
              <span className={style.titleBubble}>JSX: <code>{cmp.jsx}</code></span>
              <span className={style.titleBubble}>CSS: <code>{cmp.css}</code></span>
              {cmp.inherited && <span className={style.inheritedBubble}>Inherited</span>}
              {cmp.animatable && <span className={style.animatableBubble}>Animatable</span>}
            </h2>

            <Markdown content={cmp.contentHtml} className={style.content} />

            <InlineCodeExample code={cmp.code} active={cmp.id === activeComponent} id={cmp.id} className={style.codeExample}
              language="css"
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

export const getStaticProps: GetStaticProps<{ styling: Styling[] }> = async ({ params }) => {
  const styling = await getAllStyling();
  return {
    props: {
      styling,
    },
  };
}
