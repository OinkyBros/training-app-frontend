import Match from '../../types/Match';
import MatchService from '../../services/Matches';
import styles from './MatchList.module.scss';
import Participant from '../../types/Participant';
import { useEffect, useState } from 'react';

function MatchElement(match: Match) {
	const date = new Date(match.Timestamp);

	const classes = [];
	classes.push(styles.matchContainer);

	const oinkys: React.ReactNode[] = [];

	let win = false;

	match.Teams[0].Participants.forEach((oinky) => {
		if (!oinky.IsOinky) {
			return;
		}

		win = match.Teams[0].Win;
		
		oinkys.push(
			<div className={styles.oinky} key={match.MatchID + oinky.SummonerID}>
			<span>{oinky.Role}</span>
			<img height="30px" src={oinky.ChampionIcon ?? ''} />
			<span>{oinky.SummonerName}</span>
		</div>
		);
	});
	
	match.Teams[1].Participants.forEach((oinky) => {
		if (!oinky.IsOinky) {
			return;
		}

		win = match.Teams[1].Win;

		oinkys.push(
		<div className={styles.oinky} key={match.MatchID + oinky.SummonerID}>
			<span>{oinky.Role}</span>
			<img height="30px" src={oinky.ChampionIcon ?? ''} />
			<span>{oinky.SummonerName}</span>
		</div>
		);
	});
	

	classes.push(win ? styles.matchWin : styles.matchLoss);

	return (
    <a style={{ textDecoration: "none", color: "black" }} href={"/matches/" + match.MatchID} key={match.MatchID}>
      <div className={classes.join(' ')}>
        <div className={styles.oinkyList}>
          {oinkys}
        </div>
        <div className={styles.matchInfo}>
          <span style={{ fontWeight: "bold" }}>{match.Mode}</span>
          <span>{`${date.getDay() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`}</span>
          <span>{Math.floor(match.Duration / 60) + ":" + (match.Duration - Math.floor(match.Duration / 60) * 60)}</span>
        </div>
      </div>
    </a>
	)
}

function MatchList() {
	const [matches, setMatches] = useState<Match[]>([]);

	const matchElements: React.ReactElement[] = [];

  useEffect(() => {
	  MatchService.getMatches().then((newMatches) => setMatches(newMatches));
  }, []);

	matches.forEach(element => {
		matchElements.push(MatchElement(element));
	});

	return (
		<div className={styles.matchesContainer}>
			{matchElements}
		</div>
	)
}

export default MatchList;
