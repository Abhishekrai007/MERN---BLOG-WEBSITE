import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });

    setUsername(null);
  };
  return (
    <div>
      <header>
        <Link to="/" className="logo">
          My Blog
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create New Post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
