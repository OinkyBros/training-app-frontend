import React from 'react';
import GoalService from '../../services/Goals';

function AddGoal() {
  function submitGoal(e: any) {
    const displayName= e.target.displayName.value;
    const topGoal= e.target.topGoal.value;
    const jungleGoal= e.target.jungleGoal.value;
    const midGoal= e.target.midGoal.value;
    const botGoal= e.target.botGoal.value;
    const suppGoal= e.target.suppGoal.value;

    GoalService.addGoal(displayName, topGoal, jungleGoal, midGoal, botGoal, suppGoal);
  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      submitGoal(e);
    }}>
      <label htmlFor="displayName">Displayname:</label>
      <input type="text" id="displayName" name="displayName" />
      <br/>
      <label htmlFor="topGoal">Top Goal:</label>
      <input type="text" id="topGoal" name="topGoal" />
      <br/>
      <label htmlFor="jungleGoal">Jungle Goal:</label>
      <input type="text" id="jungleGoal" name="jungleGoal" />
      <br/>
      <label htmlFor="midGoal">Mid Goal:</label>
      <input type="text" id="midGoal" name="midGoal" />
      <br/>
      <label htmlFor="botGoal">Bot Goal:</label>
      <input type="text" id="botGoal" name="botGoal" />
      <br/>
      <label htmlFor="suppGoal">Supp Goal:</label>
      <input type="text" id="suppGoal" name="suppGoal" />
      <br/>
      <input type="submit" value="Save training goal" />
    </form>
  );
}

export default AddGoal;
