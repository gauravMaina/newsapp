import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import ErrorBoundary from './components/ErrorBoundary'

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <NavBar />
        <News />
      </ErrorBoundary>
    );
  }
}
