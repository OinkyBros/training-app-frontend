import '../types/Match';
import Role from '../types/Role';
import MatchMode from '../types/MatchMode';
import Match from '../types/Match';
/*

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
    Mode: MatchMode.CLASH,
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
      },
      {
        Summonername: 'Daray',
        SummonerID: '12345',
        Icon: 'uri',
        Champion: 'Azir',
        ChampionIcon: 'http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/Azir.png',
        Role: Role.MID,
        IsOinky: true,
      }
    ],
  },
  {
    MatchID: '4',
    Timestamp: new Date(),
    Duration: '28:12',
    Win: false,
    Mode: MatchMode.NORMAL,
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
  */
const matches = [
  {
     Duration:1536,
     MatchID:"EUW1_5996514311",
     Mode:"FLEX",
     Teams:[
        {
           Participants:[
              {
                 Champion:"Malphite",
                 ChampionIcon:null,
                 Icon:null,
                 IsOinky:true,
                 Role:"TOP",
                 SummonerID:"m5dxeyrZrvKDjMagswGyb49Byz7y5KmwRLddoGjRFG2TL7Y",
                 SummonerName:"Ploinky"
              },
              {
                 Champion:"Amumu",
                 ChampionIcon:null,
                 Icon:null,
                 IsOinky:true,
                 Role:"JUNGLE",
                 SummonerID:"pyspJVAa8ITAb0zQCkKvDWDlwhgx04X5WZMyTv41flPCuJQ",
                 SummonerName:"Voinky"
              },
              {
                 Champion:"Vex",
                 ChampionIcon:null,
                 Icon:null,
                 IsOinky:true,
                 Role:"MID",
                 SummonerID:"ejUWaGixNFqThxTW4S8AFtxHCjfqoqDM72wB98jAiog5A2V2",
                 SummonerName:"Daray"
              },
              {
                 Champion:"Ashe",
                 ChampionIcon:null,
                 Icon: null,
                 IsOinky: true,
                 Role:"BOT",
                 SummonerID:"cIYRLpRsf6141xfmfFk_hois42ki_Fj9ITOU6wUzPeuyErI",
                 SummonerName:"Stroinky"
              },
              {
                 Champion:"Alistar",
                 ChampionIcon:null,
                 Icon: null,
                 IsOinky: false,
                 Role:"SUPP",
                 SummonerID:"v3vr3iY8-yuyYGzeG4ZBpS7OI9JgApxTqHxsyzAZHnLfMG8",
                 SummonerName:"karlheinzmüller"
              }
           ],
           TeamID:100,
           Win:false
        },
        {
           Participants:[
              {
                 Champion:"Fiora",
                 ChampionIcon:null,
                 Icon: null,
                 IsOinky: false,
                 Role:"TOP",
                 SummonerID:"iK1_AGjZtEJuNNVAKHhE4jVazR5yyT7Ux3b0d41tIrQVvEa-",
                 SummonerName:"MahRRu"
              },
              {
                 Champion:"Warwick",
                 ChampionIcon:null,
                 Icon: null,
                 IsOinky: false,
                 Role:"JUNGLE",
                 SummonerID:"yTcq3gOwbNByOBfNqwlm38baUhODb4sTJj9uWZddQQ4hTio",
                 SummonerName:"Sodoma y Gomorra"
              },
              {
                 Champion:"Zyra",
                 ChampionIcon:null,
                 Icon: null,
                 IsOinky: false,
                 Role:"MID",
                 SummonerID:"ZiANZePwyOfzil6yd-eb4CdwS1I4rJTKfs_nlAbtgJZ9Lbg",
                 SummonerName:"MEK1"
              },
              {
                 Champion:"MissFortune",
                 ChampionIcon:null,
                 Icon: null,
                 IsOinky: false,
                 Role:"BOT",
                 SummonerID:"lckfedp9sRZgnhHjbSvxfpae0QgjPiGCxi2QivHIbJy1DJU",
                 SummonerName:"NR 1 ADC"
              },
              {
                 Champion:"Xerath",
                 ChampionIcon:null,
                 Icon: null,
                 IsOinky: false,
                 Role:"SUPP",
                 SummonerID:"ttOQkUKoXmmx6gguAAsi927vNQgHRAUQm_3Vu8PzJw4s_pI",
                 SummonerName:"Radihaxx"
              }
           ],
           TeamID:200,
           Win:true
        }
     ],
     Timestamp: 1659381944489
  } as Match,
]

function getMatches(): Match[] {
  return matches;
}

function getMatch(matchID: string): Match | null {
  let match = null;

  matches.forEach((m) => {
    console.log(m.MatchID + "===" + matchID)
    if (m.MatchID === matchID) {
      match = m;
    }
  });

  return match;
}

export default {
  getMatches,
  getMatch,
}