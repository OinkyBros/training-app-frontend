import React, { useEffect, useState } from 'react';
import Participant from '../../types/Participant';
import styles from './PlayerLineup.module.scss';
import MatchService from '../../services/Matches';
import Role from '../../types/Role';
import Goal, { GoalOverview, GoalResult } from '../../types/Goal';
import GoalService from '../../services/GoalsService';
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
                    setPlayerIcons((oldIcons) => new Map(oldIcons.set(Number.parseInt(p.Icon!), url)));
                });
            }
        });
  }, []);

    const playerComponent = (player: Participant) => {
        const icon = Number.parseFloat(player.Icon!);
        const iconUrl = playerIcons.get(icon);
        return (
        <GridItem xs={12} sm={6} md={4} lg={3} xl={2} className={styles.player} key={player.SummonerID}>
            {iconUrl ? <img src={iconUrl} style={{width: "3rem", height: "3rem"}}/> : null}
            <h1>{player.SummonerName}</h1>
            <span>{player.Champion}</span>
            <span>{player.Role}</span>
        </GridItem>
        )
    };
    
    let diffTime = Date.now() - (match?.Timestamp);
    let days = diffTime / (24*60*60*1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    let secs = (minutes % 1) * 60;
    [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)];

    const oinkysWon = match.Teams.filter((t) => t.Participants.some((p) => p.IsOinky))[0].Win;

    return (
        <Link className={styles.matchContainer} to={`/matches/${match?.MatchID}`}>
            <h2>{match?.Mode}</h2>
            <h3>{days > 0 ? `${days} days, ` : ''}{hours > 0 ? `${hours} hours, ` : ''} {minutes > 0 ? `${minutes} minutes ` : ''} ago</h3>
            <h5 className={oinkysWon ? styles.win : styles.lost} >{oinkysWon ? 'WIN' : 'LOSS'}</h5>
            <div className={styles.playerContainer}>
                {players.map((p) => playerComponent(p))}
            </div>
        </Link>
    )
};

export default PlayerLineup;
