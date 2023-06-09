import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import store from "./store.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
// import './assets/styles/custom.css';
import "./index.css";

function LIMBApp() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes />
      </Provider>
    </BrowserRouter>
  );
}

ReactDOM.render(<LIMBApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
