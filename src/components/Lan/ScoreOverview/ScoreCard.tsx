import React from 'react';
import styles from './ScoreCard.module.scss';

interface ScoreCardProps {
    title: string;
    p1: string;
    p2: string;
    p3: string;
}

function ScoreCard({ title, p1, p2, p3 }: ScoreCardProps) {
    return (
        <div className={styles.card}>
            <h3>{p1}</h3>
            <h4>{p2}</h4>
            <h5>{p3}</h5>
            <h1>{title}</h1>
        </div>
    )    
}

export default ScoreCard;