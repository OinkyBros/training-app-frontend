import Role from './Role';

class Participant {
  SummonerName: string = "";
  SummonerID: string = "";
  Icon: string | null = "";
  Champion: string = "";
  ChampionIcon: string | null = "";
  Role: Role = Role.NONE;
  IsOinky: boolean = false;
  Assists: number = 0;
  Kills: number = 0;
  Deaths: number = 0;
  VisionScore: number = 0;
  CS: number = 0;
}

export default Participant;