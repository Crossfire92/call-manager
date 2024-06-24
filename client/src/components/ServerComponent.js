import React, { Component } from "react";
import parse from "html-react-parser";
import socketIOClient from "socket.io-client";
import { Field  } from "formik"
import * as Server from "../lib/Server";

const ENDPOINT = Server.url();
export default class ServerComponent extends Component {

  constructor(props) {
    super(props);
    this.serverOnline = props.serverOnline;
    this.socketErrorHandler = props.socketConnectErrorHandler;
    this.state = {serverOnine: false}
  }

  componentWillMount() {
    const socket = socketIOClient(ENDPOINT);
    console.log("connecting socket");
    socket.on("server_update", data => {
      this.setState({serverOnline: data.server_state})
      this.socketErrorHandler(false);
      console.log(data);
    });

    socket.on("disconnect", (res) => {
      this.socketErrorHandler(true);
      console.log("server has disconnected");
    });

    socket.on("connect_error", data => {
      this.socketErrorHandler(true);
      console.log("there was an connection error")
    });

    socket.on("reconnect_error", data => {
      this.socketErrorHandler(true);
      console.log("there was an reconnection error");
    });

    socket.on("error", data => {
      this.socketErrorHandler(true);
      console.log("there was another error");
    });
  }

  render() {
    console.log(this.ipAddress);
    const connectionIcon = this.state.serverOnline ? "<img id=\"tick\" src=\"Flat_tick_icon.svg.png\" />" : "<img id=\"cross\" src=\"480px-Cross_red_circle.svg.png\" />";
    return (
      <nav>
      <div className="row">
          <h1 className="col-10">Call Manager</h1>
      </div>
      
        <div className="row">
          <p className="field">Server</p>
        </div>
        <div id="nav">
          <div className="container">
              <div className="row">
                  <div className="col-sm-3">
                      <label for="serverIpAddress">IP-Adress&nbsp;</label>
                      <Field type="ipAddress" name="serverIpAddress" label="IP-Address" />
                  </div>
                  <div class="col-sm-3">  
                      <label className="text_nav" for="serverPort">Port &nbsp;</label>
                      <Field type="port" name="serverPort" />
                  </div> 
                  <div class="col-sm-3">   
                      <label className="text_nav" for="connection">Connection</label>
                      {parse(connectionIcon)}
                  </div>
                  <div  class="col-sm-3 buttonpos">
                    <button id="save" class="Button text_nav " type="submit" disabled={!(this.props.FormikProps.isValid && this.props.FormikProps.dirty)}> Save  </button>
                  </div>
              </div>
          </div> 
        </div>
      </nav>
    );
  }
}
