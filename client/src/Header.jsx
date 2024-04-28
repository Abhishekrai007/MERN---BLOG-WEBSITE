import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });

    setUserInfo(null);
  };
  const username = userInfo?.username;
  return (
    <div>
      <header>
        <Link to="/" className="logo">
          StorySphere
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create" className="button-34" role="button">
                Create New Post
              </Link>
              <a onClick={logout} className="button-34" role="button">
                Logout
              </a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login" className="button-34" role="button">
                Login
              </Link>
              <Link to="/register" className="button-34" role="button">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
