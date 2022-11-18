import React, { useEffect, useState } from 'react';
import Participant from '../../types/Participant';
import styles from './PlayerLineup.module.scss';
import MatchService from '../../services/Matches';
import Role from '../../types/Role';
import Goal, { GoalOverview, GoalResult } from '../../types/Goal';
import GoalService from '../../services/Goals';
import Match from '../../types/Match';

function PlayerLineup() {
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
        case Role.TOP:
        return 1;
      case Role.JUNGLE:
        return 0.8;
      case Role.SUPP:
        return 0.2;
      default:
        return 0;
    }
  }

  const [match, setMatch] = useState<Match | null>(null);
  const [results, setResults] = useState<GoalResult[]>([]);
  const [players, setPlayers] = useState<Participant[]>([]);

	const matchElements: React.ReactElement[] = [];

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
    const partGoalRes = goalResult.participants.find((p) => player.SummonerName === p.summonerName)

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
    return (
      <div className={styles.player} key={player.SummonerID}>
        <h1>{player.SummonerName}</h1>
        {results.map((result: GoalResult) => goalComponent(result, player))}
      </div>
    )
  };

  return (
    <div className={styles.playerContainer} >
      {players.map((p) => playerComponent(p))}
    </div>
  )
};

export default PlayerLineup;
