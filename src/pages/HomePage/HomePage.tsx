import React from 'react';
import MatchList from '../../components/MatchList/MatchList';
import PlayerLineup from '../../components/PlayerLineup/PlayerLineup';
import styles from './HomePage.module.scss';

function HomePage() {
  return (
    <div className={styles.container}>
      <MatchList />
    </div>
  );
}

export default HomePage;