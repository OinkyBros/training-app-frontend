import React from 'react';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/">Lan Party 2022</a>
    </header>
  )
}

export default Header;