import http from 'http';
import cron from 'cron';
import AppLogger from '../lib/app-logger';
import * as express from 'express';
import LiftCaller from '../lib/lift-caller';
import Database from '../lib/db-handler';
import RequestCreator from '../lib/RequestCreator';
import SettingsMapper from '../lib/SettingsMapper';

export default class GPIOController {

  private socket : SocketIO.Server;
  public path = "/gpio";
  public router = express.Router();

  constructor(socket?  : SocketIO.Server) {
    this.socket = socket;
    this.initCron();
  }

  private initCron() {
    const job = new cron.CronJob('*/10 * * * * *', () => {
      AppLogger.getInstance().info('fire server-state');
      LiftCaller.getInstance().testConnection()
        .then(res => this.broadcastServerState(res))
        .catch(res => this.broadcastServerState(res));
    });
    job.start();
  }

  broadcastGPIO(pin: number, value: boolean):void {
    this.socket.emit('gpio_update', {pin, value});
  }

  broadcastServerState(online : boolean):void {
    const serverstate = {server_state : online};
    AppLogger.getInstance().info('emit socket state for server', serverstate)
    this.socket.emit('server_update', serverstate);
  }


}