import Role from "./Role";

class Goal {
  goalID: string = '';
  displayName: string | null = '';
  botGoal: string | null = '';
  jungleGoal: string | null = '';
  midGoal: string | null = '';
  suppGoal: string | null = '';
  topGoal: string | null = '';
};

export class GoalOverview {
  customGoals: Goal[] = [];
  defaultGoals: Goal[] = [];
};

export class GoalResult {
  goalID: string = '';
  displayName: string = '';
  matchID: string = '';
  participants: ParticipantGoalResult[] = [];
};

export class ParticipantGoalResult {
  goalResult: number = 0;
  isOinky: boolean = false;
  puuid: string | null = null;
  role: Role = Role.NONE;
  summonerName: string | null = null;
};

export default Goal;
