import classNames from 'classnames';
import { useEffectSkipFirst } from 'hooks/use-effect-skip-first';
import { useLatest } from 'hooks/use-latest';
import React, { forwardRef, useCallback, useEffect } from 'react';
import { useGlobalUnity } from './context';
import styles from './index.module.scss';

interface Props {
  script?: string | null;
  html?: string | null;
  css?: string | null;
  className?: string;
  style?: React.CSSProperties;
  autoActivate?: boolean;
  hideActivateButton?: boolean;
}

export interface UnityCardridgeRef {
  isActive: () => boolean;
  activate: (reset: boolean) => void;
}

export const UnityCardridge = forwardRef<UnityCardridgeRef, Props>(
  function UnityCardridge(
    { script, html, css, style, className, hideActivateButton, autoActivate = true },
    ref
  ) {
    const latestScript = React.useRef(script);
    const latestHtml = React.useRef(html);
    const latestStyle = React.useRef(css);

    const unityContainer = React.useRef<HTMLDivElement | null>(null);
    const setRef = useCallback(
      (el: HTMLDivElement | null) => {
        if (el) unityContainer.current = el;
      },
      [unityContainer]
    );
    const { instance, insertTo, insertedToRef, setLoaded } = useGlobalUnity();
    useEffect(() => setLoaded(true), [setLoaded]);

    const instanceRef = useLatest(instance);

    const isActive = useCallback(() => {
      return unityContainer.current === insertedToRef.current;
    }, [insertedToRef, unityContainer]);

    const activate = useCallback(
      (reset = false) => {
        if (unityContainer.current && !isActive())
          insertTo(unityContainer.current);

        if (reset)
          instanceRef.current?.SetReactScript(
            latestScript.current || '',
            latestHtml.current || '',
            latestStyle.current || ''
          );
      },
      [
        insertTo,
        unityContainer,
        isActive,
        instanceRef,
        latestStyle,
        latestScript,
        latestHtml,
      ]
    );

    React.useImperativeHandle(ref, () => ({ activate, isActive }), [
      activate,
      isActive,
    ]);

    // Set instance style after style changes (except first time)
    useEffectSkipFirst(
      () => {
        latestStyle.current = css;
        if (autoActivate) {
          instance?.ReplaceCSS(css || '');
          activate();
        }
      },
      [css, instance, autoActivate, activate],
      () => !instance
    );

    // Set instance script after script changes (except first time)
    useEffectSkipFirst(
      () => {
        latestScript.current = script;
        if (autoActivate) {
          instance?.SetReactScript(script || '', html || '', latestStyle.current || '');
          activate();
        }
      },
      [script, html, latestStyle, instance, autoActivate, activate],
      () => !instance
    );

    // Insert cartridge if none is installed yet
    useEffect(() => {
      const current = unityContainer.current;
      const hasInsertedTo = insertedToRef.current;
      if (!current) return;
      if (!hasInsertedTo) activate(true);

      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (insertedToRef.current === unityContainer.current)
          insertTo(undefined);
      };
    }, [insertedToRef, insertTo, activate, unityContainer]);

    // Set script after Unity instance is loaded
    useEffect(() => {
      if (instance && isActive()) activate(true);
    }, [activate, instance, isActive]);

    return (
      <div ref={setRef} style={style} className={classNames(className, styles.cartridge)}>
        {!hideActivateButton && !isActive() && (
          <button onClick={() => activate(true)}>Show Preview</button>
        )}
      </div>
    );
  }
);
