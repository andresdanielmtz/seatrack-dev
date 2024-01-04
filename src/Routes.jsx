// RoutesComponent.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginView from "./auth/LoginMain/LoginMainView.jsx";
import RegisterView from "./auth/AuthenticatedContent/RegisterView.jsx";
import AboutView from "./auth/AuthenticatedContent/AboutView.jsx";
import AuthenticatedContent from "./auth/AuthenticatedContent/AuthenticatedContentView.jsx";

const Routes = ({
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
