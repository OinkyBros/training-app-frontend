import '../types/Match';
import Role from '../types/Role';
import MatchMode from '../types/MatchMode';

const matches = [
  {
    MatchID: '0',
    Timestamp: Date.now(),
    Duration: '22:06',
    Win: false,
    Mode: MatchMode.FLEX,
    Participants: [
      {
        Summonername: 'Ploinky',
        SummonerID: '12345',
        Icon: 'uri',
        Champion: 'Irelia',
        ChampionIcon: 'uri',
        Role: Role.TOP,
        IsOinky: true,
      }
    ],
  },
  {
    MatchID: '1',
    Timestamp: Date.now(),
    Duration: '32:06',
    Win: true,
    Mode: MatchMode.FLEX,
    Participants: [
      {
        Summonername: 'Ploinky',
        SummonerID: '12345',
        Icon: 'uri',
        Champion: 'Malphite',
        ChampionIcon: 'uri',
        Role: Role.TOP,
        IsOinky: true,
      }
    ],
  },
  {
    MatchID: '2',
    Timestamp: Date.now(),
    Duration: '43:23',
    Win: true,
    Mode: MatchMode.FLEX,
    Participants: [
      {
        Summonername: 'Ploinky',
        SummonerID: '12345',
        Icon: 'uri',
        Champion: 'Renekton',
        ChampionIcon: 'uri',
        Role: Role.TOP,
        IsOinky: true,
      }
    ],
  },
  {
    MatchID: '3',
    Timestamp: Date.now(),
    Duration: '34:54',
    Win: true,
    Mode: MatchMode.FLEX,
    Participants: [
      {
        Summonername: 'Ploinky',
        SummonerID: '12345',
        Icon: 'uri',
        Champion: 'Renekton',
        ChampionIcon: 'uri',
        Role: Role.TOP,
        IsOinky: true,
      }
    ],
  },
  {
    MatchID: '4',
    Timestamp: Date.now(),
    Duration: '28:12',
    Win: false,
    Mode: MatchMode.FLEX,
    Participants: [
      {
        Summonername: 'Ploinky',
        SummonerID: '12345',
        Icon: 'uri',
        Champion: 'Renekton',
        ChampionIcon: 'uri',
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