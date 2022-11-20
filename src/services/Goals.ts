import { GoalOverview, GoalResult } from "../types/Goal";

class GoalService {
  public static async getGoals(): Promise<GoalOverview> {
    const url: string = `${import.meta.env.VITE_API_URL}/v${import.meta.env.VITE_API_VERSION}/goals`;
  
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
    const url: string = `${import.meta.env.VITE_API_URL}/v${import.meta.env.VITE_API_VERSION}/goals/${goalId}/${matchId}`;
  
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    }).then((response) => response.json())
      .then((data: GoalResult) => {
        return data;
      });

    return response ?? new GoalResult();
  }
};

export default GoalService;
