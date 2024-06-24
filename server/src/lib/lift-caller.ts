import * as net from 'net';
import Database from './db-handler';
import Message from './messageNumberHandler';

export default class LiftCaller {

  private static instance: LiftCaller;
  private host : string;
  private port : number;
  private socket: net.Socket;

  private constructor() {
    this.initCaller();
  }

  public static getInstance() {
    if (!LiftCaller.instance) {
      LiftCaller.instance = new LiftCaller();
    }
    return LiftCaller.instance;
  }

  public initCaller() {
    Database.getInstance().getSettings()
      .then(settings => {
        this.host = settings.serverIpAddress;
        this.port = settings.serverPort
      }).catch(err => console.error(err));

      // open connection
      if (this.socket == null) {
        this.socket = new net.Socket();
        this.socket.setTimeout(3000);
      } else {
        if (this.socket.writable) {
          this.socket.destroy();
        }
      }
      if (this.host && this.host != '0.0.0.0' && this.port && this.port!= 0) {
        this.socket.on('error', err => console.log(err));
        this.socket.connect({host: this.host, port: this.port}, () => {});
      }
  }

  public async submitCall(message:string): Promise<any> {
    console.log("calling with message", message);
    return new Promise((resolve, reject) => {
      /* Old Message Number 006141|54| */
      this.socket.on('error', err => {console.log("Error: Socket not reachable"); this.socket.destroy(); reject(false); });
      if (this.socket.writable) {
        console.log("using open port");
        this.socket.write(message);
        Message.getInstance().increment();
        resolve(true);
      } else {
        console.log("reopening port");
        if (this.host && this.host != '0.0.0.0' && this.port && this.port != 0) {
          this.socket.connect({host: this.host, port: this.port}, () => {this.socket.write(message); Message.getInstance().increment();});
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });

  }

  public async testConnection(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.socket.writable) {
        if (this.host && this.host != '0.0.0.0' && this.port && this.port != 0) {
          this.socket.setTimeout(3000);
          this.socket.on('error', (err) => resolve(false));
          this.socket.connect({host: this.host, port: this.port}, () => {resolve(this.socket.writable)})
        }
      } else {
        resolve(true);
      }
    });
  }
}