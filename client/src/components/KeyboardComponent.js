import React, { Component } from "react";

export default class KeyboardComponent extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div className="col ">
                <div id="main" class="row top-suffer">
                    <p className="field"> 10er-Tastatur </p>
                    <div className="col-7"></div>

                    <div className="col rectangle left-buffer">
                        <table className="table">
                            <tr>
                                <td>
                                    <input className="checkbox" type="checkbox" for="checkbox" />
                                </td>
                                <td>
                                    <label for="enabled">Enabled</label>
                                </td>
                                <td>
                                    <img id="tick" src="Flat_tick_icon.svg.png" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="Time">Time</label>
                                </td>
                                <td>
                                    <input className="description" type="number" id="description" name="description" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input className="checkbox" type="checkbox" for="checkbox" />
                                </td>
                                <td>
                                    <label for="Ack">Ack</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="ID">Person ID</label>
                                </td>
                                <td>
                                    <input className="description" type="number" id="description" name="description" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Call</b>
                                </td>
                            </tr>


                        </table>
                    </div>
                </div>
            </div>

        );
    }
}