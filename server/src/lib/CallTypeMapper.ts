import { CallType } from "../enum/CallType.enum";

export default class CallTypeMapper {

  static getNumber(callType : CallType) {
    switch (callType) {
      case CallType.CALL_BY_ID: return "0";
      case CallType.CALL_BY_ID: return "41";
      case CallType.CALL_BY_PROFILE: return "21";
      case CallType.DIRECT_CALL: return "61";
      case CallType.CUSTOM: return "123";
    }
  }

  static getCallType(callType: any) {
    switch (callType) {
      case "0": return CallType.TYPE_DEFAULT;
      case "4": return CallType.CALL_BY_ID;
      case "2": return CallType.CALL_BY_PROFILE;
      case "6": return CallType.DIRECT_CALL;
      case "123": return CallType.CUSTOM;
    }
  }
}