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
import ProgressUpdateForm from './components/progress-update/ProgressUpdateForm.jsx';
import ProgressUpdatePost from './components/progress-updates/progressUpdatePost/Post.jsx';

import ClientLogin from './components/auth/ClientLogin.jsx';
import ClientRegister from './components/auth/ClientRegister.jsx';
import CreateProfile from './components/create-profile/CreateProfile.jsx';
import EditProfile from './components/edit-profile/EditProfile.jsx';
import AddExperience from './components/add-credentials/AddExperience.jsx';
import AddEducation from './components/add-credentials/AddEducation.jsx';
import Profiles from './components/profiles/Profiles.jsx';
import Profile from './components/profile/Profile.jsx';
import Posts from './components/posts/Posts.jsx';
import Post from './components/post/Post.jsx';
import ClientList from './components/dashboard/client-list/ClientList.jsx';
import Settings from './components/settings/Settings.jsx';

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

              <Route exact path="/client_register/:trainer_handle" component={ClientRegister} />
              <Route exact path="/client_login/:trainer_id" component={ClientLogin} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />


              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/feed" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
              <PrivateRoute exact path="/client_list" component={ClientList} />
              <PrivateRoute exact path="/progress_feed/:client_id" component={ProgressCalendar} />
              <PrivateRoute exact path="/progress_details/:id" component={ProgressUpdatePost} />
              <PrivateRoute exact path="/progress_add" component={ProgressUpdateForm} />
              <PrivateRoute exact path="/settings" component={Settings} />
              
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;