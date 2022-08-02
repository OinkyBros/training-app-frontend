import Participant from './Participant';
import MatchMode from './MatchMode';

class Match {
	MatchID: string;
	Timestamp: Date;
  Duration: string;
  Win: boolean;
	Mode: MatchMode;
	Participants: Participant[];
}

export default Match;