import React from 'react';
import styles from './Grid.module.scss';

interface GridProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

function Grid({ children, ...props }: GridProps) {
  return (
    <div className={styles.grid} {...props}>
      {children}
    </div>
  )
}

export default Grid;
