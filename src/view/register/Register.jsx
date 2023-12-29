import React, {useState} from 'react';
import axios from "axios";

export default function RegisterView() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [success, setSuccess] = useState("");

    const handleRegister = () => {
        axios.post("/register", {
            username: username,
            password: password,
        })
        .then((response) => {
            if (response.status === 200) {
                setSuccess("Registration successful. Please login.");
                
            }
        }
        )
        .catch((error) => {
            console.error("Registration error: ", error);
        });
    }


  return (
    <>
     <h2> Alternatively, you can register here: </h2>

    <div>
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
    <button onClick={handleRegister}>Register</button>
  </div>
  {success && (
    <div>
      <p>{success}</p>
    </div>
    )}
    </>
  )
}