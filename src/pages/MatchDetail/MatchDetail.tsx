import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import matches from '../../services/Matches';
import Match from '../../types/Match';
import styles from './MatchDetail.module.scss';

function MatchDetail() {
  let matchID = useParams().matchID;

  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    matches.getMatch(matchID ?? '').then((m) => setMatch(m));
  }, []);

  if (!match) {
    return <h1>Match not found!</h1>
  }
  
	const d = new Date(match.Timestamp)

	const classes = [];
	classes.push(styles.matchContainer);

  let win = false;

	match.Teams.forEach((team) => {
    team.Participants.forEach((player) => {
      if (player.IsOinky) {
        win = team.Win;
      }
    })
	});

	if (win) {
		classes.push(styles.matchWin);
	} else {
		classes.push(styles.matchLoss);
	}

	const oinkys: React.ReactNode[] = [];

	match.Teams[0].Participants.forEach((oinky) => {
		oinkys.push(
      <div className={styles.oinky} key={match.MatchID + oinky.SummonerID}>
        <span>{oinky.Role}</span>
			  <img height="30px" src={oinky.ChampionIcon ?? ''} />
        <span>{oinky.SummonerName}</span>
      </div>
    );
	});

	return (
    <div className={styles.container}>
      <h1>{match.Mode}</h1>
      <div className={styles.oinkyList}>
        {oinkys}
      </div>
      <div className={styles.matchInfo}>
        <span>{`${d.getDay()}.${d.getMonth() + 1}.${d.getFullYear()}`}</span>
        <span>{match.Duration}</span>
      </div>
    </div>
	)
}

export default MatchDetail;