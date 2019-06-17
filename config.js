const PLAYER_API_HOMOLOG = "https://api-player.buildstaging.com";
const PLAYER_API_PROD = "https://player.hotmart.com";

class Settings {
  get apiHomolog() {
    return {
      'playerPlatform': `${PLAYER_API_HOMOLOG}/platform-api/rest/v1`      
    };
  }

  get apiProd() {
    return {
      'playerPlatform': `${PLAYER_API_PROD}/platform-api/rest/v1`      
    };
  }
}

export default new Settings();