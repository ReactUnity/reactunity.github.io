import clsx from 'clsx';
import React from 'react';
import style from './index.module.scss';

interface Props {
  className?: string;
  content?: string;
}

function Markdown({ className, content }: Props) {
  return <div className={clsx(className, style.host)} dangerouslySetInnerHTML={{ __html: content }} />;
}

export default React.memo(Markdown);
