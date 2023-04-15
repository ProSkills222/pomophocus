import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Settings from "./components/Settings/Settings";
import Report from "./components/Report";
import EmailLogin from "./components/EmailLogin/EmailLogin";
import EmailRegister from "./components/EmailRegister/EmailRegister";
import store from "./redux/store";
import { AuthProvider } from "./context/AuthProvider";

function Main() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <Route path="/">
            <App />
          </Route>
          <Route path="/login">
            <EmailLogin />
          </Route>
          <Route path="/register">
            <EmailRegister />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/report">
            <Report />
          </Route>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
