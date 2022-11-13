import React from 'react';
import styles from './GridItem.module.scss';

type GridItemColSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridItemProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    xs?: GridItemColSize;
    sm?: GridItemColSize;
    md?: GridItemColSize;
    lg?: GridItemColSize;
    xl?: GridItemColSize;
}

const xsMap = new Map<GridItemColSize, string>([
  [0, styles.size0],
  [1, styles.xs1],
  [2, styles.xs2],
  [3, styles.xs3],
  [4, styles.xs4],
  [5, styles.xs5],
  [6, styles.xs6],
  [7, styles.xs7],
  [8, styles.xs8],
  [9, styles.xs9],
  [10, styles.xs10],
  [11, styles.xs11],
  [12, styles.xs12],
]);

const smMap = new Map<GridItemColSize, string>([
  [0, styles.size0],
  [1, styles.sm1],
  [2, styles.sm2],
  [3, styles.sm3],
  [4, styles.sm4],
  [5, styles.sm5],
  [6, styles.sm6],
  [7, styles.sm7],
  [8, styles.sm8],
  [9, styles.sm9],
  [10, styles.sm10],
  [11, styles.sm11],
  [12, styles.sm12],
]);

const mdMap = new Map<GridItemColSize, string>([
  [0, styles.size0],
  [1, styles.md1],
  [2, styles.md2],
  [3, styles.md3],
  [4, styles.md4],
  [5, styles.md5],
  [6, styles.md6],
  [7, styles.md7],
  [8, styles.md8],
  [9, styles.md9],
  [10, styles.md10],
  [11, styles.md11],
  [12, styles.md12],
]);

const lgMap = new Map<GridItemColSize, string>([
  [0, styles.size0],
  [1, styles.lg1],
  [2, styles.lg2],
  [3, styles.lg3],
  [4, styles.lg4],
  [5, styles.lg5],
  [6, styles.lg6],
  [7, styles.lg7],
  [8, styles.lg8],
  [9, styles.lg9],
  [10, styles.lg10],
  [11, styles.lg11],
  [12, styles.lg12],
]);
const xlMap = new Map<GridItemColSize, string>([
  [0, styles.size0],
  [1, styles.xl1],
  [2, styles.xl2],
  [3, styles.xl3],
  [4, styles.xl4],
  [5, styles.xl5],
  [6, styles.xl6],
  [7, styles.xl7],
  [8, styles.xl8],
  [9, styles.xl9],
  [10, styles.xl10],
  [11, styles.xl11],
  [12, styles.xl12],
]);

function GridItem({ children, xs, sm, md, lg, xl, ...props}: GridItemProps) {
  const xsStyle = xsMap.get(xs ?? 12);
  const smStyle = smMap.get(sm ?? xs ?? 12);
  const mdStyle = mdMap.get(md ?? sm ?? xs ?? 12);
  const lgStyle = lgMap.get(lg ?? md ?? sm ?? xs ?? 12);
  const xlStyle = xlMap.get(xl ?? lg ?? md ?? sm ?? xs ?? 12);

  return (
    <div className={`${styles.gridItem} ${xsStyle} ${smStyle} ${mdStyle} ${lgStyle} ${xlStyle}`} {...props}>
      {children}
    </div>
  )
}

GridItem.defaultProps = {
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
}

export default GridItem;