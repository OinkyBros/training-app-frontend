class IconService {

  public static async getProfileIconURL(iconId: string): Promise<string> {
    return `https://api.oinky.vhoeher.de/api/v1/icon/profile/${iconId}`;
  }

  public static async getChampionIcon(championName: string): Promise<Blob | null> {
    const url: string = `https://api.oinky.vhoeher.de/api/v1/icon/champion/${championName}`;
  
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    }).then((response) => response.blob());

    return response ?? null;
  }

  public static async getPlayerIcon(iconId: number): Promise<Blob | null> {
    const url: string = `https://api.oinky.vhoeher.de/api/v1/icon/profile/${iconId}`;
  
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    }).then((response) => response.blob());

    return response ?? null;
  }
};

export default IconService;
