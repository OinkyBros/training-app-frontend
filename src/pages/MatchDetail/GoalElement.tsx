import React, { useState } from 'react';
import Goal, { GoalResult } from '../../types/Goal';
import { roleOrder } from '../../types/Role';
import styles from './GoalElement.module.scss';

interface GoalElementProps {
    goal: Goal,
    results: GoalResult[],
};

function GoalElement({ goal, results }: GoalElementProps) {
    const [progressBar, setProgressBar] = useState<boolean>(true);

    return (
        <div className={styles.goalContainer} key={goal.goalID} onClick={() => setProgressBar((p) => !p)}>
            <h3>{goal.displayName}</h3>
            <table>
                <tbody>
                {
                    results
                    .filter((r) => r.goalID === goal.goalID)
                    .flatMap((r) => r.participants)
                    .filter((pr) => pr.isOinky)
                    .sort((a, b) => roleOrder[a.role] - roleOrder[b.role])
                    .map((pr) => (
                        <tr key={goal.goalID + pr.summonerName}>
                            <td>
                                {pr.summonerName}
                            </td>
                            <td className={styles.goalResult}>
                                {
                                    progressBar ? 
                                    <progress id={goal.goalID} className={pr.goalResult >= 0.85 ? styles.success : pr.goalResult >= 0.5 ? styles.ok : ''} value={pr.goalResult}></progress>
                                    : <span style={{ paddingLeft: '1rem' }}>{Math.floor(pr.goalResult * 100)}%</span>
                                }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default GoalElement;