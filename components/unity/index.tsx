
import clsx from 'clsx';
import Head from 'next/head';
import React, { LegacyRef, useCallback, useEffect, useState } from 'react';
import style from './index.module.scss';

export interface UnityInstance {
  SendMessage: (objectName: string, methodName: string, argument?: string | number) => void;
  SetFullscreen: (toggle: 0 | 1) => void;
  Quit: () => Promise<void>;
}

export interface UnityAPI extends UnityInstance {
  SetReactScript: (jsx: string, css: string) => void;
  LoadScene: (sceneName: string) => void;
  ReloadScene: () => void;
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
  unityRef?: (unityInstance: UnityAPI) => void;
}

export default function Unity({ className, sampleName = 'injectable', unityRef, innerRef }: Props) {
  const [progress, setProgress] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(isLoaderScriptLoaded());
  const [unityInstance, setUnityInstance] = useState<UnityAPI>();

  const setCanvasRef = useCallback(async canvas => {
    if (!canvas || !scriptLoaded) { return; }

    const unityInstance: UnityInstance = await global.createUnityInstance(canvas, {
      dataUrl: `/Unity/${sampleName}/Build/WebInjectable.data`,
      frameworkUrl: `/Unity/${sampleName}/Build/WebInjectable.framework.js`,
      codeUrl: `/Unity/${sampleName}/Build/WebInjectable.wasm`,
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'reactunity',
      productName: sampleName,
      productVersion: '0.1',
    }, setProgress);

    setUnityInstance({
      SendMessage: unityInstance.SendMessage.bind(unityInstance),
      SetFullscreen: unityInstance.SetFullscreen.bind(unityInstance),
      Quit: unityInstance.Quit.bind(unityInstance),
      SetReactScript: (jsx, css) => {
        unityInstance.SendMessage('ReactCanvas', 'SetJSX', jsx);
        if (css) unityInstance.SendMessage('ReactCanvas', 'SetCSS', css);
        unityInstance.SendMessage('ReactCanvas', 'Render');
      },
      LoadScene: (sceneName) => unityInstance.SendMessage('ReactCanvas', 'LoadScene', sceneName),
      ReloadScene: () => unityInstance.SendMessage('ReactCanvas', 'ReloadScene'),
    });
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

    return () => {
      // TODO: quit crashes the Unity after a few launches
      // unityInstance.Quit();
    };
  }, [unityInstance]);

  return <>
    <Head>
      <script src="/Unity/injectable/Build/WebInjectable.loader.js" async />
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
