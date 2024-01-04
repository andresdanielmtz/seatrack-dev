// AuthenticatedContent.jsx
import React from "react";
import MapView from "../../map/MapView.jsx";
import MainView from "../../Home.jsx";
import { Link } from "react-router-dom";

const AuthenticatedContent = ({
  isLoggedIn,
  showMap,
  username,
  handleLogout,
  toggleMap,
}) => {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          {showMap ? (
            <div>
              <MapView zoom={2} />
              <button onClick={handleLogout}>Logout</button>
              <button onClick={toggleMap}>Toggle Map</button>
            </div>
          ) : (
            <div>
              <MainView username={username} />
              <button onClick={handleLogout}>Logout</button>
              <button onClick={toggleMap}>Toggle Map</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold underline">Login</h1>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default AuthenticatedContent;
