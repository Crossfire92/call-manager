import { Field } from "formik";
import React, { Component } from "react";
import PinFields from "../lib/PinFields";

export default class CallByProfileComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <table className="table">
                    <tr>
                        <td>
                            <label for="Profile">Profile</label>
                        </td>
                        <td>
                            <Field name={`pinSettings[${this.props.CurrentPin}].profile`} validate={(value) => this.props.ChangeValueHandler(PinFields.PROFILE, value)} />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}