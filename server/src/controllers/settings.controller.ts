import * as express from 'express';
import SettingsBean from '../bean/SettingsBean';
import SettingsMapper from '../lib/SettingsMapper';
import Settings from '../data/settings';
import Database from '../lib/db-handler';
import LiftCaller from '../lib/lift-caller';
import AppLogger from '../lib/app-logger';

export default class SettingsController {

  public path = "/settings";
  public router = express.Router();

  constructor(socket? : SocketIO.Server) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getSettings);
    this.router.post(this.path, this.saveSettings);
    AppLogger.getInstance().info("Initialized routes", this.router.stack);
  }

  getSettings = (request: express.Request, response: express.Response) => {
    Database.getInstance().getSettings()
      .then((settings) => {
        response.send(SettingsMapper.mapToBean(settings));
      })
      .catch((err) => {
        response.status(500);
      });
  }

  saveSettings = (request: express.Request, response: express.Response) => {
    const settings: SettingsBean = request.body;
    console.log(settings);
    Database.getInstance().saveOptions(SettingsMapper.mapToDatabase(settings));
    // LiftCaller.getInstance().initCaller();
    response.send(settings);
  }
}