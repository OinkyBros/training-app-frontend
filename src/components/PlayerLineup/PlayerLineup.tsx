import React, { useEffect, useState } from 'react';
import Participant from '../../types/Participant';
import styles from './PlayerLineup.module.scss';
import MatchService from '../../services/Matches';
import Role from '../../types/Role';

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

	const [players, setPlayers] = useState<Participant[]>([]);
	const [matchDuration, setMatchDuration] = useState<number>(0);

	const matchElements: React.ReactElement[] = [];

  useEffect(() => {
	  MatchService.getMatches().then((newMatches) => {
      if (!newMatches) {
        setPlayers([]);
        return;
      }

      const matchId = newMatches.at(0);

      if(!matchId) {
        setPlayers([]);
        return;
      }

      MatchService.getMatch(matchId.MatchID).then((match) => {
        setMatchDuration(match.Duration);
        setPlayers(match.Teams.flatMap((team) => team.Participants.filter((participant) => participant.IsOinky)))
      });
      
    });
  }, []);

  const playerComponent = (player: Participant, matchDuration: number) => {
    const csVal = player.CS / 10 / (matchDuration / 60) / getRoleCSFactor(player.Role);
    const vsVal = player.VisionScore / (matchDuration / 60) / getRoleVisionScoreFactor(player.Role);
    return (
      <div className={styles.player} key={player.SummonerID}>
        <h1>{player.SummonerName}</h1>
        <label htmlFor="cs_score">Vasallenwertung:</label>
        <progress id="cs_score"className={csVal >= 0.85 ? styles.success : csVal >= 0.5 ? styles.ok : ''} value={csVal}></progress>
        <label htmlFor="vs_score">Sichtwertung:</label>
        <progress id="vs_score" className={vsVal >= 0.85 ? styles.success : vsVal >= 0.5 ? styles.ok : ''} value={vsVal}></progress>

      </div>
    )
  };

  return (
    <div className={styles.playerContainer} >
      {players.map((p) => playerComponent(p, matchDuration))}
    </div>
  )
};

export default PlayerLineup;
