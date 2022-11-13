import React from 'react';
import styles from './Imprint.module.scss';

function Imprint() {
  return (
    <div className={styles.imprint}>
      <span>Johannes Litger</span>
      <span>Königsberger Straße 3</span>
      <span>51789 Lindlar</span>
      <span>+49 1517 0056840</span>
      <span>mail@ploinky.de</span>
    </div>
  )
}

export default Imprint;
