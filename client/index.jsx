import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx"
import './index.css';

// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;