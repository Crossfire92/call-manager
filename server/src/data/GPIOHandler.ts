import GPIOAction from "./GPIOAction";

export default interface GPIOHandler {
  gpioPort: number;
  onConnect: GPIOAction;
}