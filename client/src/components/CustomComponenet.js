import React, { Component } from "react";
import { Field  } from "formik"
import PinFields from "../lib/PinFields";

export default class CustomComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <table className="table">
                <tr>
                    <td>
                        <label for="Custom">Custom</label>
                    </td>
                    <td>
                        <Field name={`pinSettings[${this.props.CurrentPin}].custom`} validate={(value) => this.props.ChangeValueHandler(PinFields.CUSTOM, value)} />
                    </td>
                </tr>
            </table>
        </div>
        );
    }
}