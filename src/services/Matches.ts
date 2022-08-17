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

async function getMatches(): Promise<Match[]> {
  const url: string = "https://api.oinky.vhoeher.de/api/v1/matches";

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    
  }).then((response) => response.json())
    .then((data: Match[]) => {
      data.forEach((m: Match) => {
        m.Timestamp *= 1000;
        m.Teams[0].Participants.sort((a, b) => actionOrder[a.Role] - actionOrder[b.Role]);
        m.Teams[1].Participants.sort((a, b) => actionOrder[a.Role] - actionOrder[b.Role]);
      });
      return data;
    });

  return response ?? [];
}


async function getMatch(matchID: string): Promise<Match> {
  const url: string = `https://api.oinky.vhoeher.de/api/v1/matches/${matchID}`;

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    
  }).then((response) => response.json())
  .then((data: Match) => {
    data.Timestamp *= 1000;
    data.Teams[0].Participants.sort((a, b) => actionOrder[a.Role] - actionOrder[b.Role]);
    data.Teams[1].Participants.sort((a, b) => actionOrder[a.Role] - actionOrder[b.Role]);
    return data;
  });

  console.log(response);

  return response ?? [];
}

export default {
  getMatches,
  getMatch,
}