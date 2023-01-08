import React, { useEffect, useState } from 'react';
import Participant from '../../types/Participant';
import styles from './PlayerLineup.module.scss';
import MatchService from '../../services/Matches';
import Role from '../../types/Role';
import Goal, { GoalOverview, GoalResult } from '../../types/Goal';
import GoalService from '../../services/Goals';
import Match from '../../types/Match';
import Grid from '../GridLayout/Grid';
import GridItem from '../GridLayout/GridItem';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import IconService from '../../services/Icons';

interface PlayerLineupProps {
    match: Match
}

function PlayerLineup({ match }: PlayerLineupProps) {
  const [results, setResults] = useState<GoalResult[]>([]);
  const [playerIcons, setPlayerIcons] = useState<Map<number, string>>(new Map()); 
  
  
  const players = match.Teams
    .flatMap((t) => t.Participants)
    .filter((p) => p.IsOinky);

  useEffect(() => {
    players.forEach((p) => {
      if (p.Icon) {
        IconService.getProfileIconURL(p.Icon)
          .then((url) => {
            if (!url) {
              return;
            }
            setPlayerIcons((oldIcons) => oldIcons.set(Number.parseInt(p.Icon!), url));
          });
      }
    });

    GoalService.getGoals().then((goalOverview: GoalOverview) => {
      const goalArray: Goal[] = [];

      goalOverview.customGoals.forEach((g) => goalArray.push(g));
      goalOverview.defaultGoals.forEach((g) => goalArray.push(g));

      goalArray.forEach((goal: Goal) => {
        GoalService.getGoalResult(goal.goalID, match.MatchID)
          .then((newResult) => setResults(
            (oldResults) => [newResult, ...oldResults.filter((r) => r.goalID !== newResult.goalID)]));
      });
    });
  }, []);

  const goalComponent = (goalResult: GoalResult, player: Participant) => {
    const partGoalRes = goalResult?.participants?.find((p) => player.SummonerName === p.summonerName)

    if (!partGoalRes) {
      return '';
    }

    const val = partGoalRes.goalResult;

    return (
      <React.Fragment key={goalResult.goalID}>
        <progress id={goalResult.goalID} className={val >= 0.85 ? styles.success : val >= 0.5 ? styles.ok : ''} value={val}></progress>
      </React.Fragment>
    );
  }

  const playerComponent = (player: Participant) => {
    const icon = Number.parseFloat(player.Icon!);
    const iconUrl = playerIcons.get(icon);
    return (
      <GridItem xs={12} sm={6} md={4} lg={3} xl={2} className={styles.player} key={player.SummonerID}>
        <h1>{iconUrl ? <img src={iconUrl} style={{width: "1em", height: "1em"}}/> : null}{player.SummonerName}</h1>
        
        {results.map((result: GoalResult) => goalComponent(result, player))}
      </GridItem>
    )
  };

  return (
    <Link className={styles.playerContainer} to={`/matches/${match?.MatchID}`}>
        {players.map((p) => playerComponent(p))}
    </Link>
  )
};

export default PlayerLineup;
