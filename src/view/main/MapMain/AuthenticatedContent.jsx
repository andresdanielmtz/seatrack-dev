// AuthenticatedContent.jsx
import React from "react";
import MapView from "../../map/MapView.jsx";
import MainView from "../../Home.jsx";
import { Link } from "react-router-dom";
import MainTitleView from "../MainTitle/MainTitleView.jsx";

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
        <MainTitleView />
      )}
    </div>
  );
};

export default AuthenticatedContent;
