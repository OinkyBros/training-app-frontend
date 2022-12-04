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

function PlayerLineup() {
  const [match, setMatch] = useState<Match | null>(null);
  const [results, setResults] = useState<GoalResult[]>([]);
  const [players, setPlayers] = useState<Participant[]>([]);
  const [playerIcons, setPlayerIcons] = useState<Map<number, string>>(new Map()); 

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
  }, [players]);

  useEffect(() => {
    if (!match || !match.MatchID) {
      setResults([]);
      return;
    }

    setPlayers(match.Teams
      .flatMap((t) => t.Participants)
      .filter((p) => p.IsOinky));

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
  }, [match]);

  useEffect(() => {
	  MatchService.getMatches().then((newMatches) => {
      if (!newMatches || !newMatches.at(0)) {
        setMatch(null);
        return;
      }

      setMatch(newMatches.at(0) ?? null);
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
        <label htmlFor={goalResult.goalID}>{goalResult.displayName}</label>
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
    <Grid className={styles.playerContainer} >
      {players.map((p) => playerComponent(p))}
      <GridItem className={styles.detailLink} xs={12} sm={6} md={4} lg={3} xl={2}>
        <Link to={`/matches/${match?.MatchID}`}><Button>Match details</Button></Link>
      </GridItem>
      <GridItem className={styles.detailLink} xs={12} sm={6} md={4} lg={3} xl={2}>
        <Link to={'/add-goal'}><Button>Add goal</Button></Link>
      </GridItem>
    </Grid>
  )
};

export default PlayerLineup;
