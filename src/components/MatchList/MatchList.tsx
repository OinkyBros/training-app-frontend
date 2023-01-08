import Match from '../../types/Match';
import MatchService from '../../services/Matches';
import styles from './MatchList.module.scss';
import Participant from '../../types/Participant';
import { useEffect, useState } from 'react';
import PlayerLineup from '../PlayerLineup/PlayerLineup';

function MatchList() {
	const [matches, setMatches] = useState<Match[]>([]);

	const matchElements: React.ReactElement[] = [];

    useEffect(() => {
        MatchService.getMatches().then((newMatches) => setMatches(newMatches));
    }, []);

	matches.forEach((match: Match) => {
		matchElements.push(<PlayerLineup match={match} />);
	});

	return (
		<div className={styles.matchesContainer}>
			{matchElements}
		</div>
	)
}

export default MatchList;
