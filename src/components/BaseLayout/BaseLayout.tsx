import React from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './BaseLayout.module.scss';
import { Link } from "react-router-dom";

function BaseLayout(props: any) {
  return (
    <div className={styles.container}>
      <Header />
      <aside className={styles.menu}>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/goals'>Goals</Link>
            </li>
        </ul>
      </aside>
      <main className={styles.main}>
        <div className={styles.content}>{props.children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default BaseLayout;
