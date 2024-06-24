import React, { Component, useRef, useState } from "react";
import ServerComponent from "./components/ServerComponent"
import DigitalSignalsComponent from "./components/DigitalSignalsComponent"
import FooterComponent from "./components/FooterComponent";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorComponent from "./components/ErrorComponent";
import { Formik, Field, Form, useFormik } from "formik";
import SettingsSchema from "./lib/SettingsSchema";
import * as Server from "./lib/Server";

class App extends Component {
  
  constructor() {
    super();
    this.state = {settings: []};
    this.handleConnectError = this.handleConnectError.bind(this);
    this.state = {offline: false, settings: {}}
  }

  componentDidMount() {
    this.loadData();
  }

  handleConnectError(value) {
    console.log("offline");
    console.log(value);
    this.setState({offline: value});
  }

  loadData() {
    fetch(Server.url() + '/settings')
      .then(res => res.json())
      .then(json => {
        console.log(json); 
        this.updateData(json);
      })
      .catch(err => {
        console.error(err);
        this.setState({offline: true})
      });
  }

  updateData(json) {
    const pinSettings = [];
    json.pinSettings.forEach(setting => pinSettings.push(setting));
    console.log(pinSettings);
    const settings = {serverIpAddress: json.serverIpAddress, serverPort: json.serverPort, pinSettings: pinSettings}
    this.setState({settings: settings})
  }

  submitData(data) {
    
    fetch(Server.url() + '/settings', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    }).then(result => result.json()).then(json => this.updateData(json)
    );
  }

  render() {
    return (
      <>
        <Formik 
          enableReinitialize="true" 
          validationSchema={SettingsSchema}
          initialValues={{serverIpAddress: this.state.settings.serverIpAddress, serverPort: this.state.settings.serverPort, pinSettings: this.state.settings.pinSettings}} 
          onSubmit={
            values => {
              console.log(values);
              this.submitData(values);
            }}>
              {props => (
                <Form>
                  <ErrorComponent offline={this.state.offline} />
                  <ServerComponent socketConnectErrorHandler={this.handleConnectError} FormikProps={props} />
                  <DigitalSignalsComponent pinSettings={this.state.settings.pinSettings} CallExample={this.state.callExample} FormikProps={props} />
                  <FooterComponent/>   
                </Form>
              )}
                
        </Formik>
      </>
    );
  }
}
 
export default App;