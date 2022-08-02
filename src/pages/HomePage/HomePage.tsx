import React from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import MatchService from '../../services/Matches';
import Match from '../../types/Match';
import styles from './HomePage.module.scss';

function MatchElement(match: Match) {
  const d = new Date(match.Timestamp)

  const classes = [];
  classes.push(styles.matchContainer);

  if (match.Win) {
    classes.push(styles.matchWin);
  } else {
    classes.push(styles.matchLoss);
  }

  return (
    <div className={classes.join(' ')} key={match.MatchID}>
      <span>{`${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`}</span>
      <span>{match.Duration}</span>
    </div>
  )
}

function HomePage() {
  const matchElements: React.ReactElement[] = [];

  MatchService.getMatches().forEach(element => {
    matchElements.push(MatchElement(element));
  });

  return (
    <div className={styles.matchesContainer}>
      {matchElements}
    </div>
  )
}

export default HomePage;