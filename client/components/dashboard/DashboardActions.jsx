import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup.jsx";

class DashboardActions extends Component {


  render() {


    return (
      <div className="btn-group mb-4" role="group">
        <Link to="/client_list">
          <button className="btn btn-primary mr-3" style={{ "width": "10rem", "height": "10rem" }}>
            My Clients
									<h4 className="display-4">
              <i className="fa fa-users"></i>
            </h4>
          </button>
        </Link>
        <Link to="/edit-profile">
          <button className="btn btn-info mr-3" style={{ "width": "10rem", "height": "10rem" }}>
            Edit Profile
									<h4 className="display-4">
              <i className="fa fa-edit mr-1"></i>
            </h4>
          </button>
        </Link>
        {/* <Link to="/edit-profile" className="btn btn-light">
          <i className="fa fa-user-circle text-info mr-1"></i> Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fa fa-black-tie text-info mr-1"></i>
              Add Experience</Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fa fa-graduation-cap text-info mr-1"></i>
              Add Education</Link> */}
      </div>
    )
  }
}

export default DashboardActions;