import "./App.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import News from "./components/News";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 16;
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {console.log(this.apiKey,'apikey')
    return (
      <ErrorBoundary>
        <Router>
          <NavBar />
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  key="general"
                  category="general"
                  pageSize={this.pageSize}
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  key="health"
                  category="health"
                  pageSize={this.pageSize}
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  key="sports"
                  category="sports"
                  pageSize={this.pageSize}
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  key="technology"
                  category="technology"
                  pageSize={this.pageSize}
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  key="science"
                  category="science"
                  pageSize={this.pageSize}
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  key="entertainment"
                  category="entertainment"
                  pageSize={this.pageSize}
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  key="business"
                  category="business"
                  pageSize={this.pageSize}
                  country="us"
                />
              }
            />
          </Routes>
        </Router>
      </ErrorBoundary>
    );
  }
}
