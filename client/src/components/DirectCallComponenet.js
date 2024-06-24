import React, { Component } from "react";
import { Field  } from "formik"
import PinFields from "../lib/PinFields";

export default class DirectCallComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <table className="table">
                    <tr>
                        <td>
                            <label for="Floor">Floor</label>
                        </td>
                        <td>
                            <Field name={`pinSettings[${this.props.CurrentPin}].floor`} validate={(value) => this.props.ChangeValueHandler(PinFields.FLOOR, value)} />
                        </td>
                        <td>
                            <label for="PersonID">Person ID</label>
                        </td>
                        <td>
                            <Field name={`pinSettings[${this.props.CurrentPin}].personId`} validate={(value) => this.props.ChangeValueHandler(PinFields.PERSON_ID, value)} />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}