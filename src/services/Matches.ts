import '../types/Match';
import Role from '../types/Role';
import MatchMode from '../types/MatchMode';
import Match from '../types/Match';

const matches = [
  {
    MatchID: '0',
    Timestamp: new Date(),
    Duration: '22:06',
    Win: false,
    Mode: MatchMode.FLEX,
    Participants: [
      {
        Summonername: 'Ploinky',
        SummonerID: '12345',
        Icon: 'uri',
        Champion: 'Irelia',
        ChampionIcon: 'http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/Irelia.png',
        Role: Role.TOP,
        IsOinky: true,
      }
    ],
  },
  {
    MatchID: '1',
    Timestamp: new Date(),
    Duration: '32:06',
    Win: true,
    Mode: MatchMode.FLEX,
    Participants: [
      {
        Summonername: 'Ploinky',
        SummonerID: '12345',
        Icon: 'uri',
        Champion: 'Malphite',
        ChampionIcon: 'http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/Malphite.png',
        Role: Role.TOP,
        IsOinky: true,
      }
    ],
  },
  {
    MatchID: '2',
    Timestamp: new Date(),
    Duration: '43:23',
    Win: true,
    Mode: MatchMode.FLEX,
    Participants: [
      {
        Summonername: 'Ploinky',
        SummonerID: '12345',
        Icon: 'uri',
        Champion: 'Renekton',
        ChampionIcon: 'http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/Renekton.png',
        Role: Role.TOP,
        IsOinky: true,
      }
    ],
  },
  {
    MatchID: '3',
    Timestamp: new Date(),
    Duration: '34:54',
    Win: true,
    Mode: MatchMode.FLEX,
    Participants: [
      {
        Summonername: 'Ploinky',
        SummonerID: '12345',
        Icon: 'uri',
        Champion: 'Renekton',
        ChampionIcon: 'http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/Renekton.png',
        Role: Role.TOP,
        IsOinky: true,
      }
    ],
  },
  {
    MatchID: '4',
    Timestamp: new Date(),
    Duration: '28:12',
    Win: false,
    Mode: MatchMode.FLEX,
    Participants: [
      {
        Summonername: 'Ploinky',
        SummonerID: '12345',
        Icon: 'uri',
        Champion: 'Renekton',
        ChampionIcon: 'http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/Renekton.png',
        Role: Role.TOP,
        IsOinky: true,
      }
    ],
  },
]

function getMatches(): Match[] {
  return matches;
}

export default {
  getMatches,
}