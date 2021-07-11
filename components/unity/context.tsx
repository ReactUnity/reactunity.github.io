import React, { useCallback, useMemo } from 'react';
import { Unity } from './instance';
import { defaultUnityInstanceName, UnityAPI } from './types';

export interface UnityContextType {
  instance?: UnityAPI;
  component: React.ReactElement | null;
  loadedId?: string;
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

  const value = useMemo(() =>
    ({ loadedId, component, instance, loadUnity, unloadUnity }),
    [loadedId, component, instance, loadUnity, unloadUnity]);

  return React.createElement(UnityContext.Provider, { value }, children);
};

export function useGlobalUnity() {
  return React.useContext(UnityContext);
}
