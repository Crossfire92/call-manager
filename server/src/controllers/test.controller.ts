import * as express from 'express';
import RequestCreator from '../lib/RequestCreator';
import PinSetting from '../data/pin-setting';
import TestCall from '../data/test-call';
import LiftCaller from '../lib/lift-caller';
import AppLogger from '../lib/app-logger';
import TestCallBean  from '../bean/TestCallBean';
import { callbackify } from 'util';
import Message from '../lib/messageNumberHandler';
import MessageNumber from '../bean/MessageNumber';
import messageNumberHandler from '../lib/messageNumberHandler';

export default class TestController {

  public path = "/test";
  public msg = "/msgNumber";
  public router = express.Router();

  constructor(socket? : SocketIO.Server) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getMessageNumber);
    this.router.post(this.path, this.submitTest);
    AppLogger.getInstance().info("Initialized routes", this.router.stack);
  }

  submitTest = (request: express.Request, response: express.Response) => {
    const callBean : TestCallBean = request.body;
    AppLogger.getInstance().info(`Calling lift-module with: ${callBean.testCall}`);
    LiftCaller.getInstance().submitCall(callBean.testCall)
      .then(() => messageNumberHandler.getInstance().increment())
      .catch((err) => AppLogger.getInstance().error("error during socket call", err));

    response.sendStatus(200);
  }

  getMessageNumber = (request: express.Request, response: express.Response) => {
    const messageNumber = Message.getInstance().getCurrentMessageNumber();
    const message : MessageNumber = {messageNumber};
    response.send(message);
  }

}