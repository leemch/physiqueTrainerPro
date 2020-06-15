import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {LoginClient} from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class ClientLogin extends Component {


constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    }

  }


  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }

    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.LoginClient(user, this.props.match.params.trainer_id);
  }


	render() {

    const {errors} = this.state;

		return(
			  <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Client Log In</h1>
          <p className="lead text-center">Log into your trainers page</p>
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
        </div>
      </div>
    </div>
  </div>

		)
	}
}

ClientLogin.propTypes = {
  LoginClient: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {LoginClient})(ClientLogin);