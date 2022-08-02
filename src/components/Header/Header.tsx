import React from 'react';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <span>Oinky Bros Training App</span>
    </header>
  )
}

export default Header;