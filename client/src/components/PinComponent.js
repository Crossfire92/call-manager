import React, { Component } from "react";
import CallByIDComponent from "./CallByIDComponent";
import CallByProfileComponent from "./CallByProfileComponent";
import CustomComponent from "./CustomComponenet";
import DirectCallComponent from "./DirectCallComponenet";
import { Field, Checkbox  } from "formik"
import PinFields from "../lib/PinFields";
import ActionValues from "../lib/ActionValues";
import * as Server from '../lib/Server';
import { string } from "yup";


export default class PinComponent extends Component {

    constructor(props) {
        super(props);
        this.first = true;
        this.state = {mode: "", valueMap: new Map(), callString: "", messageNumber: "000"};
        this.changeMode = this.changeMode.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.submitCall = this.submitCall.bind(this);
    }

    changeMode(value) {
        console.log("value: " + value);
        this.setState({mode: value, callString: ""});
    }

    changeValue(source, value) {
        const map = this.state.valueMap;
        map.set(source, value);
        const callString = this.createCallString(map);
        this.setState({valueMap: map, callString: callString});
    }

    createInitialMap(pinSettings) {
        if (this.props.CurrentPin) {
            const setting = pinSettings[this.props.CurrentPin];
            console.log("settings", setting);
            const result = new Map();
            if (setting) {
                result.set(PinFields.PIN_NUMBER, this.props.CurrentPin + 1)
                result.set(PinFields.ACK, setting.ack);
                result.set(PinFields.ACTION, setting.action);
                result.set(PinFields.CUSTOM, setting.custom);
                result.set(PinFields.FLOOR, setting.floor);
                result.set(PinFields.ID, setting.id);
                result.set(PinFields.PERSON_ID, setting.personId);
                result.set(PinFields.PROFILE, setting.profile);
                result.set(PinFields.TERMINAL_ID, setting.terminalId);
            }
            return result;
        } else {
            return new Map();
        }
    }

    componentDidMount() {
        fetch(Server.url() + '/test')
            .then(res => res.json())
            .then(json => this.setState({messageNumber: json.messageNumber}));
    }

    createCallString() {
        const action = this.props.FormikProps.getFieldProps(`pinSettings[${this.props.CurrentPin}].action`).value;

        const terminalId = this.props.FormikProps.getFieldProps(`pinSettings[${this.props.CurrentPin}].terminalId`).value;
        const ack = this.props.FormikProps.getFieldProps(`pinSettings[${this.props.CurrentPin}].ack`).value ? 10 : 0;
        let messageNumber;
        if (this.state.messageNumber) {
            messageNumber = this.state.messageNumber;
        } else {
            messageNumber = "000";
        }
        console.log("Current message number " + messageNumber);
        const personId = this.props.FormikProps.getFieldProps(`pinSettings[${this.props.CurrentPin}].personId`).value; 
        const id = this.props.FormikProps.getFieldProps(`pinSettings[${this.props.CurrentPin}].id`).value;
        const profile = this.props.FormikProps.getFieldProps(`pinSettings[${this.props.CurrentPin}].profile`).value; 
        const callValue = ack + parseInt(action);
        const floor = this.props.FormikProps.getFieldProps(`pinSettings[${this.props.CurrentPin}].floor`).value;
        switch (action) {
            case ActionValues.DIRECT_CALL:
                console.log("execute direct call");
                return `${messageNumber}${callValue}${terminalId}|${floor}|${personId}`;     
            case ActionValues.CUSTOM:
                return `${messageNumber}${callValue}${terminalId}||`;       
            case ActionValues.CALL_BY_PROFILE:
                console.log("execute profile call")
                return `${messageNumber}${callValue}${terminalId}|${profile}|`;
            case ActionValues.CALL_BY_ID:
                console.log("execute id call")
                return `${messageNumber}${callValue}${terminalId}|${id}|`;
        }
        return "Error: Could not generate call!";
    }
        


    submitCall() {
        fetch(Server.url() + '/test', { 
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({testCall: this.state.callString})
        })
        .then(() => {
            fetch(Server.url() + '/test')
                .then(res => res.json())
                .then(json => this.setState({messageNumber: json.messageNumber}))
        });
        
    }

    render() {
        console.log("Formik Props", this.props.FormikProps);
        var map;
        if ((this.props.InitialValues && this.first) || (this.props.CurrentPin + 1) != this.state.valueMap.get(PinFields.PIN_NUMBER)) {
            console.log("create initial map");
            this.first = false;
            map = this.createInitialMap(this.props.InitialValues);
            const valueString = this.createCallString(map);
            this.state = {valueMap: map, callString: valueString};
        } else {
            console.log("used default map");
            map = this.state.valueMap;
        }

        console.log("loaded map: ", map);
        console.log("actual pin", this.props.CurrentPin + 1);
        
        return (
            <div className="col">
                <div id="main" class="row top-suffer ">
                    <p class="field"> Pin {this.props.CurrentPin + 1} </p>
                    <div class="col-7"></div>
                    <div className="col rectangle right-buffer">
                        <table className="table">
                            <tr>
                                <td>
                                    <label className="description.text" for="description">Description</label>
                                </td>
                                <td>
                                    <Field type="description" name={`pinSettings[${this.props.CurrentPin}].description`} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img id="tick" src="Flat_tick_icon.svg.png" />
                                    <img id="cross" src="480px-Cross_red_circle.svg.png" />
                                </td>
                                <td class="middle">
                                    <Field className="checkbox" type="checkbox" name={`pinSettings[${this.props.CurrentPin}].enabled`} />
                                    <label for="enabled">Enabled</label>
                                    <Field as="select" name={"pinSettings[" + this.props.CurrentPin + "].posNeg"}>
                                        <option value="positive">Positive</option>
                                        <option value="negative">Negative</option>
                                    </Field>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="TID">Terminal ID</label>
                                </td>
                                <td>
                                    <Field name={`pinSettings[${this.props.CurrentPin}].terminalId`} validate={(value) => this.changeValue(PinFields.TERMINAL_ID, value)} />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <Field className="checkbox" type="checkbox" name={`pinSettings[${this.props.CurrentPin}].ack`} validate={(value) => {this.changeValue(PinFields.ACK, value)}} />
                                    <label for="Ack">&nbsp;Ack</label>
                                </td>
                                <td>
                                    <Field as="select" name={`pinSettings[${this.props.CurrentPin}].action`} validate={(value) => {this.changeMode(value); this.changeValue(PinFields.ACTION, parseInt(value))}}>
                                        <option value={ActionValues.TYPE_DEFAULT}>Choose</option>
                                        <option value={ActionValues.CALL_BY_ID}>Call by ID</option>
                                        <option value={ActionValues.DIRECT_CALL}>Direct Call</option>
                                        <option value={ActionValues.CALL_BY_PROFILE}>Call by profile</option>
                                        <option value={ActionValues.CUSTOM}>Custom</option>
                                    </Field>
                                </td>
                            </tr>
                            </table>
                            <div>
                                {(() => {
                                    const action = this.props.FormikProps.getFieldProps(`pinSettings[${this.props.CurrentPin}].action`).value;
                                    switch (string().cast(action)) {
                                        case ActionValues.DIRECT_CALL:
                                            return (
                                                <DirectCallComponent CurrentPin={this.props.CurrentPin} ChangeValueHandler={this.changeValue} />
                                            )
                                        case ActionValues.CUSTOM:
                                            return (
                                                <CustomComponent CurrentPin={this.props.CurrentPin} ChangeValueHandler={this.changeValue} />
                                            )
                                        case ActionValues.CALL_BY_PROFILE:
                                            return (
                                                <CallByProfileComponent CurrentPin={this.props.CurrentPin} ChangeValueHandler={this.changeValue} />
                                            )
                                        case ActionValues.CALL_BY_ID:
                                            return (
                                                <CallByIDComponent CurrentPin={this.props.CurrentPin} ChangeValueHandler={this.changeValue} />
                                            )
                                        default:
                                            return (
                                                <p>Error: Failed to load Component.</p>
                                            )    
                                        }
                                    }
                                )()}
                            </div>
                            
                            <table className="table">
                            <tr>
                                <td>
                                    <label for="Call">Call:</label>
                                </td>
                                <td>
                                    <p>{this.state.callString}</p>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button id="testexecute" className="execute" className="Button" type="button" onClick={this.submitCall}> Call Execute</button>
                                </td>
                            </tr>
                        </table>
                        <div className="Zeile.Enabled">
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    
}