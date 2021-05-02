
import clsx from 'clsx';
import Head from 'next/head';
import React, { LegacyRef, useCallback, useEffect, useState } from 'react';
import style from './index.module.scss';

export interface UnityInstance {
  SendMessage: (objectName: string, methodName: string, argument?: string | number) => void;
}

declare global {
  function createUnityInstance(canvas: any, props: any, progressCallback: (progress: number) => void): Promise<UnityInstance>;
}

function isLoaderScriptLoaded() {
  return typeof global.createUnityInstance === 'function';
}

interface Props {
  className?: string;
  sampleName?: string;
  innerRef?: LegacyRef<HTMLDivElement>;
  unityRef?: (unityInstance: UnityInstance) => void;
}

export default function Unity({ className, sampleName, unityRef, innerRef }: Props) {
  const [progress, setProgress] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(isLoaderScriptLoaded());
  const [unityInstance, setUnityInstance] = useState<UnityInstance>();

  const setCanvasRef = useCallback(async canvas => {
    if (!canvas || !scriptLoaded) { return; }

    const unityInstance: UnityInstance = await global.createUnityInstance(canvas, {
      dataUrl: `/Unity/${sampleName}/Build/Web.data`,
      frameworkUrl: `/Unity/${sampleName}/Build/Web.framework.js`,
      codeUrl: `/Unity/${sampleName}/Build/Web.wasm`,
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'reactunity',
      productName: sampleName,
      productVersion: '0.1',
    }, setProgress);

    setUnityInstance(unityInstance);
  }, [sampleName, scriptLoaded, setUnityInstance]);

  useEffect(() => {
    unityRef?.(unityInstance);
  }, [unityRef, unityInstance]);

  useEffect(() => {
    if (scriptLoaded) return;

    const interval = setInterval(() => {
      if (isLoaderScriptLoaded()) setScriptLoaded(true);
    }, 100);

    return () => clearInterval(interval);
  }, [scriptLoaded]);

  useEffect(() => {
    if (!unityInstance) return;

    return () => unityInstance.SendMessage('ReactCanvas', 'Quit');
  }, [unityInstance]);

  return <>
    <Head>
      <script src="/Unity/sample1/Build/Web.loader.js" async />
    </Head>

    <div className={clsx(className, style.host)} ref={innerRef}>
      <canvas className={style.canvas} ref={setCanvasRef} tabIndex={-1} />

      {progress < 1 &&
        <div className={style.progress}>
          <div className={style.spinner}></div>
          <div className={style.progressBar} style={{ paddingRight: ((1 - progress) * 80) + '%' }}></div>
        </div>}
    </div>
  </>;
}
