import { CallType } from "../enum/CallType.enum";

export default interface PinSettingsBean {
  pinNumber: number;
  description: string;
  enabled: boolean;
  posNeg: string;
  terminalId: string;
  ack: boolean;
  action: CallType;
  id: string;
  floor: string;
  personId: string;
  profile: string;
  custom: string;
}