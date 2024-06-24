import GPIOPort from "./GPIOPort";

export default interface Configuration {

  databaseName: string;
  serverPort: number;
  gpios: GPIOPort[];
}