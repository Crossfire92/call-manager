import { CallType } from "../enum/CallType.enum";
import PinSetting from "../data/pin-setting";
import messageNumberHandler from './messageNumberHandler';
import AppLogger from "./app-logger";

const requestNumber = 0;

export default class RequestCreator {

  static generateRequest(pinSetting: PinSetting) {
    let request = "";
    const ackAcc = pinSetting.ack ? 1 : 0;
    const callValue = ackAcc + pinSetting.action;
    const messageNumber = messageNumberHandler.getInstance().getCurrentMessageNumber();
    AppLogger.getInstance().info("Using db-member");
    AppLogger.getInstance().info(JSON.stringify(pinSetting));
    switch (pinSetting.action.toString()) {
      case CallType.DIRECT_CALL:
        request = `${messageNumber}${ackAcc}${pinSetting.action.toString()}${pinSetting.terminalId}|${pinSetting.floor}|${pinSetting.personId}|`;
        break;
      case CallType.CUSTOM:
        request = `${messageNumber}${ackAcc}${pinSetting.action.toString()}${pinSetting.terminalId}|`;
        break;
      case CallType.CALL_BY_PROFILE:
        request = `${messageNumber}${ackAcc}${pinSetting.action.toString()}${pinSetting.terminalId}|${pinSetting.profile}|`;
        break;
      case CallType.CALL_BY_ID:
        request = `${messageNumber}${ackAcc}${pinSetting.action.toString()}${pinSetting.terminalId}|${pinSetting.id}|`;
        break;
    }
    return request;
  }
}