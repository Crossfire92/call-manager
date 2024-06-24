export default interface GPIOAction {
  fireAction(pin: number, value: boolean): void;
}