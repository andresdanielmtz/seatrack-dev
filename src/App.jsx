import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routing from "./Routes.jsx";

function App() {
  axios.defaults.baseURL = `http://3.101.63.33/`;

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // Local state for username
  const [showMap, setShowMap] = useState(false);

  function toggleMap() {
    setShowMap(!showMap);
  }

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
        <Routing
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          isLoggedIn={isLoggedIn}
          showMap={showMap}
          handleLogout={handleLogout}
          toggleMap={toggleMap}
          username={username}
        />
      </div>
    </div>
  );
}

export default App;
