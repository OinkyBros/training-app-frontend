import React from 'react';
import styles from './Grid.module.scss';

interface GridProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

function Grid({ children, className, ...props }: GridProps) {
  return (
    <div className={`${styles.grid} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Grid;
