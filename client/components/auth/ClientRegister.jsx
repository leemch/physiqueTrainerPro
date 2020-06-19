import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {registerClientByHandle} from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup.jsx";

class Register extends Component {

	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
      password2: "",
			errors: {}
		}

	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors){
			this.setState({errors: nextProps.errors});
		}
	}

	componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }
  }


	onChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	onSubmit = (event) => {
		event.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
      password2: this.state.password2
		}

		this.props.registerClientByHandle(newUser, this.props.match.params.trainer_handle, this.props.history);

		
	}


	render() {

		const {errors} = this.state;

		return(
		<div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Client Sign Up</h1>
          <p className="lead text-center">Sign up with this trainer (trainer name)</p>
          <form onSubmit={this.onSubmit} noValidate>
            <TextFieldGroup
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
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
            <TextFieldGroup
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
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

Register.propTypes = {
	registerClientByHandle: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {registerClientByHandle})(withRouter(Register));