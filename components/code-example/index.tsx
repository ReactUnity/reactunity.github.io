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
}

export default function CodeExample({ className, id, code, active, onChange, onActivate, unityContainerRef, children }: Props) {
  return <div className={clsx(className, style.host)}>

    <CodeEditor code={code} className={style.codeEditor}
      onFocus={onActivate} onChange={onChange} />

    <div className={style.livePreview}>
      <div data-id={id} ref={unityContainerRef} className={style.unityContainer} children={children} />

      {!active &&
        <div className={style.setActiveView}>
          <button onClick={onActivate}>Run Example</button>
        </div>}
    </div>
  </div>;
}
