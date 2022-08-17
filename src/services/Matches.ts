import '../types/Match';
import Role from '../types/Role';
import MatchMode from '../types/MatchMode';
import Match from '../types/Match';

async function getMatches(): Promise<Match[]> {
  const url: string = "https://api.oinky.vhoeher.de/api/v1/matches";

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    
  }).then((response) => response.json())
    .then((data: Match[]) => {
      data.forEach((m: any) => {
        m.Timestamp *= 1000;
      });
      return data;
    });

  console.log(response);

  return response ?? [];
}


async function getMatch(matchID: string): Promise<Match> {
  const url: string = `https://api.oinky.vhoeher.de/api/v1/matches/${matchID}`;

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    
  }).then((response) => response.json())
  .then((data) => {
    data.Timestamp *= 1000;
    return data;
  });

  console.log(response);

  return response ?? [];
}

export default {
  getMatches,
  getMatch,
}