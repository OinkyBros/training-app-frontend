import Goal, { GoalOverview, GoalResult } from "../types/Goal";

class GoalService {
    public static async getGoal(goalId: string): Promise<Goal> {
        const url: string = `https://api.oinky.vhoeher.de/api/v1/goals/${goalId}`;
      
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
        }).then((response) => response.json())
          .then((data: Goal) => data);
      
        return response ?? new Goal();
    }

  public static async getGoals(): Promise<GoalOverview> {
    const url: string = "https://api.oinky.vhoeher.de/api/v1/goals";
  
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    }).then((response) => response.json())
      .then((data: GoalOverview) => {
        return data;
      });
  
    return response ?? new GoalOverview();
  }

  public static async getGoalResult(goalId: string, matchId: string): Promise<GoalResult> {
    const url: string = `https://api.oinky.vhoeher.de/api/v1/goals/${goalId}/${matchId}`;
  
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    });
    
    if(response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error(`Could not find goal result for goalId ${goalId} and matchId ${matchId}.`);
    }
  }

  public static async addGoal(displayName: string, topGoal: string, jungleGoal: string, midGoal: string, botGoal: string, suppGoal: string): Promise<void> {
    const url: string = 'https://api.oinky.vhoeher.de/api/v1/goals';

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify({
        DisplayName: displayName,
        TopGoal: topGoal,
        JungleGoal: jungleGoal,
        MidGoal: midGoal,
        BotGoal: botGoal,
        SuppGoal: suppGoal,
      }),
    }).catch((error) => {
      throw new Error(error);
    });

    if (response.ok) {
      return Promise.resolve();
    } else {
      throw new Error(`error submitting goal, status <${response.status}> text <${response.statusText}>`);
    }
  }

  public static async updateGoal(goal: Goal) {
    const url: string = `https://api.oinky.vhoeher.de/api/v1/goals/${goal.goalID}`;

    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify(goal),
    }).catch((error) => {
      throw new Error(error);
    });

    if (response.ok) {
      return Promise.resolve();
    } else {
      throw new Error(`error submitting goal, status <${response.status}> text <${response.statusText}>`);
    }
  }

  public static async deleteGoal(goalId: string) {
    const url: string = `https://api.oinky.vhoeher.de/api/v1/goals/${goalId}`;

    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors'
    });

    if(response.ok) {
        return Promise.resolve();
    } else {
        throw new Error(`failed to delete goal, status <${response.status}> text <${response.statusText}>`)
    }
  }
};

export default GoalService;
