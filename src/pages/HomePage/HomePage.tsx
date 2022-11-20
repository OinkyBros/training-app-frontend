import React from 'react';
import PlayerLineup from '../../components/PlayerLineup/PlayerLineup';
import styles from './HomePage.module.scss';

function HomePage() {
  return (
    <div className={styles.container}>
      <PlayerLineup />
    </div>
  );
}

export default HomePage;