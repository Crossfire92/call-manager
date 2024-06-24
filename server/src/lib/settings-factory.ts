import Settings from "../data/settings";
import PinSetting from "../data/pin-setting";
import { settings } from "cluster";
import { CallType } from "../enum/CallType.enum";

export default class SettingsFactory {

  public static buildEmptySettings() : Settings {
    const result = new Settings();
    for (let i = 1; i <= 12; i++) {
      const pinSetting: PinSetting = {pinNumber: i, description: '-unused-', enabled: false, action: CallType.TYPE_DEFAULT, posNeg: "positive", ack: false, id: '0', profile: '0', floor: '0', personId: '0', custom: '0', terminalId: '0'};
      result.pinSettings.push(pinSetting);
    }

    return result;
  }
}