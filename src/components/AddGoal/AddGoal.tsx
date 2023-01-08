import React, { useState, useEffect } from 'react';
import GoalService from '../../services/Goals';
import Goal from '../../types/Goal';
import styles from './AddGoal.module.scss';

interface AddGoalProps {
    onGoalAdded?: Function,
    editGoalId: string | null,
};

function AddGoal({ onGoalAdded = () => {}, editGoalId }: AddGoalProps) {
    const [editGoal, setEditGoal] = useState<Goal | null>(null);

    useEffect(() => {
        if(!editGoalId || editGoalId.length < 1) {
            setEditGoal(null);
            return;
        }

        GoalService.getGoal(editGoalId!)
            .then(setEditGoal)
            .catch(() => setEditGoal(null));
    }, [editGoalId]);

    function submitGoal(e: any) {
    const displayName= e.target.displayName.value;
    const topGoal= e.target.topGoal.value;
    const jungleGoal= e.target.jungleGoal.value;
    const midGoal= e.target.midGoal.value;
    const botGoal= e.target.botGoal.value;
    const suppGoal= e.target.suppGoal.value;
    
    if(!editGoalId) {
        GoalService.addGoal(displayName, topGoal, jungleGoal, midGoal, botGoal, suppGoal).then(() => onGoalAdded());
    } else if (editGoal) {
        GoalService.updateGoal(editGoal);
    }
  }

  return (
    <form
        onSubmit={e => {
            e.preventDefault();
            submitGoal(e);
        }}
    >
        <table>
            <tr>
                <td><label htmlFor="displayName">Displayname:</label></td>
                <td><input type="text" id="displayName" name="displayName" value={editGoal?.displayName ?? ''} /></td>
            </tr>
            <tr>
                <td><label htmlFor="topGoal">Top Goal:</label></td>
                <td><input type="text" id="topGoal" name="topGoal" value={editGoal?.topGoal ?? ''} /></td>
            </tr>
            <tr>
                <td><label htmlFor="jungleGoal">Jungle Goal:</label></td>
                <td><input type="text" id="jungleGoal" name="jungleGoal" value={editGoal?.jungleGoal ?? ''} /></td>
            </tr>
            <tr>
                <td><label htmlFor="midGoal">Mid Goal:</label></td>
                <td><input type="text" id="midGoal" name="midGoal" value={editGoal?.midGoal ?? ''} /></td>
            </tr>
            <tr>
                <td><label htmlFor="botGoal">Bot Goal:</label></td>
                <td><input type="text" id="botGoal" name="botGoal" value={editGoal?.botGoal ?? ''} /></td>
            </tr>
            <tr>
                <td><label htmlFor="suppGoal">Supp Goal:</label></td>
                <td><input type="text" id="suppGoal" name="suppGoal" value={editGoal?.suppGoal ?? ''} /></td>
            </tr>
        </table>
        <input type="submit" value="Save training goal" />
    </form>
  );
}

AddGoal.defaultProps = {
    onGoalAdded: () => {},
}

export default AddGoal;
