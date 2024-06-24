import PinSetting from "../data/pin-setting";
import PinSettingsBean from "./PinSettingsBean";

export default interface SettingsBean {
  serverIpAddress: string;
  serverPort: number;

  /** Pin-Section **/
  pinSettings: PinSettingsBean[];
}