import clsx from 'clsx';
import CodeEditor, { CompiledCode } from 'components/code-editor';
import React, { LegacyRef, ReactNode } from 'react';
import style from './index.module.scss';

interface Props {
  className?: string;
  id?: string;
  code?: string;
  active?: boolean;
  onActivate?: () => void;
  onChange?: (compiled: CompiledCode) => void;
  unityContainerRef?: LegacyRef<HTMLDivElement>;
  children?: ReactNode;
  title?: string;
  error?: string | Error;
}

export function CodeExample({ className, id, code, active, onChange, onActivate, unityContainerRef, children, title, error }: Props) {
  const errorMessage = error + '';

  return <div className={clsx(className, style.host)}>

    <div className={style.codeEditorSection}>
      <div className={style.title}>{title || 'Code'}</div>

      <CodeEditor code={code} className={style.codeEditor}
        onFocus={onActivate} onChange={onChange} />
    </div>

    <div className={style.livePreview}>
      <div className={clsx(style.title, !!error && style.error)}>{error ? 'Error' : 'Result'}</div>

      <div data-id={id} ref={unityContainerRef} className={style.unityContainer} children={children} />

      {!active &&
        <div className={style.setActiveView}>
          <button onClick={onActivate}>Run Example</button>
        </div>}

      {!!error &&
        <div className={style.errorView}>
          {errorMessage}
        </div>}
    </div>
  </div>;
}

export function InlineCodeExample(props: Props) {
  return <CodeExample {...props} className={clsx(style.inline, props.className)} />;
}
