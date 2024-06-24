import PinSetting from "../data/pin-setting";
import SettingsBean from "../bean/SettingsBean";
import Settings from "../data/settings";
import CallTypeMapper from "../lib/CallTypeMapper";
import ConfigHelper from "./config-service";

export default class SettingsMapper {

  static mapToDatabase(bean : SettingsBean) : Settings {
    const result = new Settings();
    result.serverIpAddress = bean.serverIpAddress;
    result.serverPort = bean.serverPort;

    bean.pinSettings.forEach((setting) => {
      result.pinSettings.push({
        pinNumber: setting.pinNumber,
        description: setting.description,
        enabled: setting.enabled,
        posNeg: setting.posNeg,
        terminalId: setting.terminalId,
        ack: setting.ack,
        action: setting.action,
        id: setting.id,
        floor: setting.floor,
        personId: setting.personId,
        profile: setting.profile,
        custom: setting.custom
      });
    })
    return result;
  }

  static mapToBean(settings : Settings) : SettingsBean {
    return {
      serverIpAddress: settings.serverIpAddress,
      serverPort: settings.serverPort,
      pinSettings: settings.pinSettings.map((setting) => {
        return {
          pinNumber: setting.pinNumber,
          description: setting.description,
          enabled: setting.enabled,
          posNeg: setting.posNeg,
          terminalId: setting.terminalId,
          ack: setting.ack,
          action: CallTypeMapper.getCallType(setting.action),
          id: setting.id,
          floor: setting.floor,
          personId: setting.personId,
          profile: setting.profile,
          custom: setting.custom
        }
      })
    }
  }

  static getVirtualPinNumber(gpioPort: number) {
    return Object.values(ConfigHelper.getInstance().getConfiguration().gpios).find(gpio => gpio.gpioPort == gpioPort).pinNumber
  }
}