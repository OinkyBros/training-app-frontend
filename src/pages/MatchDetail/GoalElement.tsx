import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Goal, { GoalResult } from '../../types/Goal';
import { roleOrder } from '../../types/Role';
import styles from './GoalElement.module.scss';

interface GoalElementProps {
    goal: Goal,
    results: GoalResult[],
};

function GoalElement({ goal, results }: GoalElementProps) {
    const [progressBar, setProgressBar] = useState<boolean>(true);

    const postToDiscord = () => {
        const content = results
        .filter((r) => r.goalID === goal.goalID)
        .flatMap((r) => r.participants)
        .filter((pr) => pr.isOinky)
        .sort((a, b) => roleOrder[a.role] - roleOrder[b.role])
        .map((pr) => {
            if(pr.goalResult >= 0.5) {
                return '';
            }

            return pr.summonerName + ' failed goal ' + goal.displayName + '!';
        })
        .join('\n');

        if(!content) {
            return;
        }
    
        fetch('test', {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                content,
            }),
        })
    };

    return (
        <div className={styles.goalContainer} key={goal.goalID}>
            <h3>{goal.displayName}</h3>
            <table onClick={() => setProgressBar((p) => !p)}>
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
            <Button onClick={postToDiscord}>Post to Discord</Button>
        </div>
    );
};

export default GoalElement;