import * as express from 'express';

export default class DefaultController {

  router = express.Router();

  constructor() {
    this.initRoute();
  }

  initRoute() {
    this.router.get("/", (req, res) => {
      res.send({ response: "I am alive" }).status(200);
    });

    this.router.get("/socket.io/", function(req, res, next) {
      next();
    });
  }
}