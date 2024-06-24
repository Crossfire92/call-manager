import React, { Component, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import parse from "html-react-parser";
import * as Server from '../lib/Server';

const ENDPOINT = Server.url(); // welcher port?
export default class SignalComponent extends Component {

    constructor(props) {
        super(props);
        this.eventListener = props.eventListener;
        this.socketErrorHandler = props.socketConnectErrorHandler;
        this.state = {mode: "", pinMap: this.createInitialMap()};
    }

    createInitialMap() {
        const map = new Map();
        for (let i = 1; i <= 12; i++) {
            map.set(i, false);
        }
        return map;
    }


    callEvent(number) {
        this.eventListener(number);
        console.log(number);
    }

    componentWillMount() {
        const socket = socketIOClient(ENDPOINT);
        console.log("connecting socket");
        socket.on("gpio_update", data => {
            console.log(data);
            if (data.pin >= 1 && data.pin <= 12) {
                const map = this.state.pinMap;
                map.set(data.pin, data.value);
                this.setState({pinMap: map});
            }
        });        
    }

    // initial state für alle 10 pins -> false -> map key(pinnr) value(bool) -> getters
    // 45 -> wert für pin i+1 mitgeben
    // 37 -> iterator
    // every change = set on map as formik this.state = {mode: "", pinMap: new Map()}; -> consturctor 10 pin fill in





    render() {
        console.log(this.state.pinMap);
        const rowStart ="<tr>";
        const rowEnd = "</tr>";
 
        if (this.props.pinSettings) {
            const rows = this.props.pinSettings.map((setting, i) => {
                let start = "";
                let end = "";
                if (i % 2 == 0) {
                    start = rowStart;
                    end = rowEnd;
                }
                return (
                <>
                {start !== "" ? parse(rowStart) : ""}
                    <td>
                        {
                            this.state.pinMap.get(i + 1) ? (
                                <img id="tick2" src="Flat_tick_icon.svg.png" />) 
                            : (<img id="tick2" src="480px-Cross_red_circle.svg.png" />)
                        }
                    </td>
                    <td><a href="#" onClick={() => this.eventListener(i)}><h6>{setting.description} ({i + 1})</h6></a></td>
                    {end !== "" ? parse(rowEnd) : ""}
                </>);
            });
    
            return(
                <div id="main" className="col rectangle signal">
                    <table className="table">
                        {rows}
                    </table>
                </div>
            );
        } else {
            return (<></>);
        }
    }
}
