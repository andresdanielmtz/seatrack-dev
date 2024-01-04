// RoutesComponent.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginView from "./components/auth/LoginMain/LoginMainView.jsx";
import RegisterView from "./components/auth/AuthenticatedContent/RegisterView.jsx";
import AboutView from "./components/auth/AuthenticatedContent/AboutView.jsx";
import AuthenticatedContent from "./components/auth/AuthenticatedContent/AuthenticatedContentView.jsx";

const Routing = ({
  setIsLoggedIn,
  setUsername,
  isLoggedIn,
  showMap,
  handleLogout,
  toggleMap,
  username,
}) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginView setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
        }
      />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/about" element={<AboutView />} />
      <Route
        path="/"
        element={
          <AuthenticatedContent
            isLoggedIn={isLoggedIn}
            showMap={showMap}
            username={username}
            handleLogout={handleLogout}
            toggleMap={toggleMap}
          />
        }
      />
    </Routes>
  );
};

export default Routing;
