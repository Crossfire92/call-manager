import React, { Component, useEffect, useState } from "react";

export default class ErrorComponent extends Component {

  constructor(props) {
    super(props);
  } 

  render() {
    if (this.props.offline) {
      return (
        <div className="alert alert-danger" role="alert">
          Something went wrong with the connection to our backend... please check the service on the server
        </div>
      );
    } else {
      return <></>;
    }
  }
}