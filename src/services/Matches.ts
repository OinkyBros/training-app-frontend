import '../types/Match';
import Role from '../types/Role';
import MatchMode from '../types/MatchMode';
import Match from '../types/Match';

const actionOrder = {
  [Role.TOP]: 0,
  [Role.JUNGLE]: 1,
  [Role.MID]: 2,
  [Role.BOT]: 3,
  [Role.SUPP]: 4,
  [Role.NONE]: 5,
};

class MatchService {
  public static async getMatches(): Promise<Match[]> {
    const url: string = "https://api.oinky.vhoeher.de/api/v1/matches";
  
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      
    }).then((response) => response.json())
      .then((data: Match[]) => {
        data.forEach((m: Match) => m = this.cleanUpApiData(m));
        return data;
      });
  
    return response ?? [];
  }
  
  
  public static async getMatch(matchID: string): Promise<Match> {
    const url: string = `https://api.oinky.vhoeher.de/api/v1/matches/${matchID}`;
  
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      
    }).then((response) => response.json())
    .then((data: Match) => {
      return this.cleanUpApiData(data);
    });
  
    return response ?? [];
  }
  
  public static cleanUpApiData(match: Match): Match {
    match.Timestamp *= 1000;
    match.Teams[0].Participants.sort((a, b) => actionOrder[a.Role] - actionOrder[b.Role]);
    match.Teams[1].Participants.sort((a, b) => actionOrder[a.Role] - actionOrder[b.Role]);
    return match;
  }

}

export default MatchService;
