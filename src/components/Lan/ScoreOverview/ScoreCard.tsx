import React from 'react';
import IconService from '../../../services/Icons';
import Participant from '../../../types/Participant';
import styles from './ScoreCard.module.scss';

interface ScoreCardProps {
    title: string;
    p1?: Participant;
    p1Value: number;
    p2?: Participant;
    p2Value: number;
    p3?: Participant;
    p3Value: number;
}

function ScoreCard({ title, p1, p2, p3, p1Value, p2Value, p3Value }: ScoreCardProps) {
  function icon(p?: Participant) {
    return p?.Icon
      ? <img src={IconService.getProfileIconURL(p.Icon)}/>
      : null;
  }
  
  return (
    <div className={styles.card}>
      <h3>{icon(p1)}{p1?.SummonerName}: {p1Value.toFixed(2).replace('.00', '')}</h3>
      <h4>{icon(p2)}{p2?.SummonerName}: {p2Value.toFixed(2).replace('.00', '')}</h4>
      <h5>{icon(p3)}{p3?.SummonerName}: {p3Value.toFixed(2).replace('.00', '')}</h5>
      <h1>{title}</h1>
    </div>
  )    
}

export default ScoreCard;