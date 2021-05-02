import * as Babel from '@babel/standalone';
import clsx from 'clsx';
import dracula from 'prism-react-renderer/themes/dracula';
import React, { useEffect, useRef, useState } from 'react';
import { LiveEditor, LiveProvider } from 'react-live';
import style from './index.module.scss';

const compileES5 = (code: string) => Babel.transform(code, { presets: ['es2015', 'react'] }).code;

export interface CompiledCode {
  code: string;
  compiledCode?: string;
  error?: any;
}

interface Props {
  className?: string;
  code?: string;
  onChange?: (compiled: CompiledCode) => void;
  onFocus?: () => void;
}


const compile = (code: string) => {
  try {
    const compiledCode = compileES5(code);
    return { compiledCode, code };
  } catch (err) {
    return { code, error: err };
  }
};

export default function CodeEditor({ className, code, onChange, onFocus }: Props) {
  const [compiled, setCompiled] = useState<CompiledCode>(compile(code));
  const timeoutRef = useRef<any>();

  useEffect(() => onChange?.(compiled), []);

  const change = (code: string) => {
    if (typeof timeoutRef.current !== 'undefined') clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const comp = compile(code);
      setCompiled(comp);
      onChange(comp);
    }, 600);
  };

  return <div className={clsx(className, style.host)}>
    <LiveProvider code={code} theme={dracula}>
      <LiveEditor onChange={change} onFocus={onFocus} />
    </LiveProvider>
  </div>;
}
