import React, { useState, useEffect, useRef } from 'react';
import AddGoal from '../../components/AddGoal/AddGoal';
import GoalService from '../../services/Goals';
import Goal, { GoalOverview } from '../../types/Goal';
import styles from './Goals.module.scss';

function Goals() {
    const [defaultGoals, setDefaultGoals] = useState<Goal[] | null>(null);
    const [customGoals, setCustomGoals] = useState<Goal[] | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const dialogRef: React.LegacyRef<HTMLDialogElement> = useRef(null);

    useEffect(() => {
        GoalService.getGoals()
            .then((go: GoalOverview) => {
                setDefaultGoals(go.defaultGoals);
                setCustomGoals(go.customGoals);
            })
    }, []);

    useEffect(() => {
        if(dialogOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [dialogOpen]);

    if(!defaultGoals || !customGoals) {
        return (
            <span>Loading...</span>
        );
    }

    if(defaultGoals && defaultGoals.length < 1 && customGoals && customGoals.length < 1) {
        return (
            <span>No goals found</span>
        );
    }

    const dialogClosed = () => {
        setDialogOpen(false);
    }

    const goalComponent = (goal: Goal) => {
        return (
            <tr>
                <td>
                    <span>{goal.displayName}</span>
                </td>
                <td>
                    <button>🔨</button>
                </td>
                <td>
                    <button onClick={() => GoalService.deleteGoal(goal.goalID)}>🚫</button>
                </td>
            </tr>
        );
    };

    return (
        <div className={styles.container}>
            <h1>Default goals</h1>
            <table>
                {defaultGoals.map(goalComponent)}
            </table>
            <h1>Custom goals</h1>
            <table>
                {customGoals.map(goalComponent)}
            </table>
            <button onClick={() => setDialogOpen(true)}>Add Goal</button>
            <dialog onClose={dialogClosed} onAbort={dialogClosed} ref={dialogRef}>
                <AddGoal />
            </dialog>
        </div>
    );
}

export default Goals;