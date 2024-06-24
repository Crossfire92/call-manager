import React, { Component, useEffect, useState } from "react";
import KeyboardComponent from "./KeyboardComponent"
import PinComponent from "./PinComponent"
import SignalComponent from "./SignalComponent"

export default class DigitalSignalsComponent extends Component {

    constructor(props) {
        super(props);
        this.pinEventListener = this.pinEventListener.bind(this);
        this.state = {currentPin: 0}
    }

    pinEventListener(number) {
        if (this.props.FormikProps.dirty) {
            var answer = window.confirm("Es gibt noch ungespeicherte Daten. Wollen Sie diese speichern?");
            if (answer) {
                // save form
                this.props.FormikProps.submitForm();
            } else {
                // reset form
                this.props.FormikProps.resetForm();
            }
        }
        this.setState({currentPin: number});
    }

    render() {
        return (
            <div>
                <div class="row">
                    <p class="field"> Digital Signals </p>      
                </div>
                <div className="col row align-items-start main">
                    <PinComponent CurrentPin={this.state.currentPin} CallExample={this.props.CallExample} InitialValues={this.props.pinSettings} FormikProps={this.props.FormikProps} />
                    <SignalComponent eventListener={this.pinEventListener} pinSettings={this.props.pinSettings} />
                    <KeyboardComponent />
                </div>
            </div>
        );
    }
}
