import Gpio from 'onoff';
import AppLogger from '../lib/app-logger';
import os from 'os';
import GPIOHandler from '../data/GPIOHandler';
import Database from './db-handler';
import LiftCaller from './lift-caller';
import SettingsMapper from '../lib/SettingsMapper';
import RequestCreator from './RequestCreator';

export default class GPIOWatcher {

  constructor(gpios : GPIOHandler[]) {
    gpios.forEach((gpio) => this.initWatcher(gpio));
  }

  private initWatcher(gpio: GPIOHandler) {
    if (os.platform() == 'linux') {
      const input = new Gpio.Gpio(gpio.gpioPort, 'in', 'both', {debounceTimeout: 10});
      input.watch((err:any, value:any) => {
        if (!err) {
          this.triggerEvent(gpio, value);
        }
      });
      AppLogger.getInstance().info(`initialized on/off watcher for gpio=${gpio.gpioPort}`);
    } else {
      AppLogger.getInstance().info(`initialized development watcher for gpio=${gpio.gpioPort}`);
    }
  }

  private triggerEvent(gpio: GPIOHandler, value: any) {
    AppLogger.getInstance().info(`got gpio action on pin ${gpio.gpioPort}, value=${value}`);
    const virtualPin = SettingsMapper.getVirtualPinNumber(gpio.gpioPort);
    const closed = value == 0 ? false : true;
    if (closed) {
      Database.getInstance().getSettings()
        .then(result => {
          result.pinSettings.forEach(pin => {
            if (pin.enabled && pin.pinNumber == virtualPin) {
              const message = RequestCreator.generateRequest(pin);
              AppLogger.getInstance().info(`Calling Lift Module with message: ${message}`);
              LiftCaller.getInstance().submitCall(message);
            }
          });
        });
    }
    gpio.onConnect.fireAction(virtualPin, closed);
  }
}