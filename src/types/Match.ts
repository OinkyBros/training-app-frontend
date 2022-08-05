import Participant from './Participant';
import MatchMode from './MatchMode';

class Match {
	MatchID: string = '';
	Timestamp: Date = new Date();
  Duration: string = '';
  Win: boolean = false;
	Mode: MatchMode = MatchMode.FLEX;
	Participants: Participant[] = [];
}

export default Match;