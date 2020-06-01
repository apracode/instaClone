import React, { useState } from "react";

function Login({ setUser }) {
  const [userName, setUserName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setUser(userName);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} action="">
        <input
          onChange={e => setUserName(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
