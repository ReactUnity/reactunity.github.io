import clsx from 'clsx';
import { Language } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/dracula';
import React, { useEffect, useRef, useState } from 'react';
import { LiveEditor, LiveProvider } from 'react-live';
import style from './index.module.scss';

interface Props {
  className?: string;
  code?: string;
  language?: Language;
  onChange?: (compiled: string) => void;
  onFocus?: () => void;
  transform?: (code: string) => string;
}

export default function CodeEditor({ className, code, language, onChange, onFocus }: Props) {
  const [compiled, setCompiled] = useState<string>(code);
  const timeoutRef = useRef<any>();

  useEffect(() => onChange?.(compiled), []);

  const change = (code: string) => {
    if (typeof timeoutRef.current !== 'undefined') clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCompiled(code);
      onChange(code);
    }, 600);
  };

  return <div className={clsx(className, style.host)}>
    <LiveProvider code={code} theme={dracula} language={language}>
      <LiveEditor onChange={change} onFocus={onFocus} />
    </LiveProvider>
  </div>;
}
