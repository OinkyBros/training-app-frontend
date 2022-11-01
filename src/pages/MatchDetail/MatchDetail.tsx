import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import matches from '../../services/Matches';
import Match from '../../types/Match';
import Participant from '../../types/Participant';
import Role from '../../types/Role';
import Team from '../../types/Team';
import styles from './MatchDetail.module.scss';

function didOinkysWin(teams: Team[]) {
	teams.forEach((team) => {
    team.Participants.forEach((player) => {
      if (player.IsOinky) {
        return team.Win;
      }
    })
	});
}

function getOinkys(teams: Team[]) {
  const oinkys: Participant[] = [];
	teams.forEach((team) => {
    team.Participants.forEach((player) => {
      if (player.IsOinky) {
        oinkys.push(player);
      }
    })
	});

  return oinkys;
}

function TeamScoreBoard(team: Team, matchID: string) {
  const teamElements: React.ReactNode[] = [];

  team.Participants.forEach((oinky) => {
    teamElements.push(
      <tr className={styles.player} key={matchID + oinky.SummonerID}>
        <td>
          <span>{oinky.Role}</span>
        </td>
        <td>
          {oinky.ChampionIcon !== '' ?? <img height="30px" src={oinky.ChampionIcon ?? ''} />}
          <span>{oinky.SummonerName}</span>
        </td>
        <td className={styles.dt}>
          <span>{oinky.Kills}</span>
        </td>
        <td className={styles.dt}>
          <span>{oinky.Deaths}</span>
        </td>
        <td className={styles.dt}>
          <span>{oinky.Assists}</span>
        </td>
      </tr>
    );
  });

  return (
    <table>
      <tr className={styles.scoreBoardHeading}>
        <td>Lane</td>
        <td>Name</td>
        <td>K</td>
        <td>D</td>
        <td>A</td>
      </tr>
      {teamElements}
    </table>
  )
}

function getRoleVisionScoreFactor(role: Role) {
  switch(role) {
    case Role.MID:
    case Role.BOT:
      case Role.TOP:
      return 1;
    case Role.JUNGLE:
      return 1.5;
    case Role.SUPP:
      return 2;
    default:
      return 0;
  }
}

function getRoleCSFactor(role: Role) {
  switch(role) {
    case Role.MID:
    case Role.BOT:
      return 1;
    case Role.TOP:
    case Role.JUNGLE:
      return 0.8;
    case Role.SUPP:
      return 0.5;
    default:
      return 0;
  }
}

function OinkyTrainingBoard(oinkys: Participant[], matchDuration: number) {
  const oinkyElements: React.ReactNode[] = [];

  oinkys.forEach((oinky) => {
    oinkyElements.push(
      <tr className={styles.player} key={oinky.SummonerID}>
        <td>
          <span>{oinky.Role}</span>
        </td>
        <td>
          {oinky.ChampionIcon !== '' ?? <img height="30px" src={oinky.ChampionIcon ?? ''} />}
          <span>{oinky.SummonerName}</span>
        </td>
        <td className={styles.dt}>
          <span>{oinky.Kills}</span>
        </td>
        <td className={styles.dt}>
          <span>{oinky.Deaths}</span>
        </td>
        <td className={styles.dt}>
          <span>{oinky.Assists}</span>
        </td>
        <td className={styles.dt}>
          <span>{oinky.VisionScore}</span>
        </td>
        <td className={styles.dt}>
          <span>{Math.round(oinky.VisionScore / (matchDuration / 60) / getRoleVisionScoreFactor(oinky.Role) * 100 )}%</span>
        </td>
        <td className={styles.dt}>
          <span>{oinky.CS}</span>
        </td>
        <td className={styles.dt}>
          <span>{Math.round(oinky.CS / 10 * getRoleCSFactor(oinky.Role) / (matchDuration / 60) * 100)}%</span>
        </td>
      </tr>
    );

    console.log(matchDuration);
  });

  return <table >
    <tr className={styles.scoreBoardHeading}>
      <td>Lane</td>
      <td>Name</td>
      <td>K</td>
      <td>D</td>
      <td>A</td>
      <td>VS</td>
      <td>Faktor</td>
      <td>CS</td>
      <td>Faktor</td>
    </tr>
    {oinkyElements}
  </table>;
}

function MatchDetail() {
  let matchID = useParams().matchID;

  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    matches.getMatch(matchID ?? '').then((m) => setMatch(m));
  }, []);

  if (!match) {
    return <h1>Match not found!</h1>
  }
  
	const d = new Date(match.Timestamp)

  let win = didOinkysWin(match.Teams)

	const team1: React.ReactNode = TeamScoreBoard(match.Teams[0], match.MatchID);
	const team2: React.ReactNode = TeamScoreBoard(match.Teams[1], match.MatchID);
  const ergebnis = OinkyTrainingBoard(getOinkys(match.Teams), match.Duration);

	return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>{match.Mode}</h1>
        <div className={styles.scoreBoard}>
          {team1}
          {team2}
        </div>
        <div className={styles.matchInfo}>
          <span>{`${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`}</span>
          <span>{Math.floor(match.Duration / 60) + ":" + (match.Duration - Math.floor(match.Duration / 60) * 60)}</span>
        </div>
      </div>
      <div className={styles.container}>
        <h1>Trainingsergebnis</h1>
        {ergebnis}
      </div>
    </div>
	)
}

export default MatchDetail;