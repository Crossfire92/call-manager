import PinSetting from "./pin-setting";

export default class Settings {
  _id = "settings";

  /**
   * Server-Section
  **/
  public serverIpAddress = "0.0.0.0";
  public serverPort = 0;

  /** Pin-Section **/
  public pinSettings:PinSetting[] = [];
}