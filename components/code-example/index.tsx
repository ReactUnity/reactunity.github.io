import * as Babel from '@babel/standalone';
import clsx from 'clsx';
import CodeEditor from 'components/code-editor';
import { Language } from 'prism-react-renderer';
import React, { LegacyRef, ReactNode, useState } from 'react';
import style from './index.module.scss';

export interface CodeSpace extends Partial<Record<Language, string>> {
  id: string;
  jsx: string;
  css?: string;
}

interface Props {
  className?: string;
  id?: string;
  code?: CodeSpace;
  language?: Language;
  active?: boolean;
  onActivate?: () => void;
  onChange?: (compiled: CompiledCode) => void;
  unityContainerRef?: LegacyRef<HTMLDivElement>;
  children?: ReactNode;
  title?: string;
  error?: string | Error;
}



export interface CompiledCode {
  code: string;
  style: string;
  compiledCode?: string;
  error?: any;
}

const transformJsxToES5 = (code: string) => Babel.transform(code, { presets: ['es2015', 'react'] }).code;

const defaultTransforms = {
  jsx: transformJsxToES5,
};

const compile = (code: string, transform: (code: string) => string) => {
  try {
    const compiledCode = transform(code);
    return { compiledCode, code };
  } catch (err) {
    return { code, error: err };
  }
};

export function CodeExample({ className, id, code, active, onChange, onActivate, unityContainerRef, children, title, error, language }: Props) {
  const errorMessage = error + '';

  language = language || 'jsx';

  const files = Object.keys(code).filter(x => x !== 'id') as Language[];

  const [activeFile, setActiveFile] = useState(language);

  const [codes, setCodes] = useState(code);
  const activeCode = codes[activeFile];


  const changed = (newCodes: CodeSpace) => {
    setCodes(newCodes);

    const compiled = compile(newCodes.jsx, defaultTransforms.jsx);
    onChange?.({ ...compiled, style: newCodes.css });
  };

  const change = (newCode: string) => {
    const newCodes = { ...codes, [activeFile]: newCode };
    changed(newCodes);
  };

  return <div className={clsx(className, style.host)}>

    <div className={style.codeEditorSection}>

      <div className={style.title}>
        {files.length <= 1 ?
          <>{title || 'Code'} ({language})</> :

          files.map(file =>
            <button className={clsx(activeFile === file && style.active, style.fileTab)}
              onClick={() => setActiveFile(file)} key={file}>
              {file}
            </button>)}

        <div style={{ flex: 1 }} />

        {codes[activeFile] != code[activeFile] &&
          <button onClick={() => change(code[activeFile])} className={style.revertButton}>
            Revert
          </button>}
      </div>

      <CodeEditor code={activeCode} className={style.codeEditor} language={activeFile}
        onFocus={onActivate} onChange={change} />
    </div>

    <div className={style.livePreview}>
      <div className={clsx(style.title, !!error && style.error)}>{error ? 'Error' : 'Result'}</div>

      <div data-id={id} ref={unityContainerRef} className={style.unityContainer}>
        {children}
      </div>

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
