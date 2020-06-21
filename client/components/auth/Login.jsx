import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions.js";
import TextFieldGroup from "../common/TextFieldGroup.jsx";
import MenuWithLogo from "../common/MenuWithLogo.jsx";

class Login extends Component {


  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    }

  }


  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(user)
  }


  render() {

    const { errors } = this.state;

    return (
      <div className="login">

        {/* <header id="main-header" className="py-2 bg-info text-white rounded mb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1><i className=" fa fa-user"></i> Login</h1>
              </div>
            </div>
          </div>
        </header> */}

        <section id="login">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">

                <MenuWithLogo title="Trainer Account Login">
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />

                    <TextFieldGroup
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </MenuWithLogo>
              </div>
            </div>
          </div>
        </section>
      </div>

    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);