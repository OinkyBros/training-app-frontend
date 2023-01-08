import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">Oinky Bros Training App</Link>
    </header>
  )
}

export default Header;