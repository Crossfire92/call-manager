import App from './app';
import DefaultController from './controllers/default.controller';
import SettingsController from './controllers/settings.controller';
import TestController from './controllers/test.controller';
import ConfigHelper from './lib/config-service';

const app = new App([new DefaultController(), new SettingsController(), new TestController()], ConfigHelper.getInstance().getConfiguration().serverPort);
app.listen();