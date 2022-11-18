import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import PlayerLineup from '../../components/PlayerLineup/PlayerLineup';
import GoalService from '../../services/Goals';
import styles from './HomePage.module.scss';

function HomePage() {
  return (
    <div className={styles.container}>
      <Link to="/lan"><Button>Lan-Party scores</Button></Link>
      <PlayerLineup />
    </div>
  );
}

export default HomePage;