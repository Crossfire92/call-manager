import { Field } from "formik";
import React, { Component } from "react";
import PinFields from "../lib/PinFields";

export default class CallByIDComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <table className="table">
                    <tr>
                        <td>
                            <label for="ID">ID</label>
                        </td>
                        <td>
                            <Field type="text" name={`pinSettings[${this.props.CurrentPin}].id`} validate={(value) => this.props.ChangeValueHandler(PinFields.ID, value)} />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}