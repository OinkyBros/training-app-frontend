class IconService {

  public static async getProfileIconURL(iconId: string): Promise<string> {
    return `https://api.oinky.vhoeher.de/api/v1/icon/profile/${iconId}`;
  }

  public static async getChampionIconUrl(championName: string): Promise<string> {
    return `https://api.oinky.vhoeher.de/api/v1/icon/champion/${championName}`;
  }
};

export default IconService;
