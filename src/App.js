import React from "react";
import "./styles.css";

import FormPage from "./components/FormPage";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QRCodePage from "./components/QRCodePage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/qr-code" exact component={QRCodePage} />
          <Route path="/form" exact component={FormPage} />
        </Switch>
      </div>
    </Router>
  );
}
