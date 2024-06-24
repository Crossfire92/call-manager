import express from 'express';
import path from 'path';
import expressWinston from 'express-winston';
import winston from 'winston';
import bodyParser from 'body-parser';
import AppLogger from './lib/app-logger';
import GPIOWatcher from './lib/gpio-watcher';
import http from 'http';
const socketIoInit = require('socket.io');
import GPIOController from './controllers/gpio.controller';
import GPIOHandler from './data/GPIOHandler';
import ConfigHelper from './lib/config-service';
const cors = require('cors');
export default class App {

  app : express.Application;
  port: number;
  watcher: GPIOWatcher;
  http: any;
  io: SocketIO.Server;
  gpioController: GPIOController;

  constructor(controllers: any, port: any) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeWatchers();
  }

  private initializeMiddlewares() {
    const logger = expressWinston.logger({
      transports: [
        new winston.transports.Console()
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
      meta: true,
      msg: "HTTP {{req.method}} {{req.url}}",
      expressFormat: true,
      colorize: true,
      ignoreRoute: () => {return false}
    });

    this.app.use(logger);
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.http = new http.Server(this.app);
    this.io = socketIoInit(this.http, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
          allowedHeaders: ["Access-Control-Allow-Origin"],
          credentials: false
        },
        origins: '*:*'
    });

    this.io.on('connection', (socket:any) => {
      console.log('a client connected');
    });
  }

  private initializeControllers(controllers: any) {
    this.gpioController = new GPIOController(this.io);
    controllers.push(this.gpioController);
    controllers.forEach((controller: any) => this.app.use('/', controller.router));
  }

  private initializeWatchers() {
    const gpioHandlers : GPIOHandler[] = [];
    Object.values(ConfigHelper.getInstance().getConfiguration().gpios).forEach(m => gpioHandlers.push({gpioPort: m.gpioPort, onConnect: {fireAction: (pin, value) => this.gpioController.broadcastGPIO(pin, value)}}));
    this.watcher = new GPIOWatcher(gpioHandlers);
  }

  public listen() {
    this.http.listen(this.port, () => AppLogger.getInstance().info(`Server running on ${this.port}`));
  }
}