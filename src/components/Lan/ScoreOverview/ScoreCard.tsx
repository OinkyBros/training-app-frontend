import React from 'react';
import styles from './ScoreCard.module.scss';

interface ScoreCardProps {
    title: string;
    p1: string;
    p1Value: number;
    p2: string;
    p2Value: number;
    p3: string;
    p3Value: number;
}

function ScoreCard({ title, p1, p2, p3, p1Value, p2Value, p3Value }: ScoreCardProps) {
    return (
        <div className={styles.card}>
            <h3>{p1}: {p1Value.toFixed(2).replace('.00', '')}</h3>
            <h4>{p2}: {p2Value.toFixed(2).replace('.00', '')}</h4>
            <h5>{p3}: {p3Value.toFixed(2).replace('.00', '')}</h5>
            <h1>{title}</h1>
        </div>
    )    
}

export default ScoreCard;