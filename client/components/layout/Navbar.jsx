import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {

  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="" onClick={this.onLogoutClick.bind(this)}>
              <img className="rounded-circle" src={user.avatar} alt={user.name} style={{ width: "25px", marginRight: "5px" }} title="You must have a gravatar connected to your email to display an image." />
              Logout <i className="fas fa-user-times"></i>
            </a>
          </li>
        </ul>
      </div>




    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">

          <Link className="navbar-brand" to="/">
            <img style={{ width: '80px' }} src="http://u.cubeupload.com/leemch/ptplogo.png" /> PhysiqueTrainerPro
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Trainers </Link>
              </li> */}
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
      // <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      //   <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>
      //   <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      //     <span className="navbar-toggler-icon"></span>
      //   </button>
      //   <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
      //   <ul className="navbar-nav px-3">
      //     <li className="nav-item text-nowrap">
      //       <a className="nav-link" href="#">Sign out</a>
      //     </li>
      //   </ul>
      // </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);