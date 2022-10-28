import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 16;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);
;
  return (
    <Router>
      <NavBar />
      <LoadingBar color="#f11946" progress={progress} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="general"
              category="general"
              pageSize={pageSize}
              country="in"
            />
          }
        />
        <Route
          exact
          path="/health"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="health"
              category="health"
              pageSize={pageSize}
              country="in"
            />
          }
        />
        <Route
          exact
          path="/sports"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="sports"
              category="sports"
              pageSize={pageSize}
              country="in"
            />
          }
        />
        <Route
          exact
          path="/technology"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="technology"
              category="technology"
              pageSize={pageSize}
              country="in"
            />
          }
        />
        <Route
          exact
          path="/science"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="science"
              category="science"
              pageSize={pageSize}
              country="in"
            />
          }
        />
        <Route
          exact
          path="/entertainment"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="entertainment"
              category="entertainment"
              pageSize={pageSize}
              country="in"
            />
          }
        />
        <Route
          exact
          path="/business"
          element={
            <News
              apiKey={apiKey}
              setProgress={setProgress}
              key="business"
              category="business"
              pageSize={pageSize}
              country="in"
            />
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
