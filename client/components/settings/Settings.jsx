import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Spinner from "../common/Spinner.jsx";



class Settings extends Component {

	render() {

		return(
				<div className="container">                    
					<header id="main-header" className="py-2 bg-primary text-white rounded">
								<div className="container">
									<div className="row">
										<div className="col-md-6">
											<h1><i className=" fas fa-cog"></i> Settings</h1>
										</div>
									</div>
								</div>
					</header>

                    <section id="actions" className="py-4 mb-4 bg-light">
							<div className="container">
								<div className="row">
									<div className="col-md-3">
										<a href="#" className="btn btn-light btn-block">
											<i className="fas fa-arrow-left"></i> Back to Dashboard
										</a>
									</div>
									<div className="col-md-3">
										<a href="#" className="btn btn-success btn-block">
											<i className="fas fa-check"></i> Save Changes
										</a>
									</div>
								</div>
							</div>
					</section>

                    <section id="settings">
							<div className="container">
								<div className="row">
									<div className="col">
										<div className="card">
											<div className="card-header">
												<h4>Edit Settings</h4>
											</div>
											<div className="card-body">
												<form>
													<fieldset className="form-group">
                                                        <legend>Allow User Registration</legend>
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" value="Yes" checked /> Yes
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" value="No" /> No
                                                            </label>
                                                        </div>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <legend>Homepage format</legend>
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" value="posts" checked /> Blog Page
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" value="page" /> Homepage
                                                            </label>
                                                        </div>
                                                    </fieldset>
												</form>
											</div>
										</div>

									</div>
								</div>
							</div>
						</section>


				</div>
		)
	}


}



export default Settings;