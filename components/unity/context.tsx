import React, { useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Unity } from './instance';
import { defaultUnityInstanceName, UnityAPI } from './types';

export interface UnityContextType {
  instance?: UnityAPI;
  component: React.ReactElement | null;
  loadedId?: string;
  container?: HTMLDivElement;
  loadUnity: (id?: string, className?: string) => void;
  unloadUnity: () => void;
}

const UnityContext = React.createContext<UnityContextType>({ component: null, loadUnity: () => null, unloadUnity: () => null });

export function GlobalUnityProvider({ children }: { children?: React.ReactNode }) {
  const [loadedId, setLoadedId] = React.useState<string>();
  const [className, setClassName] = React.useState<string>();
  const [instance, setInstance] = React.useState<UnityAPI>();

  const loadUnity = useCallback((id?: string, className?: string) => {
    setLoadedId(id || defaultUnityInstanceName);
    setClassName(className);
  }, [setLoadedId, setClassName]);

  const unloadUnity = useCallback(() => {
    setLoadedId(null);
    setClassName(null);
  }, [setLoadedId, setClassName]);

  const component = React.useMemo(() => loadedId == null ? null :
    <Unity unityRef={setInstance} sampleName={loadedId} className={className} />,
    [setInstance, loadedId, className]);


  const [container, setContainer] = React.useState<HTMLDivElement>();

  useEffect(() => {
    const el = document.createElement('div');
    el.className = 'global-unity-container';
    setContainer(el);
    return () => el.remove();
  }, [setContainer])

  const unityPortal = !!container && createPortal(component, container, 'unity-instance');

  const value = useMemo(() =>
    ({ loadedId, component, instance, container, loadUnity, unloadUnity }),
    [loadedId, component, instance, container, loadUnity, unloadUnity]);

  return <>
    {unityPortal}
    <UnityContext.Provider value={value}>{children}</UnityContext.Provider>
  </>;
};

export function useGlobalUnity() {
  return React.useContext(UnityContext);
}
