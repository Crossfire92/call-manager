import PouchDB from 'pouchdb';
import Settings from '../data/settings';
import AppLogger from './app-logger';
import ConfigHelper from './config-service';
import LiftCaller from './lift-caller';
import SettingsFactory from './settings-factory';

export default class Database {

  private static instance: Database;

  logger: any;
  db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB(ConfigHelper.getInstance().getConfiguration().databaseName);
    this.db.changes({since: 'now', live: true}).on('change', () => LiftCaller.getInstance().initCaller());
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async saveOptions(settings:Settings) {
    AppLogger.getInstance().info("saving new db-record", settings);
    AppLogger.getInstance().info("Find current state");

    const current = await this.db.get('settings').catch((err) => console.log(err));
    if (current) {
      await this.db.remove(current).catch(err => console.log(err));
    }

    return this.db.put(settings);
  }

  public async getSettings(): Promise<Settings> {
    return new Promise<Settings>((resolve, reject) => {
      AppLogger.getInstance().info('query settings-record');
      this.db.get<Settings>('settings')
        .then((result) => {
          AppLogger.getInstance().info('got settings record', result);
          resolve(result);
        })
        .catch((err) => {
          AppLogger.getInstance().error('error quering db', err);
          if (err.status == 404) {
            AppLogger.getInstance().info('return default settings object');
            const defaultSettings = SettingsFactory.buildEmptySettings();
            this.saveOptions(defaultSettings);
            resolve(defaultSettings);
          } else {
            AppLogger.getInstance().error("Reject db error");
            reject(err);
          }
        });
    });
  }
}