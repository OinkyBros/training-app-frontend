import React, { useState, useEffect } from 'react';
import GoalService from '../../services/GoalsService';
import Goal from '../../types/Goal';
import styles from './AddGoal.module.scss';

interface AddGoalProps {
    onGoalAdded?: Function,
    onCancel: Function,
    editGoalId: string | null,
};

function AddGoal({ onGoalAdded = () => {}, editGoalId, onCancel }: AddGoalProps) {
    const [editGoal, setEditGoal] = useState<Goal>(new Goal());

    useEffect(() => {
        if(!editGoalId || editGoalId.length < 1) {
            setEditGoal(new Goal());
            return;
        }

        GoalService.getGoal(editGoalId!)
            .then(setEditGoal)
            .catch(() => setEditGoal(new Goal()));
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
        GoalService.updateGoal(editGoal).then(() => onGoalAdded());
    }
  }

  return (
    <div className={styles.dialogContainer}>
        <button onClick={() => onCancel()}>X</button>
        <form
            onSubmit={e => {
                e.preventDefault();
                submitGoal(e);
            }}
        >
            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor="displayName">Displayname:</label></td>
                        <td><input type="text" id="displayName" name="displayName" value={editGoal.displayName ?? ''} onChange={(e) => setEditGoal({...editGoal, displayName: e.target.value})} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="topGoal">Top Goal:</label></td>
                        <td><input type="text" id="topGoal" name="topGoal" value={editGoal.topGoal ?? ''} onChange={(e) => setEditGoal({...editGoal, topGoal: e.target.value})}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="jungleGoal">Jungle Goal:</label></td>
                        <td><input type="text" id="jungleGoal" name="jungleGoal" value={editGoal.jungleGoal ?? ''} onChange={(e) => setEditGoal({...editGoal, jungleGoal: e.target.value})}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="midGoal">Mid Goal:</label></td>
                        <td><input type="text" id="midGoal" name="midGoal" value={editGoal.midGoal ?? ''} onChange={(e) => setEditGoal({...editGoal, midGoal: e.target.value})}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="botGoal">Bot Goal:</label></td>
                        <td><input type="text" id="botGoal" name="botGoal" value={editGoal.botGoal ?? ''} onChange={(e) => setEditGoal({...editGoal, botGoal: e.target.value})}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="suppGoal">Supp Goal:</label></td>
                        <td><input type="text" id="suppGoal" name="suppGoal" value={editGoal.suppGoal ?? ''} onChange={(e) => setEditGoal({...editGoal, suppGoal: e.target.value})}/></td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" value="Save training goal" />
        </form>
    </div>
  );
}

AddGoal.defaultProps = {
    onGoalAdded: () => {},
}

export default AddGoal;
