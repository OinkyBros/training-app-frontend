import Role from './Role';

class Participant {
  SummonerName: string = "";
  SummonerID: string = "";
  Icon: string | null = "";
  Champion: string = "";
  ChampionIcon: string | null = "";
  Role: Role = Role.NONE;
  IsOinky: boolean = false;

}

export default Participant;