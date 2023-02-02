import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GoalService from '../../services/GoalsService';
import matches from '../../services/Matches';
import Goal, { GoalResult } from '../../types/Goal';
import Match from '../../types/Match';
import Participant from '../../types/Participant';
import Role, { roleOrder } from '../../types/Role';
import Team from '../../types/Team';
import GoalElement from './GoalElement';
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
          <span>{oinky.Champion}</span>
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
    <table key={matchID + team.TeamID}>
        <thead>
            <tr className={styles.scoreBoardHeading}>
                <td>Lane</td>
                <td>Champion</td>
                <td>Name</td>
                <td>K</td>
                <td>D</td>
                <td>A</td>
            </tr>
        </thead>
        <tbody>
            {teamElements}
        </tbody>
    </table>
  )
}

function OinkyTrainingBoard(oinkys: Participant[], goals: Goal[], results: GoalResult[], matchDuration: number) {
    return (
        <div className={styles.goals}>
            {goals.map((goal: Goal) => <GoalElement goal={goal} results={results ?? []} />)}
        </div>
    )
}

function MatchDetail() {
  let matchID = useParams().matchID;

  const [match, setMatch] = useState<Match | undefined | null>(undefined);
  const [goals, setGoals] = useState<Goal[] | undefined | null>(undefined);
  const [results, setResults] = useState<GoalResult[] | undefined | null>(undefined);

    useEffect(() => {
        matches.getMatch(matchID ?? '').then((m) => setMatch(m));
        GoalService.getGoals().then((g) => setGoals([...g.customGoals, ...g.defaultGoals]));
    }, []);

    useEffect(() => {
        if(!matchID || !goals) {
            return;
        }

        const p: Promise<GoalResult>[] = goals?.map((goal) => GoalService.getGoalResult(goal.goalID, matchID ?? ''));
        Promise.all(p).then(setResults);
    }, [goals]);

    if (match === null) {
    return <h1>Match not found!</h1>
    }
  
    if (match === undefined) {
        return <h1>Loading...</h1>
    }

    const d = new Date(match.Timestamp)

    let win = didOinkysWin(match.Teams)

	const team1: React.ReactNode = TeamScoreBoard(match.Teams[0], match.MatchID);
	const team2: React.ReactNode = TeamScoreBoard(match.Teams[1], match.MatchID);
  const ergebnis = OinkyTrainingBoard(getOinkys(match.Teams), goals ?? [], results ?? [], match.Duration);

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
        <h1>Trainingsergebnis</h1>
        {ergebnis}
    </div>
	)
}

export default MatchDetail;