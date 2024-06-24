/* Simulates the Lift-Module */
import * as net from 'net';

export default class TestServer {

  static TEST_ENV = {
    PORT: 5050,
  }

  public static spawnServer(env:any): Promise<any> {
    return new Promise((resolve, reject) => {
      const server = net.createServer((socket) => {
        socket.end('goodbye\n');
      }).on('error', (err) => {
        throw err;
      });

      server.listen({host: 'localhost', port: 5050, exclusive: true}, () => {
        console.log('tcp-mock started on', server.address());
      });
      resolve(server);
    })
  }
}





exports.useInTest = function () {

  before(async function startTestServer() {
    const env = Object.assign({}, TestServer.TEST_ENV, {
      PORT: 5050
    });

    const testServer = await TestServer.spawnServer(env);
    this.testServer = testServer;
  })

  after(function stopTestServer() {
    this.testServer.close();
    return new Promise(resolve => this.testServer.on('close', () => resolve(true)));
  })
}

