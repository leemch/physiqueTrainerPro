import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx"

// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;