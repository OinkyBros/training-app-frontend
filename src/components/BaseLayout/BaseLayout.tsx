import React from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './BaseLayout.module.scss';

function BaseLayout(props) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>{props.children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default BaseLayout;
