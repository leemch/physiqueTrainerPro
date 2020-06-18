import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from "./store.js";
import { Provider } from "react-redux";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";


import PrivateRoute from './components/common/PrivateRoute.jsx';

import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Landing from './components/layout/Landing.jsx';
import Login from "./components/auth/Login.jsx";
import Register from './components/auth/Register.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import NotFound from './components/not-found/NotFound.jsx';
import ProgressCalendar from "./components/progress-updates/ProgressCalendar.jsx";

import './App.css';





// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));


  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout the user
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());

    //Redirect to login
    window.location.href = "/login";
  }

}



class App extends Component {




  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">

            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/not-found" component={NotFound} />


                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/progress_updates" component={ProgressCalendar} />

            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;