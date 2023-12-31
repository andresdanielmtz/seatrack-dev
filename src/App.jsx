import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MainView from "./view/Home.jsx";
import RegisterView from "./view/register/Register.jsx";
import MapView from "./view/map/MapView.jsx";

function App() {
  axios.defaults.baseURL = `http://localhost:5000`;

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMap, setShowMap] = useState(false);

  function toggleMap() {
    setShowMap(!showMap);
  }

  const handleLogin = () => {
    axios
      .post("/login", { username, password })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(`Credentials: \'${username}\', \'${password}\'`);
        console.error("Login error: ", error);
        toast.error("Error logging in. Please try again."); // Show error notification
      });
  };

  const handleLogout = () => {
    axios
      .get("/logout")
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Logout error: ", error);
        // Handle logout error, e.g., display an error message
        console.log(error.message);
        toast.error("Error logging out. Please try again."); // Show error notification
      });
  };

  return (
    <div>
      <div>
        <ToastContainer
          theme="light"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          <Route
            path="/login"
            element={
              <div>
                <h1 className="text-3xl font-bold underline">Login</h1>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <br />
                <button onClick={() => navigate("/")}>Return to Home</button>
              </div>
            }
          ></Route>

          <Route path="/register" element={<RegisterView />}></Route>

          <Route
            path="/about"
            element={
              <div>
                <div className="text-3xl font-bold underline">About</div>
                <div className="text-xl font-bold underline">Team Members</div>
              </div>
            }
          ></Route>

          <Route
            path="/"
            element={
              isLoggedIn ? (
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
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
