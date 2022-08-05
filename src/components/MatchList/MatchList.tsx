import Match from '../../types/Match';
import MatchService from '../../services/Matches';
import styles from './MatchList.module.scss';

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
			<img src={match.Participants[0].ChampionIcon} />
			<div className={styles.matchInfo}>
				<span>{`${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`}</span>
				<span>{match.Duration}</span>
			</div>
		</div>
	)
}

function MatchList() {
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

export default MatchList;
