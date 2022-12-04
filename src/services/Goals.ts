import { GoalOverview, GoalResult } from "../types/Goal";

class GoalService {
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
      throw new Error();
    }
  }
};

export default GoalService;
