import Participant from './Participant';
import MatchMode from './MatchMode';
import Team from './Team';

class Match {
	MatchID: string = '';
	Timestamp: number = Date.now();
	Duration: number = 0;
	Mode: MatchMode = MatchMode.FLEX;
	Teams: Team[] = [];
}

export default Match;