import Match from '../../types/Match';
import MatchService from '../../services/Matches';
import styles from './MatchList.module.scss';
import Participant from '../../types/Participant';
import { useEffect, useState } from 'react';

function MatchElement(match: Match) {
	const d = new Date(match.Timestamp)

	const classes = [];
	classes.push(styles.matchContainer);

	if (match.Teams[0].Win) {
		classes.push(styles.matchWin);
	} else {
		classes.push(styles.matchLoss);
	}

	const oinkys: React.ReactNode[] = [];

	match.Teams[0].Participants.forEach((oinky) => {
		if (!oinky.IsOinky) {
			return;
		}

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

		oinkys.push(
		<div className={styles.oinky} key={match.MatchID + oinky.SummonerID}>
			<span>{oinky.Role}</span>
			<img height="30px" src={oinky.ChampionIcon ?? ''} />
			<span>{oinky.SummonerName}</span>
		</div>
		);
	});

	return (
    <a style={{ textDecoration: "none", color: "black" }} href={"/matches/" + match.MatchID} key={match.MatchID}>
      <div className={classes.join(' ')}>
        <div className={styles.oinkyList}>
          {oinkys}
        </div>
        <div className={styles.matchInfo}>
          <span style={{ fontWeight: "bold" }}>{match.Mode}</span>
          <span>{`${d.getDay() + 1}.${d.getMonth() + 1}.${d.getFullYear()}`}</span>
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
