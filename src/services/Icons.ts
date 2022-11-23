class IconService {

  public static getProfileIconURL(iconId: string): string {
    return `https://api.oinky.vhoeher.de/api/v1/icon/profile/${iconId}`;
  }

  public static getChampionIconUrl(championName: string): string {
    return `https://api.oinky.vhoeher.de/api/v1/icon/champion/${championName}`;
  }
};

export default IconService;
