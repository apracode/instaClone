import React from "react";

function Header({ user, setUser }) {
  return (
    <div>
      Welcome, {user}!<button onClick={() => setUser("")}>Log Out</button>
    </div>
  );
}

export default Header;
