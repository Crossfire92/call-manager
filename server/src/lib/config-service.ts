import fs from 'fs';
import os from 'os';
import nconf from 'nconf';
import Configuration from '../data/configuration';
import AppLogger from './app-logger';

export default class ConfigHelper {

  private static instance : ConfigHelper;
  private config : Configuration;

  private constructor() {
    this.initConfig();
  }

  private initConfig() {
    let configfile : string;
    if (os.platform() == 'linux') {
      configfile = "/etc/callmanager/config.json";
    } else if (os.platform() == 'darwin') {
      configfile = "/Library/callmanager/config.json";
    } else {
      configfile = "C:/callmanager/config.json";
    }

    AppLogger.getInstance().info(`using configfile ${configfile}`);

    nconf.argv()
      .env()
      .file({file: configfile})
      .required(["dbName", "serverPort", "gpios"]);

    this.config = {
      databaseName: nconf.get('dbName'),
      serverPort: nconf.get('serverPort'),
      gpios: nconf.get('gpios')
    }

    AppLogger.getInstance().info('successfully read config-properties');
    AppLogger.getInstance().info('database-name: ', this.config.databaseName);
    AppLogger.getInstance().info('Server Port: ', this.config.serverPort);
  }

  public getConfiguration() : Configuration {
    return this.config;
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ConfigHelper();
    }
    return this.instance;
  }
}