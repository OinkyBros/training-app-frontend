import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import matches from '../../services/Matches';
import Match from '../../types/Match';
import styles from './MatchDetail.module.scss';

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

  let win = false;

	match.Teams.forEach((team) => {
    team.Participants.forEach((player) => {
      if (player.IsOinky) {
        win = team.Win;
      }
    })
	});

	const team1: React.ReactNode[] = [];

	match.Teams[0].Participants.forEach((oinky) => {
		team1.push(
      <tr className={styles.player} key={match.MatchID + oinky.SummonerID}>
        <td>
          <span>{oinky.Role}</span>
        </td>
        <td>
          <img height="30px" src={oinky.ChampionIcon ?? ''} />
          <span>{oinky.SummonerName}</span>
        </td>
        <td valign="middle" className={styles.dt}>
          <span>{oinky.Kills}</span>
        </td>
        <td valign="middle" className={styles.dt}>
          <span>{oinky.Deaths}</span>
        </td>
        <td valign="middle" className={styles.dt}>
          <span>{oinky.Assists}</span>
        </td>
      </tr>
    );
	});

	const team2: React.ReactNode[] = [];

	match.Teams[1].Participants.forEach((oinky) => {
		team2.push(
      <tr className={styles.player} key={match.MatchID + oinky.SummonerID}>
        <td valign="middle">
          <span>{oinky.Role}</span>
        </td>
        <td valign="middle" className={styles.dt}>
          <img height="30px" src={oinky.ChampionIcon ?? ''} />
          <span>{oinky.SummonerName}</span>
        </td>
        <td valign="middle" className={styles.dt}>
          <span>{oinky.Kills}</span>
        </td>
        <td valign="middle" className={styles.dt}>
          <span>{oinky.Deaths}</span>
        </td>
        <td valign="middle" className={styles.dt}>
          <span>{oinky.Assists}</span>
        </td>
      </tr>
    );
	});

	return (
    <div className={styles.container}>
      <h1>{match.Mode}</h1>
      <div className={styles.scoreBoard}>
        <table>
          <tr className={styles.scoreBoardHeading}>
            <td>Lane</td>
            <td>Name</td>
            <td>K</td>
            <td>D</td>
            <td>A</td>
          </tr>
          {team1}
        </table>
        <table>
          <tr className={styles.scoreBoardHeading}>
            <td>Lane</td>
            <td>Name</td>
            <td>K</td>
            <td>D</td>
            <td>A</td>
          </tr>
          {team2}
        </table>
      </div>
      <div className={styles.matchInfo}>
        <span>{`${d.getDay()}.${d.getMonth() + 1}.${d.getFullYear()}`}</span>
        <span>{match.Duration}</span>
      </div>
    </div>
	)
}

export default MatchDetail;