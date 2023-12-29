import React from 'react';

export default function RegisterView() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [success, setSuccess] = useState("");

    const handleRegister = () => {
        axios({
            method: "POST",
            data: {
                username: username,
                password: password,
            },
            withCredentials: true,
            url: "/register",
        }).then((res) => {
            setSuccess("Success! You can now log in.")
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