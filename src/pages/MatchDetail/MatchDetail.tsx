import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import matches from '../../services/Matches';
import Match from '../../types/Match';
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

	return (
    <div className={styles.container}>
      <h1>{match.Mode}</h1>
      <div className={styles.scoreBoard}>
        {team1}
        {team2}
      </div>
      <div className={styles.matchInfo}>
        <span>{`${d.getDay()}.${d.getMonth() + 1}.${d.getFullYear()}`}</span>
        <span>{match.Duration}</span>
      </div>
    </div>
	)
}

export default MatchDetail;